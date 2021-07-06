// Based on tutorial from Web Dev Simplified:  https://www.youtube.com/watch?v=vjco5yKZpU8

import * as Tone from 'tone';
import { Piano } from "./Classes/Piano";
import { PianoInputHandler } from './Classes/PianoInputHandler';
import {SongsWindow } from './UI/SongsWindow';
import { SongsController } from './Classes/SongsController';
import { HALLELUJAH } from './Songs/Hallelujah';

//SETUP: Start Tone
window.addEventListener('load', () => {
	Tone.start();
	console.log('Audio is ready');
});

const pianoSampler = new Tone.Sampler({
  urls: {
    "C4": "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    "A4": "A4.mp3",
    "C5": "C5.mp3",
    "D#5": "Ds5.mp3",
    "F#5": "Fs5.mp3",
    "A5": "A5.mp3",
    "C6": "C6.mp3",
  },
  release: 1,
  baseUrl: "salamander/",
}).toDestination();

//SETUP: Get keys from DOM
// console.log("Grabbing keys from DOM");
const keys = document.querySelectorAll('.key');
const restartBtn = document.querySelector('.restart');

//SETUP: Initialize piano
// console.log('Setting up Piano');
let piano = new Piano(pianoSampler);
let pianoInputHandler = new PianoInputHandler(piano, keys, restartBtn as HTMLButtonElement);

//SETUP: Initialize Songs Window & Controller
let songWindowElements = {
  prevNoteClass: '.prev-note',
  currentNoteClass: '.current-note',
  nextNoteClass: '.next-note',
  songTitleClass: '.song-title',
  progressClass: '.progress'
};
let songWindow = new SongsWindow(songWindowElements);
let songsController = new SongsController(songWindow);

//SETUP: Link songController and piano through pianoInputHandler
songsController.loadSong(HALLELUJAH);
pianoInputHandler.init(songsController);


// Piano App
// const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
// const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']


// const whiteKeys = document.querySelectorAll('.key.white');
// const blackKeys = document.querySelectorAll('.key.black');

// document.addEventListener('keydown', e => {
//   if (e.repeat) return;
//   const key = e.key;
//   const whiteKeyIndex = WHITE_KEYS.indexOf(key);
//   const blackKeyIndex = BLACK_KEYS.indexOf(key);

//   if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
//   if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);
// });

// function playNote(key) {
//   console.log(`Clicked ${key.dataset.note} key`);
//   const noteAudio = document.getElementById(key.dataset.note);
//   noteAudio.currentTime = 0;
//   noteAudio.play();
//   key.classList.add('active');
//   noteAudio.addEventListener('ended', () => {
//     key.classList.remove('active');
//   });
// }