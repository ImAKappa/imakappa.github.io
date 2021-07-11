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

  playSequence(line: {}[], drawFunc: (value: {time: number, note: string, duration: string}) => void) {
    // Stop, rewind and clear all events from the transport (from previous plays)
    Tone.Transport.stop();
    Tone.Transport.position = 0;
    Tone.Transport.cancel();
    //use an array of objects as long as the object has a "time" attribute
    const part = new Tone.Part((time, value: {time: number, note: string, duration: string}) => {
      //the value is an object which contains both the note and the duration
      this.pianoSampler.triggerAttackRelease(value!.note, value!.duration, time);
      Tone.Draw.schedule(() => {
        console.log(value!.note);
        drawFunc(value);
      }, time);
    }, line).start(0);
    part.loop = false;
    Logger.log("ToneJS Sequence", {"sequence": part});
    Tone.Transport.start('+0.1'); // '+0.1' helps avoid pops
  }
}