import { Logger } from "../Log/Logger";
import { Song } from "../Songs/Song";
import { SongsWindow } from "../UI/SongsWindow";

export class SongsController {

  songWindow: SongsWindow;
  song: Song;
  prevNote: string;
  currentNote: string;
  nextNote: string;
  progress: number;
  score: number;

  constructor(songWindow: SongsWindow) {
    this.songWindow = songWindow;
  }

  loadSong(song: Song) {
    this.song = song;
    this.songWindow.songTitleDiv.textContent = this.song.title;
    Logger.log("Song loaded:", {"song": this.song.title}, "SongsController (loadSong)");
    this.init();
    this.draw();
  }

  init() {
    this.progress = 0;
    this.prevNote = " ";
    this.currentNote = this.song.notes[this.progress];
    if (this.progress + 1 < this.song.notes.length) {
      this.nextNote = this.song.notes[this.progress + 1];
    }
    Logger.log("Current Progress", {"progress": this.progress}, "SongsController (init)");
  }

  checkPlayerNote(note: string) {
    Logger.log("Recieved note:", {"note": note}, "SongsController (checkPlayerNote)");
    if (note !== this.currentNote) {
      Logger.log("Wrong note!:", {"Played note": note, "Actual note": this.currentNote}, 
      "SongsController (checkPlayerNote)");
      return;
    }
    this.update();
  }

  update() {
    this.progress += 1;

    this.prevNote = this.currentNote;



    if (this.progress < this.song.notes.length) {
      this.currentNote = this.song.notes[this.progress];
      this.nextNote = this.song.notes[this.progress + 1];
    } else {
      this.currentNote = null;
      this.nextNote = null;
    }

    Logger.log("Updated vars:", {"Progress": this.progress, 
      "Current Note": this.currentNote}, "SongsController (checkPlayerNote)");

    this.draw();
  }

  draw() {
    this.songWindow.prevNoteDiv.textContent = `Previous Note ${this.prevNote}`;

    this.songWindow.currentNoteDiv.textContent = `Current Note: ${this.currentNote ?? "||"}`;

    this.songWindow.nextNoteDiv.textContent = `Next Note: ${this.nextNote ?? ""}`;

    this.songWindow.progressDiv.textContent = `Progress: ${this.progress} out of ${this.song.notes.length} notes`;
  }
}