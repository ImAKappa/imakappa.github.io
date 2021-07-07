import { Piano } from "../Classes/Piano";

export class PianoGUI {

  piano: Piano;
  pianoKeys: NodeList;

  constructor(piano: Piano, pianoKeys: NodeList) {
    this.piano = piano;
    this.pianoKeys = pianoKeys;
  }

  playNote(key: HTMLElement) {
    return this.piano.playNote(key);
  }

  releaseNote(key: HTMLElement) {
    return this.piano.releaseNote(key);
  }

}