import { Song } from './Song';

let line1 = [
  {freq: 'E4', dur: '8n'}, // I
  {freq: 'G4', dur: '4n'}, // heard
  {freq: 'G4', dur: '8n'}, // there
  {freq: 'G4', dur: '4n'}, // was
  {freq: 'G4', dur: '8n'}, // a
  {freq: 'A4', dur: '4n'}, // se-
  {freq: 'A4', dur: '8n'}, // -cret
  {freq: 'A4', dur: '4n'} // chord
];

export const HALLELUJAH: Song = {
  title: "Hallelujah",
  notes: [
    ...line1,
  ],
  lines: [
    line1,
  ]
};