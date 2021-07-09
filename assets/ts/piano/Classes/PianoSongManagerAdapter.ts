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

    // Logger.log("Length check: ", { "Keys": this.pianoGUI.pianoKeys.length, "KeyMap": this.pianoGUI.keyBoardMap.length });
    // Keyboard interactions
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!e.repeat) {
        Logger.log("KeyDown", {"Computer Key" : e.code });
        const keyIdx = this.pianoGUI.keyBoardMap.indexOf(e.code);
        if (keyIdx >= 0) {
          const key = this.pianoGUI.pianoKeys[keyIdx] as HTMLElement;
          this.pianoGUI.playNote(key);
        }
      }
    });

    document.addEventListener('keyup', (e: KeyboardEvent) => {
      Logger.log("KeyUp", {"Computer Key" : e.code });
      const keyIdx = this.pianoGUI.keyBoardMap.indexOf(e.code);
      if (keyIdx >= 0) {
        const key = this.pianoGUI.pianoKeys[keyIdx] as HTMLElement;
        this.pianoGUI.releaseNote(key);
      }
    });

    // SongManager initialization
    this.songManagerGUI.restartBtn.addEventListener('click', () => {
      this.songManagerGUI.init();
    });
  }



}