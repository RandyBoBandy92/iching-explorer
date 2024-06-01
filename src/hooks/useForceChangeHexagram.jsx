import { hexagramStates, trigramStates } from "../utilities/constants";
// useGlobalHooks.js
export function useForceChangeHexagram(setLines) {
  const forceChangeHexagram = (newHexagramNumber) => {
    const newHexagram = hexagramStates.find(
      (hexagram) => hexagram.number === newHexagramNumber
    );
    // get the corresponding trigrams
    const newUpperTrigram = trigramStates.find(
      (trigram) => trigram.name === newHexagram.trigrams[0]
    );
    const newLowerTrigram = trigramStates.find(
      (trigram) => trigram.name === newHexagram.trigrams[1]
    );
    // get the corresponding lines
    const newLines = {
      line6: { value: newUpperTrigram.trigramLines[0], changing: false },
      line5: { value: newUpperTrigram.trigramLines[1], changing: false },
      line4: { value: newUpperTrigram.trigramLines[2], changing: false },
      line3: { value: newLowerTrigram.trigramLines[0], changing: false },
      line2: { value: newLowerTrigram.trigramLines[1], changing: false },
      line1: { value: newLowerTrigram.trigramLines[2], changing: false },
    };
    // set all the new line values
    setLines(newLines);
  };

  return forceChangeHexagram;
}
