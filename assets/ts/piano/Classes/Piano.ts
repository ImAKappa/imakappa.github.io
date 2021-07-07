import * as Tone from 'tone';

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

  playNote(key: HTMLElement): string {
    let note = key.dataset.note
    // console.log(`Pressed ${note} key`);
    let noteAudioOn = this.pianoSampler.triggerAttack(note);
    key.classList.add('active');
    return note;
  }

  releaseNote(key: HTMLElement): string {
    let note = key.dataset.note;
    // console.log(`Released ${note} key`);
    let noteAudioOff = this.pianoSampler.triggerRelease(note);
    key.classList.remove('active');
    return note;
  }

}