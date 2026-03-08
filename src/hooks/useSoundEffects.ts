/**
 * useSoundEffects — Comprehensive Audio Engine for SHANMUKHA_OS
 */

let ctx: AudioContext | null = null;

const getCtx = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch { return null; }
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
};

let masterVolume = parseFloat(localStorage.getItem('system_volume') || '0.8');

export const setMasterVolume = (v: number) => {
  masterVolume = Math.max(0, Math.min(1, v));
  localStorage.setItem('system_volume', v.toString());
};

export const getMasterVolume = () => masterVolume;

const playTone = (freq: number, dur: number, type: OscillatorType = 'sine', vol = 1) => {
  const c = getCtx();
  if (!c || masterVolume <= 0) return;
  const g = c.createGain();
  g.gain.setValueAtTime(masterVolume * vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  g.connect(c.destination);
  const o = c.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, c.currentTime);
  o.connect(g);
  o.start();
  o.stop(c.currentTime + dur);
};

// --- Standard UI Sounds ---
export const playClick = () => playTone(600, 0.06, 'square', 0.7);
export const playHover = () => playTone(1200, 0.04, 'sine', 0.2);
export const playKeyTick = () => playTone(900 + Math.random() * 200, 0.03, 'square', 0.1);

export const playSuccess = () => {
  playTone(523, 0.2, 'sine', 0.8);
  setTimeout(() => playTone(784, 0.2, 'sine', 0.8), 120);
};

export const playError = () => {
  playTone(200, 0.3, 'sawtooth', 0.7);
  setTimeout(() => playTone(150, 0.3, 'sawtooth', 0.7), 100);
};

// --- System Sounds ---
export const playTerminalOpen = () => {
  playTone(80, 0.5, 'sawtooth', 0.6);
  setTimeout(() => playTone(440, 0.1, 'square', 0.2), 150);
};

export const playTerminalClose = () => playTone(220, 0.2, 'sawtooth', 0.6);

// FIX: Explicitly exported for ContactSection.tsx
export const playPop = () => playTone(880, 0.1, 'sine', 0.9);

// FIX: Explicitly exported for page transitions/scrolling
export const playWhoosh = () => playTone(120, 0.3, 'sine', 0.7);

// --- The Hook Export ---
const useSoundEffects = () => ({
  playClick,
  playHover,
  playKeyTick,
  playSuccess,
  playError,
  playTerminalOpen,
  playTerminalClose,
  playPop,
  playWhoosh,
  setMasterVolume,
  getMasterVolume,
});

export default useSoundEffects;