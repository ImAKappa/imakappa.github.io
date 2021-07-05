import { Piano } from "./Piano";

export class PianoInputHandler {

  piano: Piano
  pianoKeys: NodeList

  constructor(piano: Piano, keys: NodeList) {
    this.piano = piano;
    this.pianoKeys = keys;
  }

  init() {
    this.pianoKeys.forEach(key => {
      key.addEventListener('mousedown', () => this.piano.playNote(key));
      key.addEventListener('mouseup', () => this.piano.releaseNote(key));
    });
    console.log("Piano initialization complete");
  }

}