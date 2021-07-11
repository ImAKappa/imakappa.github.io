// Based on tutorial from Web Dev Simplified:  https://www.youtube.com/watch?v=vjco5yKZpU8

import * as Tone from 'tone';
import { Piano } from "./Classes/Piano";
import { PianoSongManagerAdapter } from './Classes/PianoSongManagerAdapter';
import {SongGUI, SongsManagerGUI } from './GUI/SongsManagerGUI';
import { SongsManager } from './Classes/SongsManager';
import { HALLELUJAH } from './Songs/Hallelujah';
import { PianoGUI } from './GUI/PianoGUI';

//SETUP: Start Tone
window.addEventListener('load', () => {
	Tone.start();
	console.log('Audio is ready');
});

//SETUP: Initialize piano GUI & Instrument
const piano = new Piano();
const keys = document.querySelectorAll('.key');
const bpmInput = document.querySelector('input.bpm') as HTMLInputElement;
const pianoGUI = new PianoGUI(piano, keys);

//SETUP: Initialize Songs GUI & Manager
const songGUI: SongGUI = {
  songsGUIParentClass: '.lines-window',
  prevNoteClass: '.prev-note',
  currentNoteClass: '.current-note',
  nextNoteClass: '.next-note',
  songTitleClass: '.song-title',
  progressClass: '.progress',
  restartClass: '.restart',
  bpmInputClass: '.bpm',
};

const songsManager = new SongsManager();
const songsManagerGUI = new SongsManagerGUI(songGUI, songsManager);

//SETUP: Link SongsManager and Piano through Adapter; load default song
const pianoSongManagerAdapter = new PianoSongManagerAdapter(pianoGUI, songsManagerGUI);
songsManagerGUI.loadSong(HALLELUJAH);
pianoSongManagerAdapter.init();