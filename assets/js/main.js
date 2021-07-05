console.log("Hello, world!");

let testFunc = (hello) => {
  return `Goodbye ${hello}`;
}

console.log(testFunc("EREN"));

const str = "   string   ";

// es2019
console.log(str.trimStart()); // => "string   "
console.log(str.trimEnd()); // => "   string"

const arr = ['a', 'b', ['c', 'd']];
const flattened = arr.flat();

console.log(flattened); // => ["a", "b", "c", "d"]