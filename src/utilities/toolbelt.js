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

function getLineCorrelate(lineData, lineNumber, lines) {
  // line1 correlates with line4 and vice versa
  // line2 correlates with line5 and vice versa
  // line3 correlates with line6, and vice versa
  const lineNumberInt = parseInt(lineNumber.slice(-1));
  let correlate = "";
  let correlateLineNumber = 0;

  if (lineNumberInt < 4) {
    correlateLineNumber = lineNumberInt + 3;
    correlate = lines[`line${correlateLineNumber}`];
  } else {
    correlateLineNumber = lineNumberInt - 3;
    correlate = lines[`line${correlateLineNumber}`];
  }
  // compare the two lines values
  // line1 must be yang, and line4 must be yin
  // line2 must be yin, and line5 must be yang
  // line3 must be yang, and line6 must be yin
  if (lineData.value === "none" || correlate.value === "none") {
    return false;
  }

  // so we have to account for:
  // 1 and 4
  // 4 and 1
  // 2 and 5
  // 5 and 2
  // 3 and 6
  // 6 and 3

  // 1 and 4
  // 4 and 1
  if (lineNumberInt === 1 && correlateLineNumber === 4) {
    return lineData.value === "yang" && correlate.value === "yin";
  } else if (lineNumberInt === 4 && correlateLineNumber === 1) {
    return lineData.value === "yin" && correlate.value === "yang";
  }

  // 2 and 5
  // 5 and 2
  if (lineNumberInt === 2 && correlateLineNumber === 5) {
    return lineData.value === "yin" && correlate.value === "yang";
  } else if (lineNumberInt === 5 && correlateLineNumber === 2) {
    return lineData.value === "yang" && correlate.value === "yin";
  }

  // 3 and 6
  // 6 and 3
  if (lineNumberInt === 3 && correlateLineNumber === 6) {
    return lineData.value === "yang" && correlate.value === "yin";
  } else if (lineNumberInt === 6 && correlateLineNumber === 3) {
    return lineData.value === "yin" && correlate.value === "yang";
  }

  return "you should not see this message, something went wrong!";
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

export { getTransformationSymbol, getCorrectLineEnergy, getLineCorrelate };
