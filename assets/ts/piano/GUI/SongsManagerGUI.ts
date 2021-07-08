import { SongsManager } from "../Classes/SongsManager";
import { Song } from "../Songs/Song";
import { Logger } from "../Log/Logger";

export interface SongGUI {
  prevNoteClass: string,
  currentNoteClass: string,
  nextNoteClass: string,
  songTitleClass: string,
  progressClass: string,
  restartClass: string,
}

export class SongsManagerGUI {

  prevNoteDiv: HTMLElement;
  currentNoteDiv: HTMLElement;
  nextNoteDiv: HTMLElement;
  songTitleDiv: HTMLElement;
  progressDiv: HTMLElement;
  restartBtn: HTMLButtonElement;

  songsManager: SongsManager;

  currentKey: HTMLElement;

  constructor(songGUI: SongGUI, songsManager: SongsManager) {
    this.prevNoteDiv = document.querySelector(songGUI.prevNoteClass);
    this.currentNoteDiv = document.querySelector(songGUI.currentNoteClass);
    this.nextNoteDiv = document.querySelector(songGUI.nextNoteClass);
    this.nextNoteDiv = document.querySelector(songGUI.nextNoteClass);
    this.songTitleDiv = document.querySelector(songGUI.songTitleClass);
    this.progressDiv = document.querySelector(songGUI.progressClass);
    this.restartBtn = document.querySelector(songGUI.restartClass);

    this.songsManager = songsManager;
  }

  loadSong(song: Song) {
    this.songTitleDiv.textContent = song.title;
    this.songsManager.loadSong(song);
    this.init();
  }

  init() {
    this.songsManager.init();

    this.currentKey = document.querySelector(`[data-note="${this.songsManager.currentNote}"]`);
    Logger.log(`[data-note="${this.songsManager.currentNote}"]`);
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

    this.currentKey = document.querySelector(`[data-note="${this.songsManager.currentNote}"]`);
    Logger.log(`[data-note="${this.songsManager.currentNote}"]`);
    this.currentKey?.classList.toggle('current-note');
  }

  draw() {
    this.prevNoteDiv.textContent = `Previous Note: ${this.songsManager.prevNote}`;

    this.currentNoteDiv.textContent = `Current Note: ${this.songsManager.currentNote ?? "||"}`;

    this.nextNoteDiv.textContent = `Next Note: ${this.songsManager.nextNote ?? ""}`;

    this.progressDiv.textContent = `Progress: ${this.songsManager.progress} out of ${this.songsManager.song.notes.length} notes`;
  }

}