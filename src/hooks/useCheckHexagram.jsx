import { useEffect } from "react";
import { hexagramStates } from "../utilities/constants";

export function useCheckHexagram(trigrams, setHexagram) {
  useEffect(() => {
    const newHexagram = checkHexagram(trigrams);
    setHexagram(newHexagram);
  }, [trigrams]);

  function checkHexagram(trigramsToCheck) {
    // find the hexagram number
    let newHexagram = hexagramStates.find(
      (hexagram) =>
        hexagram.trigrams[0] === trigramsToCheck[0].name &&
        hexagram.trigrams[1] === trigramsToCheck[1].name
    );
    if (!newHexagram) {
      newHexagram = hexagramStates[0];
    }
    // set the hexagram number
    return newHexagram;
  }
  return checkHexagram;
}
