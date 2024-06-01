export function useGetTransformedLines() {
  function getTransformedLines(primaryLines) {
    const transformedLines = {};
    for (const lineNumber in primaryLines) {
      const line = primaryLines[lineNumber];
      const transformedLine = { ...line };
      if (transformedLine.changing) {
        transformedLine.value =
          transformedLine.value === "yin" ? "yang" : "yin";
        transformedLine.changing = false;
      }
      transformedLines[lineNumber] = transformedLine;
    }
    return transformedLines;
  }
  return getTransformedLines;
}
