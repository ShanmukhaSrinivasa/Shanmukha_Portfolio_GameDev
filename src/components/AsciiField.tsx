import { useEffect, useRef } from 'react';

const GLYPHS = ' .·:-=+*<>/{}[]01#%@';
const CELL_W = 16;
const CELL_H = 22;
const FPS = 24;
const CURSOR_RADIUS = 170;

/**
 * Full-page ASCII field behind the content: code glyphs drift in slow
 * diagonal bands and ripple/brighten around the cursor.
 */
const AsciiField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const ripples: { x: number; y: number; t: number }[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.ceil(w / CELL_W);
      rows = Math.ceil(h / CELL_H);
      ctx.font = '500 13px "JetBrains Mono Variable", ui-monospace, monospace';
      ctx.textBaseline = 'top';
    };
    resize();

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      // Ease the glow toward the pointer for a soft trailing feel.
      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;

      for (let r = 0; r < rows; r++) {
        const y = r * CELL_H;
        for (let c = 0; c < cols; c++) {
          const x = c * CELL_W;
          // Layered waves give drifting diagonal bands of "data".
          let v =
            Math.sin(c * 0.11 + t * 0.35) * Math.cos(r * 0.16 - t * 0.27) +
            Math.sin((c + r) * 0.045 - t * 0.22) * 0.9;

          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          let near = 0;
          if (d < CURSOR_RADIUS) {
            near = 1 - d / CURSOR_RADIUS;
            v += near * 1.6 + Math.sin(d * 0.08 - t * 6) * near * 0.5;
          }
          for (const rp of ripples) {
            const age = t - rp.t;
            const rd = Math.hypot(x - rp.x, y - rp.y);
            const ring = Math.abs(rd - age * 420);
            if (ring < 26) v += (1 - ring / 26) * Math.max(0, 1 - age / 1.4) * 2;
          }

          if (v < 0.95) continue;
          const level = Math.min(1, (v - 0.95) / 1.5);
          const glyph = GLYPHS[Math.min(GLYPHS.length - 1, 1 + Math.floor(level * (GLYPHS.length - 2)))];
          const alpha = 0.06 + level * 0.32 + near * 0.35;
          ctx.fillStyle =
            near > 0.25 ? `rgba(74, 222, 128, ${Math.min(0.8, alpha)})` : `rgba(96, 165, 250, ${Math.min(0.55, alpha)})`;
          ctx.fillText(glyph, x, y);
        }
      }
      while (ripples.length && t - ripples[0].t > 1.4) ripples.shift();
    };

    if (reduce) {
      const redraw = () => {
        resize();
        draw(0);
      };
      draw(0);
      window.addEventListener('resize', redraw);
      return () => window.removeEventListener('resize', redraw);
    }

    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 1000 / FPS) return;
      last = now;
      draw(now / 1000);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      if (pointer.x < -9000) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
      }
    };
    const onLeave = () => {
      pointer.tx = pointer.ty = -9999;
    };
    const onDown = (e: PointerEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, t: performance.now() / 1000 });
      if (ripples.length > 4) ripples.shift();
    };

    start();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 [mask-image:linear-gradient(to_bottom,black,black_85%,transparent)]"
    />
  );
};

export default AsciiField;
