import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Autoplay timer for a carousel slide.
 *
 * Counts elapsed time with requestAnimationFrame only while `running`, so pausing
 * freezes the countdown and resuming continues from the same point. When the
 * duration is reached it calls `onDone` and starts over.
 *
 * The progress bar (attach `barRef` to it) is updated directly each frame, so the
 * component does not re-render per frame; `secondsLeft` only changes once a second.
 */
const useSlideTimer = (running: boolean, onDone: () => void, durationMs: number) => {
  const elapsed = useRef(0);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(durationMs / 1000));
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const paint = useCallback(() => {
    const pct = Math.min(100, (elapsed.current / durationMs) * 100);
    if (barRef.current) barRef.current.style.width = `${pct}%`;
    const left = Math.max(1, Math.ceil((durationMs - elapsed.current) / 1000));
    setSecondsLeft((prev) => (prev === left ? prev : left));
  }, [durationMs]);

  /** Start the current slide's countdown from zero (e.g. after manual navigation). */
  const reset = useCallback(() => {
    elapsed.current = 0;
    paint();
  }, [paint]);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      // Cap each step so coming back from a throttled/background state never skips a slide.
      elapsed.current += Math.min(now - last, 100);
      last = now;
      if (elapsed.current >= durationMs) {
        elapsed.current = 0;
        onDoneRef.current();
      }
      paint();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, paint, durationMs]);

  return { barRef, secondsLeft, reset, paint };
};

export default useSlideTimer;
