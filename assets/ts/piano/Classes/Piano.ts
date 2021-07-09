import * as Tone from 'tone';
import { Logger } from '../Log/Logger';

export class Piano {
  // Responsible for playing sounds
  pianoSampler: Tone.Sampler;

  constructor() {
    this.pianoSampler = new Tone.Sampler({
      urls: {
        "C4": "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        "A4": "A4.mp3",
        "C5": "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        "A5": "A5.mp3",
        "C6": "C6.mp3",
      },
      release: 1,
      baseUrl: "salamander/",
    }).toDestination();
  }

  playNote(frequency: string, duration?: string): string {
    let noteAudioOn = this.pianoSampler.triggerAttack(frequency, duration);
    return frequency;
  }

  releaseNote(frequency: string, duration?: string): string {
    let noteAudioOff = this.pianoSampler.triggerRelease(frequency, duration);
    return frequency;
  }

  playSequence() {
    // Stop, rewind and clear all events from the transport (from previous plays)
    Tone.Transport.stop();
    Tone.Transport.position = 0;
    Tone.Transport.cancel();
    const seq = new Tone.Sequence((time, note) => {
      this.pianoSampler.triggerAttackRelease(note, 0.1, time);
      // subdivisions are given as subarrays
    }, ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]]).start(0);
    seq.loop = false;
    Logger.log("ToneJS Sequence", {"sequence": seq});
    Tone.Transport.start('+0.1'); // '+0.1' helps avoid pops
  }

}