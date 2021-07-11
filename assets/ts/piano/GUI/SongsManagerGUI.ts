import { SongsManager } from "../Classes/SongsManager";
import { Song } from "../Songs/Song";

export interface SongGUI {
  songsGUIParentClass: string,
  prevNoteClass: string,
  currentNoteClass: string,
  nextNoteClass: string,
  songTitleClass: string,
  progressClass: string,
  restartClass: string,
  bpmInputClass: string,
}

export class SongsManagerGUI {

  songsGUIParentDiv: HTMLElement;

  playBtns: NodeList;

  prevNoteDiv: HTMLElement;
  currentNoteDiv: HTMLElement;
  nextNoteDiv: HTMLElement;
  songTitleDiv: HTMLElement;
  progressDiv: HTMLElement;
  restartBtn: HTMLButtonElement;

  songsManager: SongsManager;

  currentKey: HTMLElement;
  bpmInput: HTMLInputElement;

  constructor(songGUI: SongGUI, songsManager: SongsManager) {
    this.songsGUIParentDiv = document.querySelector(songGUI.songsGUIParentClass);

    this.prevNoteDiv = document.querySelector(songGUI.prevNoteClass);
    this.currentNoteDiv = document.querySelector(songGUI.currentNoteClass);
    this.nextNoteDiv = document.querySelector(songGUI.nextNoteClass);
    this.nextNoteDiv = document.querySelector(songGUI.nextNoteClass);
    this.songTitleDiv = document.querySelector(songGUI.songTitleClass);
    this.progressDiv = document.querySelector(songGUI.progressClass);
    this.restartBtn = document.querySelector(songGUI.restartClass);
    this.bpmInput = document.querySelector(songGUI.bpmInputClass);
    this.bpmInput.addEventListener('change', () => {
      this.setBPM(parseInt(this.bpmInput.value));
    });
    this.songsManager = songsManager;
    this.bpmInput.value = this.songsManager.bpm.toString();
  }

  loadSong(song: Song) {
    this.songTitleDiv.textContent = song.title;
    this.songsManager.loadSong(song);
    this.init();
  }

  init() {
    this.reset();

    // Create song chunk buttons
    this.songsManager.song.lines.forEach((line, i) => {
      // Create div
      let playBtn = document.createElement('button');
      // Add data to div (line order)
      playBtn.dataset.line = `${i+1}`;
      // Add classes
      playBtn.classList.add('play', 'btn', 'btn-piano');
      // Add text content
      playBtn.textContent = `Line ${i+1}`;
      // Add div to songGUIParentDiv
      this.songsGUIParentDiv.appendChild(playBtn);
    });

    this.playBtns = document.querySelectorAll('.play');
  }

  reset() {
    this.songsManager.init();

    document.querySelectorAll('[data-note]').forEach((key: HTMLElement) => {
      if (key.classList.contains('current-note')) {
        key.classList.remove('current-note');
      }
    });
    this.currentKey = document.querySelector(`[data-note="${this.songsManager.getCurrentNote()}"]`);
    this.currentKey?.classList.toggle('current-note');

    this.draw();
  }

  checkPlayerNote(note: string) {
    // If wrong note
    if (!this.songsManager.checkPlayerNote(note)) {
      this.currentNoteDiv.classList.add('wrong-note');
      return;
    }
    // If correct note
    if (this.currentNoteDiv.classList.contains('wrong-note')) {
      this.currentNoteDiv.classList.remove('wrong-note');
    }
    this.update();
    this.draw();
  }

  update() {
    if (this.currentNoteDiv.classList.contains('wrong-note')) {
      this.currentNoteDiv.classList.remove('wrong-note');
    }
    this.currentKey?.classList.toggle('current-note');

    this.songsManager.update();

    this.currentKey = document.querySelector(`[data-note="${this.songsManager.getCurrentNote()}"]`);
    this.currentKey?.classList.toggle('current-note');
  }

  draw() {
    this.prevNoteDiv.textContent = `Previous Note: ${this.songsManager.getPrevNote()}`;

    this.currentNoteDiv.textContent = `Current Note: ${this.songsManager.getCurrentNote() ?? "||"}`;

    this.nextNoteDiv.textContent = `Next Note: ${this.songsManager.getNextNote() ?? ""}`;

    this.progressDiv.textContent = `Progress: ${this.songsManager.getProgress()[0]} out of ${this.songsManager.getProgress()[1]} notes`;
  }

  getLine(line: number) {
    return this.songsManager.getLine(line - 1);
  }

  highlight(note: string) {
    this.songsManager.highlight(note); //updates songManager.currentNote

    if (this.currentNoteDiv.classList.contains('wrong-note')) {
      this.currentNoteDiv.classList.remove('wrong-note');
    }
    this.currentKey?.classList.toggle('current-note');

    // this.songsManager.update();

    this.currentKey = document.querySelector(`[data-note="${this.songsManager.getCurrentNote()}"]`);
    this.currentKey?.classList.toggle('current-note');
    // this.draw();
  }

  setBPM(bpm: number) {
    this.songsManager.setBPM(bpm);
  }

}