// Web Audio API ambient purr and harp chiming synthesizer for calming feline ambience

let audioCtx: AudioContext | null = null;
let purrOsc: OscillatorNode | null = null;
let purrGain: GainNode | null = null;
let isAudioActive = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function startCalmingAudio(): void {
  try {
    const ctx = getAudioContext();
    if (isAudioActive) return;

    // Create soothing feline purr vibration using low frequency modulated oscillator
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(28, ctx.currentTime); // Low purr tone ~25-30 Hz

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(4.5, ctx.currentTime); // Rhythmic breathing rate
    lfoGain.gain.setValueAtTime(8, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    lfo.start();

    // Gentle harp chime chord
    const chordNotes = [261.63, 329.63, 392.00, 523.25]; // C major gentle chord
    chordNotes.forEach((freq, idx) => {
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.18);
      chimeGain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.18);
      chimeGain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + idx * 0.18 + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.18 + 2.5);

      chime.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chime.start(ctx.currentTime + idx * 0.18);
      chime.stop(ctx.currentTime + idx * 0.18 + 3.0);
    });

    purrOsc = osc;
    purrGain = gain;
    isAudioActive = true;
  } catch {
    // Audio context may not be supported or allowed yet
  }
}

export function stopCalmingAudio(): void {
  try {
    if (purrGain && audioCtx) {
      purrGain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.4);
      setTimeout(() => {
        if (purrOsc) {
          purrOsc.stop();
          purrOsc.disconnect();
          purrOsc = null;
        }
        isAudioActive = false;
      }, 450);
    } else {
      isAudioActive = false;
    }
  } catch {
    isAudioActive = false;
  }
}

export function isAudioPlaying(): boolean {
  return isAudioActive;
}

export function playLincolnMeow(): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc2.type = 'sine';

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(3.5, ctx.currentTime);

    const now = ctx.currentTime;
    // Pitch curve: 430Hz -> 750Hz -> 360Hz ("m-e-o-w-w-w")
    osc.frequency.setValueAtTime(430, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.22);
    osc.frequency.exponentialRampToValueAtTime(360, now + 0.65);

    osc2.frequency.setValueAtTime(435, now);
    osc2.frequency.exponentialRampToValueAtTime(755, now + 0.22);
    osc2.frequency.exponentialRampToValueAtTime(365, now + 0.65);

    // Formant sweep (opening mouth "meee" to "owww")
    filter.frequency.setValueAtTime(700, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + 0.2);
    filter.frequency.exponentialRampToValueAtTime(500, now + 0.65);

    // Volume envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.08);
    gain.gain.setValueAtTime(0.11, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.75);
    osc2.stop(now + 0.75);
  } catch {
    // Ignore if audio is blocked
  }
}

export function playGentleChime(): void {
  try {
    const ctx = getAudioContext();
    const chime = ctx.createOscillator();
    const gain = ctx.createGain();
    chime.type = 'sine';
    chime.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
    chime.connect(gain);
    gain.connect(ctx.destination);
    chime.start();
    chime.stop(ctx.currentTime + 0.8);
  } catch {
    // Ignore if audio is blocked
  }
}


