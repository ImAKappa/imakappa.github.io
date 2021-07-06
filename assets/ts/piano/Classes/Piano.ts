import * as Tone from 'tone';

export class Piano {
  // Responsible for playing sounds
  sampler: Tone.Sampler;

  constructor(sampler: Tone.Sampler) {
    this.sampler = sampler;
  }

  playNote(key: HTMLElement): string {
    let note = key.dataset.note
    // console.log(`Pressed ${note} key`);
    let noteAudioOn = this.sampler.triggerAttack(note);
    key.classList.add('active');
    return note;
  }

  releaseNote(key: HTMLElement): string {
    let note = key.dataset.note;
    // console.log(`Released ${note} key`);
    let noteAudioOff = this.sampler.triggerRelease(note);
    key.classList.remove('active');
    return note;
  }

}