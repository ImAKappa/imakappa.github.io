import { Piano } from "./Piano";
import { SongsController } from "./SongsController";

export class PianoInputHandler {

  piano: Piano;
  pianoKeys: NodeList;
  restartBtn: HTMLButtonElement;

  constructor(piano: Piano, keys: NodeList, restartBtn: HTMLButtonElement) {
    this.piano = piano;
    this.pianoKeys = keys;
    this.restartBtn = restartBtn;
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
    this.restartBtn.addEventListener('click', () => {
      songsController.init();
    });
  }

}