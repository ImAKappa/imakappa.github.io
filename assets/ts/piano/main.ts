// Based on tutorial from Web Dev Simplified:  https://www.youtube.com/watch?v=vjco5yKZpU8

// Node_module tone.js test
import * as Tone from 'tone';

//attach a click listener to a play button
document.querySelector('.tone-test')?.addEventListener('click', async () => {
	await Tone.start();
	console.log('audio is ready');
  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();

  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease("C4", "8n");
});

// Import test
import { MyClass } from "./MyClass";

let testInstance = new MyClass();
console.log(testInstance.sayHello("Hello"));

// Piano App
const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']

console.log('Piano');

const keys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');

keys.forEach(key => {
  key.addEventListener('click', () => playNote(key));
});

document.addEventListener('keydown', e => {
  if (e.repeat) return;
  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);
});

function playNote(key) {
  console.log(`Clicked ${key.dataset.note} key`);
  const noteAudio = document.getElementById(key.dataset.note) as HTMLAudioElement;
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add('active');
  noteAudio.addEventListener('ended', () => {
    key.classList.remove('active');
  });
}