import { Logger } from "../Log/Logger";
import { Song } from "../Songs/Song";

export class SongsManager {

  song: Song;
  prevNote: string;
  currentNote: string;
  nextNote: string;
  progress: number;
  score: number;

  constructor() {

  }

  loadSong(song: Song) {
    this.song = song;
    Logger.log("Song loaded:", {"song": this.song.title}, "SongsController (loadSong)");
    this.init();
  }

  init() {
    this.progress = 0;
    this.prevNote = " ";
    this.currentNote = this.song.notes[this.progress].freq;
    if (this.progress + 1 < this.song.notes.length) {
      this.nextNote = this.song.notes[this.progress + 1].freq;
    }
    Logger.log("Current Progress", {"progress": this.progress}, "SongsController (init)");
  }

  checkPlayerNote(note: string): boolean {
    Logger.log("Recieved note:", {"note": note}, "SongsController (checkPlayerNote)");
    if (note !== this.currentNote) {
      Logger.log("Wrong note!:", {"Played note": note, "Actual note": this.currentNote}, 
      "SongsController (checkPlayerNote)");
      return false;
    }
    return true;
  }

  update() {
    this.progress += 1;

    this.prevNote = this.currentNote;

    if (this.progress < this.song.notes.length) {
      this.currentNote = this.song.notes[this.progress].freq;
      this.nextNote = this.song.notes[this.progress + 1].freq;
    } else {
      this.currentNote = null;
      this.nextNote = null;
    }

    Logger.log("Updated vars:", {"Progress": this.progress, 
      "Current Note": this.currentNote}, "SongsController (checkPlayerNote)");
  }

  getLine(idx: number) {
    return this.song.lines[idx];
  }

  highlight(note: string) {
    this.currentNote = note;
  }
}