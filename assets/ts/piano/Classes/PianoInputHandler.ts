import { Piano } from "./Piano";
import { SongsController } from "./SongsController";

export class PianoInputHandler {

  piano: Piano
  pianoKeys: NodeList

  constructor(piano: Piano, keys: NodeList) {
    this.piano = piano;
    this.pianoKeys = keys;
  }

  init(songsController: SongsController) {
    this.pianoKeys.forEach(key => {
      key.addEventListener('mousedown', () => this.piano.playNote(key as HTMLElement));
      key.addEventListener('mouseup', () => {
        songsController.checkPlayerNote(this.piano.releaseNote(key as HTMLElement));
      });
      // Figure out how to run mouseleave code only if mouse is down
      key.addEventListener('mouseleave', () => this.piano.releaseNote(key as HTMLElement));
      // Figure out how to play note on mouseover if mouse is down
    });
    // console.log("Piano initialization complete");
  }

}