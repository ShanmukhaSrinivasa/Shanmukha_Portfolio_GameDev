/**
 * BYTE DEFENDER — a tiny original arcade game drawn to a canvas, used as the
 * screen of the 3D cabinet in the hero. It boots like a terminal, then runs an
 * attract (demo) mode where an AI plays, until a visitor takes control.
 */

export const SCREEN_W = 256;
export const SCREEN_H = 180;

export type GameMode = 'boot' | 'attract' | 'play' | 'over';

export interface GameInput {
  left: boolean;
  right: boolean;
  fire: boolean;
}

export interface GameEvents {
  onShoot?: () => void;
  onHit?: () => void;
  onLifeLost?: () => void;
  onGameOver?: () => void;
}

interface Bug {
  x: number;
  y: number;
  vy: number;
  size: number;
  hue: number;
  wobble: number;
}
interface Bullet {
  x: number;
  y: number;
}
interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const BOOT_LINES = [
  'SHANMUKHA.OS v1.0.4',
  'MEM CHECK ........ OK',
  'LOADING GAMEPLAY.DLL',
  '> ./byte_defender',
];

const BLUE = '#3b82f6';
const BLUE_SOFT = '#60a5fa';
const GREEN = '#4ade80';
const PINK = '#f472b6';

export class ArcadeGame {
  readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  mode: GameMode = 'boot';
  input: GameInput = { left: false, right: false, fire: false };

  private t = 0;
  private modeTime = 0;
  private shipX = SCREEN_W / 2;
  private shipVX = 0;
  private fireCooldown = 0;
  private spawnTimer = 0;
  private bugs: Bug[] = [];
  private bullets: Bullet[] = [];
  private sparks: Spark[] = [];
  private stars: { x: number; y: number; s: number }[] = [];
  score = 0;
  hiScore = 0;
  lives = 3;

