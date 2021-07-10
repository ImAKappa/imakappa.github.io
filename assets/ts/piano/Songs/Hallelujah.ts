import { Song } from './Song';

let line1 = {
  'pitches': ['E4', 'G4', 'G4', 'G4', 'G4', 'A4', 'A4', 'A4'],
  'durations': ['8n', '4n', '8n', '4n', '8n', '4n', '8n', '4n']
}

let line2 = {
  'pitches': ['E4', 'G4', 'G4', 'G4', 'G4', 'A4', 'A4', 'A4'],
  'durations': ['8n', '4n', '8n', '4n', '8n', '4n', '8n', '4n']
}

let line3 = {
  'pitches': ['G4', 'A4', 'A4', 'A4', 'A4', 'A4', 'G4', 'G4', 'F4', 'G4', 'G4'],
  'durations': ['8n', '4n', '8n', '4n', '8n', '4n', '8n', '4n', '8n', '8n', '4n']
}

let line4 = {
  'pitches': ['E4', 'G4', 'G4', 'G4', 'G4', 'A4', 'A4', 'B4', 'B4'],
  'durations': ['8n', '4n', '8n', '4n', '8n', '4n', '8n', '4n', '8n']
}

let line5 = {
  'pitches': ['C5', 'C5', 'C5', 'A4', 'C5', 'C5', 'D5', 'C5'],
  'durations': ['4n', '8n', '4n', '8n', '4n', '8n', '4n', '8n']
}

let line6 = {
  'pitches': ['D5', 'D5', 'D5', 'D5', 'E5', 'E5', 'E5', 'D5', 'D5', 'C5'],
  'durations': ['4n', '8n', '4n', '8n', '4n', '8n', '4n', '8n', '8n', '2n']
}

// let line1 = [
//   {freq: 'E4', dur: '8n'}, // I
//   {freq: 'G4', dur: '4n'}, // heard
//   {freq: 'G4', dur: '8n'}, // there
//   {freq: 'G4', dur: '4n'}, // was
//   {freq: 'G4', dur: '8n'}, // a
//   {freq: 'A4', dur: '4n'}, // se-
//   {freq: 'A4', dur: '8n'}, // -cret
//   {freq: 'A4', dur: '4n'} // chord
// ];

export const HALLELUJAH: Song = {
  'title': "Hallelujah",
  'lines': [
    line1,
    line2,
    line3,
    line4,
    line5,
    line6,
  ]
};