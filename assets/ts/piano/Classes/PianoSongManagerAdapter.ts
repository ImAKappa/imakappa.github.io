import { PianoGUI } from "../GUI/PianoGUI";
import { SongsManagerGUI } from "../GUI/SongsManagerGUI";

export class PianoSongManagerAdapter {

  pianoGUI: PianoGUI;
  songManagerGUI: SongsManagerGUI;

  constructor(pianoGUI: PianoGUI, songManagerGUI: SongsManagerGUI) {
    this.pianoGUI = pianoGUI;
    this.songManagerGUI = songManagerGUI;
  }

  init() {
    this.pianoGUI.pianoKeys.forEach(key => {
      key.addEventListener('mousedown', () => this.pianoGUI.playNote(key as HTMLElement));
      key.addEventListener('mouseup', () => {
        this.songManagerGUI.checkPlayerNote(this.pianoGUI.releaseNote(key as HTMLElement));
      });
      // Figure out how to run mouseleave code only if mouse is down
      key.addEventListener('mouseleave', () => this.pianoGUI.releaseNote(key as HTMLElement));
      // Figure out how to play note on mouseover if mouse is down
    });
    // console.log("Piano initialization complete");
    this.songManagerGUI.restartBtn.addEventListener('click', () => {
      this.songManagerGUI.init();
    });
  }

}