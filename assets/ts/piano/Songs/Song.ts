export interface Song {
  title: string,
  notes: {freq: string, dur: string}[],
  lines: {freq: string, dur: string}[][]
}