let ctx: AudioContext | null = null;

/** A short, soft two-note chime synthesized with Web Audio (no asset). Stays silent where audio is unavailable or the browser blocks it before a user gesture. */
export function playNotificationSound() {
  if (typeof window === 'undefined') return;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  try {
    ctx ??= new AC();
    if (ctx.state === 'suspended') void ctx.resume();
    const t0 = ctx.currentTime;
    [659.25, 987.77].forEach((freq, i) => {   // E5 then B5
      const start = t0 + i * 0.11, osc = ctx!.createOscillator(), gain = ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.07, start + 0.02);    // gentle attack
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.45);  // smooth decay
      osc.connect(gain).connect(ctx!.destination);
      osc.start(start);
      osc.stop(start + 0.5);
    });
  } catch { /* audio unavailable */ }
}
