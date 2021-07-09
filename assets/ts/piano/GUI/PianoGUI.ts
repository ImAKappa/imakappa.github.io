import { Piano } from "../Classes/Piano";

export class PianoGUI {

  piano: Piano;
  pianoKeys: NodeList;
  keyBoardMap: string[];
  firstOctave: string[];
  secondOctave: string[];
  thirdOctave: string[];

  constructor(piano: Piano, pianoKeys: NodeList) {
    this.piano = piano;
    this.pianoKeys = pianoKeys;
  }

  playNote(key: HTMLElement) {
    key.classList.add('active');
    return this.piano.playNote(key);
  }

  releaseNote(key: HTMLElement) {
    key.classList.remove('active');
    return this.piano.releaseNote(key);
  }

}