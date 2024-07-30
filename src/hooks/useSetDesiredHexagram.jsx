import { hexagramStates, trigramStates } from "../utilities/constants";
// useGlobalHooks.js
export function useSetDesiredHexagram(lines, setLines) {
  // This hook computes the difference between the current hexagram and the desired transformed hexagram
  // It then sets the lines to the values necessary to move from one hexagram to another
  const setDesiredHexagram = (desiredHexagramNumber) => {
    const newDesiredHexagram = hexagramStates.find(
      (hexagram) => hexagram.number === desiredHexagramNumber
    );

    const newUpperTrigram = trigramStates.find(
      (trigram) => trigram.name === newDesiredHexagram.trigrams[0]
    );

    const newLowerTrigram = trigramStates.find(
      (trigram) => trigram.name === newDesiredHexagram.trigrams[1]
    );

    const desiredLines = {
      line6: { value: newUpperTrigram.trigramLines[0], changing: false },
      line5: { value: newUpperTrigram.trigramLines[1], changing: false },
      line4: { value: newUpperTrigram.trigramLines[2], changing: false },
      line3: { value: newLowerTrigram.trigramLines[0], changing: false },
      line2: { value: newLowerTrigram.trigramLines[1], changing: false },
      line1: { value: newLowerTrigram.trigramLines[2], changing: false },
    };

    const newLines = {
      line6: {
        ...lines.line6,
        changing: lines.line6.value !== desiredLines.line6.value,
      },
      line5: {
        ...lines.line5,
        changing: lines.line5.value !== desiredLines.line5.value,
      },
      line4: {
        ...lines.line4,
        changing: lines.line4.value !== desiredLines.line4.value,
      },
      line3: {
        ...lines.line3,
        changing: lines.line3.value !== desiredLines.line3.value,
      },
      line2: {
        ...lines.line2,
        changing: lines.line2.value !== desiredLines.line2.value,
      },
      line1: {
        ...lines.line1,
        changing: lines.line1.value !== desiredLines.line1.value,
      },
    };

    setLines(newLines);
  };

  return setDesiredHexagram;
}
