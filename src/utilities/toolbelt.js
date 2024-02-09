function getTransformationSymbol(lineDataValue) {
  // 6 => X
  // 9 => O
  switch (lineDataValue) {
    case "yin":
      return "❌";
    case "yang":
      return "⭕";
    default:
      return "";
  }
}

function getCorrectLineEnergy(lineValue, lineNumber) {
  // lineNumber 1, 3, 5 are supposed to be yang
  // lineNumber 2, 4, 6 are supposed to be yin

  // lineNumber is a string like "line1", so first we need to extract the number
  // from the string
  const lineNumberInt = parseInt(lineNumber.slice(-1));

  if (lineValue === "none") return "";
  let isCorrect = false;

  if (lineNumberInt % 2 === 0) {
    isCorrect = lineValue === "yin";
  } else {
    isCorrect = lineValue === "yang";
  }
  return isCorrect ? "correct" : "incorrect";
}

export { getTransformationSymbol, getCorrectLineEnergy };