  constructor(private events: GameEvents = {}) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = SCREEN_W;
    this.canvas.height = SCREEN_H;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('2D canvas unavailable');
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
    for (let i = 0; i < 40; i++) {
      this.stars.push({ x: Math.random() * SCREEN_W, y: Math.random() * SCREEN_H, s: Math.random() * 18 + 6 });
    }
    try {
      this.hiScore = Number(localStorage.getItem('byte_defender_hi')) || 0;
    } catch {
      /* storage unavailable */
    }
  }

  /** Visitor takes control. */
  start() {
    this.reset();
    this.setMode('play');
  }

  /** Hand control back to the demo AI. */
  stop() {
    if (this.mode === 'play' || this.mode === 'over') {
      this.reset();
      this.setMode('attract');
    }
  }

  private setMode(m: GameMode) {
    this.mode = m;
    this.modeTime = 0;
  }

  private reset() {
    this.bugs = [];
    this.bullets = [];
    this.sparks = [];
    this.score = 0;
    this.lives = 3;
    this.shipX = SCREEN_W / 2;
    this.shipVX = 0;
    this.spawnTimer = 0;
  }

  update(dt: number) {
    dt = Math.min(dt, 0.05);
    this.t += dt;
    this.modeTime += dt;

    for (const s of this.stars) {
      s.y += s.s * dt;
      if (s.y > SCREEN_H) {
        s.y = 0;
        s.x = Math.random() * SCREEN_W;
      }
    }

    if (this.mode === 'boot') {
      if (this.modeTime > BOOT_LINES.length * 0.45 + 0.6) this.setMode('attract');
      this.draw();
      return;
    }
    if (this.mode === 'over') {
      this.updateSparks(dt);
      if (this.modeTime > 3) this.stop();
      this.draw();
      return;
    }

    // --- Ship control: player input, or a simple AI in attract mode ---
    let dir = 0;
    const firing = true;
    if (this.mode === 'play') {
      dir = (this.input.right ? 1 : 0) - (this.input.left ? 1 : 0);
      // Auto-fire keeps it friendly for a quick try; holding Space fires faster.
    } else {
      const target = this.bugs.reduce<Bug | null>((best, b) => (!best || b.y > best.y ? b : best), null);
      const tx = target ? target.x : SCREEN_W / 2 + Math.sin(this.t * 0.7) * 60;
      dir = Math.abs(tx - this.shipX) > 4 ? Math.sign(tx - this.shipX) : 0;
    }
    this.shipVX += dir * 900 * dt;
    this.shipVX *= Math.pow(0.0008, dt);
    this.shipVX = Math.max(-170, Math.min(170, this.shipVX));
    this.shipX = Math.max(10, Math.min(SCREEN_W - 10, this.shipX + this.shipVX * dt));

    // --- Shooting ---
    this.fireCooldown -= dt;
    const rate = this.mode === 'play' && this.input.fire ? 0.12 : 0.28;
    if (firing && this.fireCooldown <= 0) {
      this.bullets.push({ x: this.shipX, y: SCREEN_H - 22 });
      this.fireCooldown = rate;
      if (this.mode === 'play') this.events.onShoot?.();
    }
    for (const b of this.bullets) b.y -= 260 * dt;
    this.bullets = this.bullets.filter((b) => b.y > -6);

    // --- Bugs: spawn faster as the score climbs ---
    this.spawnTimer -= dt;
    const spawnEvery = Math.max(0.35, 1.1 - this.score / 4000);
    if (this.spawnTimer <= 0) {
      this.spawnTimer = spawnEvery;
      this.bugs.push({
        x: 14 + Math.random() * (SCREEN_W - 28),
        y: -10,
        vy: 22 + Math.random() * 18 + this.score / 120,
        size: 6 + Math.floor(Math.random() * 3) * 2,
        hue: Math.random() < 0.5 ? 0 : 1,
        wobble: Math.random() * Math.PI * 2,
      });
    }
    for (const bug of this.bugs) {
      bug.y += bug.vy * dt;
      bug.x += Math.sin(this.t * 3 + bug.wobble) * 12 * dt;
    }

    // --- Collisions ---
    for (const bug of this.bugs) {
      for (const b of this.bullets) {
        if (bug.y < 9000 && Math.abs(b.x - bug.x) < bug.size && Math.abs(b.y - bug.y) < bug.size) {
          this.burst(bug.x, bug.y, bug.hue ? PINK : GREEN);
          bug.y = 9999; // removed below
          b.y = -99;
          this.score += 50;
          if (this.mode === 'play') this.events.onHit?.();
        }
      }
    }
    const landed = this.bugs.filter((b) => b.y > SCREEN_H - 14 && b.y < 9000);
    if (landed.length) {
      landed.forEach((b) => {
        this.burst(b.x, SCREEN_H - 14, '#f87171');
        b.y = 9999;
      });
      if (this.mode === 'play') {
        this.lives -= landed.length;
        this.events.onLifeLost?.();
        if (this.lives <= 0) {
          this.hiScore = Math.max(this.hiScore, this.score);
          try {
            localStorage.setItem('byte_defender_hi', String(this.hiScore));
          } catch {
            /* storage unavailable */
          }
          this.events.onGameOver?.();
          this.setMode('over');
        }
      }
    }
    this.bugs = this.bugs.filter((b) => b.y < 9000);
    this.updateSparks(dt);
    this.draw();
  }

  private burst(x: number, y: number, color: string) {
    for (let i = 0; i < 10; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = 30 + Math.random() * 70;
      this.sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0.5, color });
    }
  }

  private updateSparks(dt: number) {
    for (const s of this.sparks) {
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.life -= dt;
    }
    this.sparks = this.sparks.filter((s) => s.life > 0);
  }

  // ------------------------------------------------------------------ drawing

  private text(str: string, x: number, y: number, color: string, size = 8, align: CanvasTextAlign = 'left') {
    const c = this.ctx;
    c.font = `bold ${size}px "JetBrains Mono Variable", monospace`;
    c.textAlign = align;
    c.fillStyle = color;
    c.fillText(str, x, y);
  }

  private draw() {
    const c = this.ctx;
    c.fillStyle = '#050814';
    c.fillRect(0, 0, SCREEN_W, SCREEN_H);

    // Starfield
    for (const s of this.stars) {
      c.fillStyle = s.s > 18 ? '#93c5fd' : '#1e3a8a';
      c.fillRect(Math.floor(s.x), Math.floor(s.y), 1, s.s > 18 ? 2 : 1);
    }

    if (this.mode === 'boot') {
      const shown = Math.floor(this.modeTime / 0.45);
      BOOT_LINES.slice(0, shown + 1).forEach((line, i) => {
        const full = i < shown;
        const chars = full ? line.length : Math.floor(((this.modeTime % 0.45) / 0.45) * line.length);
        this.text(line.slice(0, chars), 12, 28 + i * 14, i === BOOT_LINES.length - 1 ? GREEN : BLUE_SOFT);
      });
      if (Math.floor(this.t * 3) % 2) this.text('_', 12 + 0, 28 + Math.min(shown + 1, BOOT_LINES.length) * 14, GREEN);
      this.scanlines();
      return;
    }

    // Ground line
    c.fillStyle = BLUE;
    c.fillRect(0, SCREEN_H - 10, SCREEN_W, 1);

    // Bugs: little glitch creatures
    for (const b of this.bugs) {
      const col = b.hue ? PINK : GREEN;
      const s = b.size;
      c.fillStyle = col;
      c.fillRect(Math.floor(b.x - s / 2), Math.floor(b.y - s / 2), s, s);
      c.fillStyle = '#050814';
      c.fillRect(Math.floor(b.x - s / 4) - 1, Math.floor(b.y - 1), 2, 2);
      c.fillRect(Math.floor(b.x + s / 4) - 1, Math.floor(b.y - 1), 2, 2);
      c.fillStyle = col;
      const leg = Math.floor(this.t * 8) % 2;
      c.fillRect(Math.floor(b.x - s / 2) - 1, Math.floor(b.y + s / 2) - leg, 1, 2);
      c.fillRect(Math.floor(b.x + s / 2), Math.floor(b.y + s / 2) - (1 - leg), 1, 2);
    }

    // Bullets
    c.fillStyle = '#e0f2fe';
    for (const b of this.bullets) c.fillRect(Math.floor(b.x), Math.floor(b.y), 1, 4);

    // Ship
    if (this.mode !== 'over') {
      const x = Math.floor(this.shipX);
      const y = SCREEN_H - 20;
      c.fillStyle = BLUE_SOFT;
      c.fillRect(x - 1, y - 4, 2, 4);
      c.fillRect(x - 4, y, 8, 3);
      c.fillRect(x - 7, y + 3, 14, 3);
      c.fillStyle = Math.floor(this.t * 12) % 2 ? '#f59e0b' : '#fde047';
      c.fillRect(x - 2, y + 6, 4, 2);
    }

    // Sparks
    for (const s of this.sparks) {
      c.globalAlpha = Math.max(0, s.life * 2);
      c.fillStyle = s.color;
      c.fillRect(Math.floor(s.x), Math.floor(s.y), 2, 2);
    }
    c.globalAlpha = 1;

    // HUD
    this.text(`SCORE ${String(this.score).padStart(5, '0')}`, 8, 12, '#e0f2fe');
    this.text(`HI ${String(Math.max(this.hiScore, this.score)).padStart(5, '0')}`, SCREEN_W - 8, 12, BLUE_SOFT, 8, 'right');

    if (this.mode === 'play') {
      for (let i = 0; i < this.lives; i++) {
        c.fillStyle = BLUE_SOFT;
        c.fillRect(8 + i * 9, SCREEN_H - 7, 6, 3);
      }
    }

    if (this.mode === 'attract') {
      this.text('BYTE DEFENDER', SCREEN_W / 2, 64, '#e0f2fe', 16, 'center');
      this.text('a shanmukha original', SCREEN_W / 2, 78, BLUE_SOFT, 7, 'center');
      if (Math.floor(this.t * 2) % 2) this.text('CLICK TO PLAY', SCREEN_W / 2, 104, GREEN, 9, 'center');
    }
    if (this.mode === 'over') {
      this.text('GAME OVER', SCREEN_W / 2, 80, '#f87171', 16, 'center');
      this.text(`SCORE ${this.score}`, SCREEN_W / 2, 98, '#e0f2fe', 9, 'center');
    }

    this.scanlines();
  }

  private scanlines() {
    const c = this.ctx;
    c.fillStyle = 'rgba(0,0,0,0.22)';
    for (let y = 0; y < SCREEN_H; y += 2) c.fillRect(0, y, SCREEN_W, 1);
  }
}
