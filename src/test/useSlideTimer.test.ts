import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useSlideTimer from '@/hooks/useSlideTimer';

const DURATION = 6000;

describe('useSlideTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'] });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  /** Advance simulated time in ~16ms frames, like a real display. */
  const run = (ms: number) =>
    act(() => {
      for (let t = 0; t < ms; t += 16) vi.advanceTimersByTime(16);
    });

  it('counts down and fires once per slide while running', () => {
    const onDone = vi.fn();
    const { result } = renderHook(() => useSlideTimer(true, onDone, DURATION));
    expect(result.current.secondsLeft).toBe(6);

    run(2100);
    expect(result.current.secondsLeft).toBe(4);
    expect(onDone).not.toHaveBeenCalled();

    run(4000);
    expect(onDone).toHaveBeenCalledTimes(1);

    run(6000);
    expect(onDone).toHaveBeenCalledTimes(2);
  });

  it('freezes while paused and resumes from the same point', () => {
    const onDone = vi.fn();
    const { result, rerender } = renderHook(({ running }) => useSlideTimer(running, onDone, DURATION), {
      initialProps: { running: true },
    });

    run(3000);
    rerender({ running: false });
    const frozen = result.current.secondsLeft;
    run(20000);
    expect(onDone).not.toHaveBeenCalled();
    expect(result.current.secondsLeft).toBe(frozen);

    rerender({ running: true });
    run(2500);
    expect(onDone).not.toHaveBeenCalled();
    run(700);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('never advances when not running', () => {
    const onDone = vi.fn();
    renderHook(() => useSlideTimer(false, onDone, DURATION));
    run(30000);
    expect(onDone).not.toHaveBeenCalled();
  });

  it('reset restarts the countdown', () => {
    const onDone = vi.fn();
    const { result } = renderHook(() => useSlideTimer(true, onDone, DURATION));
    run(5000);
    act(() => result.current.reset());
    expect(result.current.secondsLeft).toBe(6);
    run(5000);
    expect(onDone).not.toHaveBeenCalled();
    run(1200);
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
