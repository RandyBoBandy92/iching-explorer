function getYinYang(lineNumber) {
  // 6 or 8 => "yin"
  // 7 or 9 => "yang"

  switch (lineNumber) {
    case 6:
    case 8:
      return "yin";
    case 7:
    case 9:
      return "yang";
    default:
      return "";
  }
}

function getLineType(lineNumber) {
  // 0 => "none"
  // 6 => "old-yin"
  // 7 => "young-yang"
  // 8 => "young-yin"
  // 9 => "old-yang"
  switch (lineNumber) {
    case 6:
      return "old-yin";
    case 7:
      return "young-yang";
    case 8:
      return "young-yin";
    case 9:
      return "old-yang";
    default:
      return "none";
  }
}

function getTransformationSymbol(lineNumber) {
  // 6 => X
  // 9 => O
  switch (lineNumber) {
    case 6:
      return "❌";
    case 9:
      return "⭕";
    default:
      return "";
  }
}

function getCorrectLineEnergy(lineType, lineNumber) {
  // lineNumber 1, 3, 5 are supposed to be old-yang or young-yang
  // lineNumber 2, 4, 6 are supposed to be old-yin or young-yin

  if (lineType === "none") return "";
  let isCorrect = false;

  if (lineNumber % 2 === 0) {
    isCorrect = lineType === "old-yin" || lineType === "young-yin";
  } else {
    isCorrect = lineType === "old-yang" || lineType === "young-yang";
  }
  return isCorrect ? "correct" : "incorrect";
}

export {
  getLineType,
  getYinYang,
  getTransformationSymbol,
  getCorrectLineEnergy,
};
