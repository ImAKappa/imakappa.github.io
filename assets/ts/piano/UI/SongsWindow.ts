interface HTMLSongElementClasses {
  prevNoteClass: string,
  currentNoteClass: string,
  nextNoteClass: string,
  songTitleClass: string,
  progressClass: string
}

export class SongsWindow {

  prevNoteDiv: HTMLElement
  currentNoteDiv: HTMLElement
  nextNoteDiv: HTMLElement
  songTitleDiv: HTMLElement;
  progressDiv: HTMLElement;

  constructor(HTMLelements: HTMLSongElementClasses) {
    this.prevNoteDiv = document.querySelector(HTMLelements.prevNoteClass);
    this.currentNoteDiv = document.querySelector(HTMLelements.currentNoteClass);
    this.nextNoteDiv = document.querySelector(HTMLelements.nextNoteClass);
    this.nextNoteDiv = document.querySelector(HTMLelements.nextNoteClass);
    this.songTitleDiv = document.querySelector(HTMLelements.songTitleClass);
    this.progressDiv = document.querySelector(HTMLelements.progressClass);
  }
}