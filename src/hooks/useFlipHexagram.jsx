import { useState } from "react";
import { trigramStates } from "../utilities/constants";
import { useEffect } from "react";
import { useSetDesiredHexagram } from "./useSetDesiredHexagram";

// useGlobalHooks.js
export function useFlipHexagram(
  hexagram,
  transformedHexagram,
  lines,
  setLines
) {
  const [flipping, setFlipping] = useState({
    oldHex: undefined,
    flippingStatus: false,
  });

  const setDesiredHexagram = useSetDesiredHexagram(lines, setLines);

  useEffect(() => {
    if (flipping.flippingStatus) {
      setDesiredHexagram(flipping.oldHex);
      setFlipping({ oldHex: undefined, flippingStatus: false });
    }
  }, [flipping]);

  const flipHexagram = (type = "primary") => {
    const flippingHexagram =
      type === "primary" ? hexagram : transformedHexagram;
    const reversedUpperTrigram = trigramStates.find(
      (trigram) => trigram.name === flippingHexagram.trigrams[0]
    );
    const reversedLowerTrigram = trigramStates.find(
      (trigram) => trigram.name === flippingHexagram.trigrams[1]
    );

    reversedLowerTrigram.trigramLines.reverse();
    reversedUpperTrigram.trigramLines.reverse();

    const newUpperTrigram = trigramStates.find((trigram) => {
      return (
        trigram.trigramLines[0] === reversedLowerTrigram.trigramLines[0] &&
        trigram.trigramLines[1] === reversedLowerTrigram.trigramLines[1] &&
        trigram.trigramLines[2] === reversedLowerTrigram.trigramLines[2]
      );
    });

    const newLowerTrigram = trigramStates.find((trigram) => {
      return (
        trigram.trigramLines[0] === reversedUpperTrigram.trigramLines[0] &&
        trigram.trigramLines[1] === reversedUpperTrigram.trigramLines[1] &&
        trigram.trigramLines[2] === reversedUpperTrigram.trigramLines[2]
      );
    });

    const newLines = {
      line6: { value: newUpperTrigram.trigramLines[0], changing: false },
      line5: { value: newUpperTrigram.trigramLines[1], changing: false },
      line4: { value: newUpperTrigram.trigramLines[2], changing: false },
      line3: { value: newLowerTrigram.trigramLines[0], changing: false },
      line2: { value: newLowerTrigram.trigramLines[1], changing: false },
      line1: { value: newLowerTrigram.trigramLines[2], changing: false },
    };

    setLines(newLines);
    setFlipping({ oldHex: flippingHexagram.number, flippingStatus: true });
  };
  return { flipHexagram, flipping, setFlipping };
}
