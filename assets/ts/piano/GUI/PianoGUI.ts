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
    this.firstOctave = [
      "ShiftLeft",
      "KeyA",
      "KeyZ",
      "KeyS",
      "KeyX",
      "KeyC",
      "KeyF",
      "KeyV",
      "KeyG",
      "KeyB",
      "KeyH",
      "KeyN",
    ]
    this.secondOctave = [
      "KeyM",
      "KeyK",
      "Comma",
      "KeyL",
      "Period",
      "Slash",
      "Quote",
      "ShiftRight",
      "Digit1",
      "KeyQ",
      "Digit2",
      "KeyW",
    ]
    this.thirdOctave = [
      "KeyE",
      "Digit4",
      "KeyR",
      "Digit5",
      "KeyT",
      "KeyY",
      "Digit7",
      "KeyU",
      "Digit8",
      "KeyI",
      "Digit9",
      "KeyO",
      "KeyP"
    ]
    this.keyBoardMap = [
      ...this.firstOctave,
      ...this.secondOctave,
      ...this.thirdOctave
    ]
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