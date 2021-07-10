import { Piano } from "../Classes/Piano";

export class PianoGUI {

  piano: Piano;
  pianoKeys: NodeList;

  constructor(piano: Piano, pianoKeys: NodeList) {
    this.piano = piano;
    this.pianoKeys = pianoKeys;
  }

  playNote(key: HTMLElement | string, duration?: string) {
    if (typeof key === 'string') return this.piano.playNote(key, duration);
    key.classList.add('active');
    return this.piano.playNote(key.dataset.note, duration);
  }

  releaseNote(key: HTMLElement | string, duration?: string) {
    if (typeof key === 'string') return this.piano.playNote(key, duration);
    key.classList.remove('active');
    return this.piano.releaseNote(key.dataset.note, duration);
  }

  playSequence(line: {}[], drawFunc: (value: {time: number, note: string, duration: string}) => void) {
    this.piano.playSequence(line, drawFunc);
  }

  setBPM(bpm: number) {
    this.piano.setBPM(bpm);
  }

}