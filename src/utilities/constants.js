const lineStates = [
  { value: "none", changing: false },
  { value: "yin", changing: false },
  { value: "yin", changing: true },
  { value: "yang", changing: false },
  { value: "yang", changing: true },
];

const trigramStates = [
  { name: "None", trigramLines: ["none", "none", "none"] },
  { name: "Heaven", trigramLines: ["yang", "yang", "yang"] },
  { name: "Earth", trigramLines: ["yin", "yin", "yin"] },
  { name: "Thunder", trigramLines: ["yin", "yin", "yang"] },
  { name: "Wind", trigramLines: ["yang", "yang", "yin"] },
  { name: "Water", trigramLines: ["yin", "yang", "yin"] },
  { name: "Mountain", trigramLines: ["yang", "yin", "yin"] },
  { name: "Fire", trigramLines: ["yang", "yin", "yang"] },
  { name: "Lake", trigramLines: ["yin", "yang", "yang"] },
];

const hexagramStates = [
  { number: 0, trigrams: ["None", "None"] },
  { number: 1, trigrams: ["Heaven", "Heaven"] },
  { number: 2, trigrams: ["Earth", "Earth"] },
  { number: 3, trigrams: ["Water", "Thunder"] },
  { number: 4, trigrams: ["Mountain", "Water"] },
  { number: 5, trigrams: ["Water", "Heaven"] },
  { number: 6, trigrams: ["Heaven", "Water"] },
  { number: 7, trigrams: ["Earth", "Water"] },
  { number: 8, trigrams: ["Water", "Earth"] },
  { number: 9, trigrams: ["Wind", "Heaven"] },
  { number: 10, trigrams: ["Heaven", "Lake"] },
  { number: 11, trigrams: ["Earth", "Heaven"] },
  { number: 12, trigrams: ["Heaven", "Earth"] },
  { number: 13, trigrams: ["Heaven", "Fire"] },
  { number: 14, trigrams: ["Fire", "Heaven"] },
  { number: 15, trigrams: ["Earth", "Mountain"] },
  { number: 16, trigrams: ["Thunder", "Earth"] },
  { number: 17, trigrams: ["Lake", "Thunder"] },
  { number: 18, trigrams: ["Mountain", "Wind"] },
  { number: 19, trigrams: ["Earth", "Lake"] },
  { number: 20, trigrams: ["Wind", "Earth"] },
  { number: 21, trigrams: ["Fire", "Thunder"] },
  { number: 22, trigrams: ["Mountain", "Fire"] },
  { number: 23, trigrams: ["Mountain", "Earth"] },
  { number: 24, trigrams: ["Earth", "Thunder"] },
  { number: 25, trigrams: ["Heaven", "Thunder"] },
  { number: 26, trigrams: ["Mountain", "Heaven"] },
  { number: 27, trigrams: ["Mountain", "Thunder"] },
  { number: 28, trigrams: ["Lake", "Wind"] },
  { number: 29, trigrams: ["Water", "Water"] },
  { number: 30, trigrams: ["Fire", "Fire"] },
  { number: 31, trigrams: ["Lake", "Mountain"] },
  { number: 32, trigrams: ["Thunder", "Wind"] },
  { number: 33, trigrams: ["Heaven", "Mountain"] },
  { number: 34, trigrams: ["Thunder", "Heaven"] },
  { number: 35, trigrams: ["Fire", "Earth"] },
  { number: 36, trigrams: ["Earth", "Fire"] },
  { number: 37, trigrams: ["Wind", "Fire"] },
  { number: 38, trigrams: ["Fire", "Lake"] },
  { number: 39, trigrams: ["Water", "Mountain"] },
  { number: 40, trigrams: ["Thunder", "Water"] },
  { number: 41, trigrams: ["Mountain", "Lake"] },
  { number: 42, trigrams: ["Wind", "Thunder"] },
  { number: 43, trigrams: ["Lake", "Heaven"] },
  { number: 44, trigrams: ["Heaven", "Wind"] },
  { number: 45, trigrams: ["Lake", "Earth"] },
  { number: 46, trigrams: ["Earth", "Wind"] },
  { number: 47, trigrams: ["Lake", "Water"] },
  { number: 48, trigrams: ["Water", "Wind"] },
  { number: 49, trigrams: ["Lake", "Fire"] },
  { number: 50, trigrams: ["Fire", "Wind"] },
  { number: 51, trigrams: ["Thunder", "Thunder"] },
  { number: 52, trigrams: ["Mountain", "Mountain"] },
  { number: 53, trigrams: ["Wind", "Mountain"] },
  { number: 54, trigrams: ["Thunder", "Lake"] },
  { number: 55, trigrams: ["Thunder", "Fire"] },
  { number: 56, trigrams: ["Fire", "Mountain"] },
  { number: 57, trigrams: ["Wind", "Wind"] },
  { number: 58, trigrams: ["Lake", "Lake"] },
  { number: 59, trigrams: ["Wind", "Water"] },
  { number: 60, trigrams: ["Water", "Lake"] },
  { number: 61, trigrams: ["Wind", "Lake"] },
  { number: 62, trigrams: ["Thunder", "Mountain"] },
  { number: 63, trigrams: ["Water", "Fire"] },
  { number: 64, trigrams: ["Fire", "Water"] },
];

const emptyTrigram = trigramStates[0];
const emptyHexagram = hexagramStates[0];

export {
  lineStates,
  trigramStates,
  hexagramStates,
  emptyTrigram,
  emptyHexagram,
};
