import { useState, useEffect } from 'react';

type SoundName = 'correct' | 'incorrect' | 'complete' | 'click';

const MUTE_STORAGE_KEY = 'mathe_sound_muted';
const listeners = new Set<() => void>();

let muted = (() => {
  try {
    return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
})();

export function isSoundMuted() {
  return muted;
}

export function setSoundMuted(value: boolean) {
  muted = value;
  try {
    localStorage.setItem(MUTE_STORAGE_KEY, String(value));
  } catch {
    // ignore storage errors (e.g. private mode)
  }
  listeners.forEach(listener => listener());
}

export function useSoundSettings() {
  const [isMuted, setIsMuted] = useState(muted);
  useEffect(() => {
    const listener = () => setIsMuted(muted);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);
  return { muted: isMuted, toggleMuted: () => setSoundMuted(!muted) };
}

let audioCtx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(ctx: AudioContext, time: number, frequency: number, duration: number, volume = 0.2) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, time);
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(volume, time + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(time);
  oscillator.stop(time + duration);
}

const SOUNDS: Record<SoundName, (ctx: AudioContext) => void> = {
  correct: ctx => {
    const now = ctx.currentTime;
    playTone(ctx, now, 523.25, 0.12);
    playTone(ctx, now + 0.1, 659.25, 0.18);
  },
  incorrect: ctx => {
    const now = ctx.currentTime;
    playTone(ctx, now, 220, 0.2, 0.15);
    playTone(ctx, now + 0.08, 175, 0.25, 0.15);
  },
  complete: ctx => {
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      playTone(ctx, now + i * 0.12, freq, 0.2, 0.18);
    });
  },
  click: ctx => {
    playTone(ctx, ctx.currentTime, 440, 0.05, 0.08);
  },
};

export function playSound(name: SoundName) {
  if (muted) return;
  const ctx = getContext();
  if (!ctx) return;
  SOUNDS[name](ctx);
}
