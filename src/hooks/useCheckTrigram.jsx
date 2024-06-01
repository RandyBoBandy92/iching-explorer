import { useEffect } from "react";
import { trigramStates } from "../utilities/constants";

export function useCheckTrigram(lines, setTrigrams) {
  useEffect(() => {
    const [upperTrigram, lowerTrigram] = checkTrigrams(lines);
    setTrigrams([upperTrigram, lowerTrigram]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines]);

  const checkTrigrams = (linesToCheck) => {
    // grab lines 6,5,4 and 3,2,1
    const { line6, line5, line4, line3, line2, line1 } = linesToCheck;
    // use lines 6,5,4 to find the upper trigram
    // use lines 3,2,1 to find the lower trigram
    // find the trigram names
    let upperTrigram = trigramStates.find(
      (trigram) =>
        trigram.trigramLines[0] === line6.value &&
        trigram.trigramLines[1] === line5.value &&
        trigram.trigramLines[2] === line4.value
    );
    let lowerTrigram = trigramStates.find(
      (trigram) =>
        trigram.trigramLines[0] === line3.value &&
        trigram.trigramLines[1] === line2.value &&
        trigram.trigramLines[2] === line1.value
    );

    if (!upperTrigram) {
      upperTrigram = trigramStates[0];
    }

    if (!lowerTrigram) {
      lowerTrigram = trigramStates[0];
    }

    // set the trigram names
    return [upperTrigram, lowerTrigram];
  };
  return checkTrigrams;
}
