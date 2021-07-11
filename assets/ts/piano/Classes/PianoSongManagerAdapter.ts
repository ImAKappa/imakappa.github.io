import { PianoGUI } from "../GUI/PianoGUI";
import { SongsManagerGUI } from "../GUI/SongsManagerGUI";
import { Logger } from "../Log/Logger";

export class PianoSongManagerAdapter {

  pianoGUI: PianoGUI;
  songManagerGUI: SongsManagerGUI;

  constructor(pianoGUI: PianoGUI, songManagerGUI: SongsManagerGUI) {
    this.pianoGUI = pianoGUI;
    this.songManagerGUI = songManagerGUI;
  }

  init() {
    // Mouse interactions
    this.pianoGUI.pianoKeys.forEach(key => {
      key.addEventListener('mousedown', () => this.pianoGUI.playNote(key as HTMLElement));
      key.addEventListener('mouseup', () => {
        this.songManagerGUI.checkPlayerNote(this.pianoGUI.releaseNote(key as HTMLElement));
      });
      // Figure out how to run mouseleave code only if mouse is down
      key.addEventListener('mouseleave', () => this.pianoGUI.releaseNote(key as HTMLElement));
      // Figure out how to play note on mouseover if mouse is down
    });

    // Play Buttons
    this.songManagerGUI.playBtns.forEach((btn: HTMLButtonElement) => {
      btn.addEventListener('click', () => {
        this.playLine(parseInt(btn.dataset.line));
      });
    });

    // SongManager initialization
    this.songManagerGUI.restartBtn.addEventListener('click', () => {
      this.songManagerGUI.reset();
    });
  }

  playLine(line: number) {
    this.pianoGUI.playSequence(this.songManagerGUI.getLine(line), (value) => {
      this.songManagerGUI.highlight(value.note);
    });
  }

}