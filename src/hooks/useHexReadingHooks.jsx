// src/hooks/useHexReadingHelpers.js
import { useEffect } from "react";
import { getCorrectLineEnergy, getLineCorrelate } from "../utilities/toolbelt";

export function useCombinedLineData(hexText, lines, transformedLines, type) {
  return function getCombinedLineData() {
    const combinedLinesData = [];
    for (let lineNumber = 1; lineNumber < 7; lineNumber++) {
      const combinedLineData = {};

      combinedLineData.translations = hexText[`line_${lineNumber}`];
      combinedLineData.type = type;

      combinedLineData.data = lines[`line${lineNumber}`];
      combinedLineData.transformedData = transformedLines[`line${lineNumber}`];
      combinedLineData.lineNum = `line${lineNumber}`;

      combinedLineData.lineEnergy = getCorrectLineEnergy(
        combinedLineData.data.value,
        combinedLineData.lineNum,
        lines
      );
      combinedLineData.transformedlineEnergy = transformedLines
        ? getCorrectLineEnergy(
            combinedLineData.transformedData.value,
            combinedLineData.lineNum,
            transformedLines
          )
        : undefined;

      combinedLineData.lineCorrelateMatch = getLineCorrelate(
        combinedLineData.data,
        combinedLineData.lineNum,
        transformedLines
      );
      combinedLineData.transformedCorrelateMatch = transformedLines
        ? getLineCorrelate(
            combinedLineData.transformedData,
            combinedLineData.lineNum,
            transformedLines
          )
        : undefined;

      combinedLinesData.push(combinedLineData);
    }

    return combinedLinesData;
  };
}

export function useRenderCategory() {
  return function renderCategory(heading, iChingSubCategory) {
    const text = [];
    for (const author in iChingSubCategory) {
      if (Object.hasOwnProperty.call(iChingSubCategory, author)) {
        const translationText = iChingSubCategory[author];
        text.push({ author, translationText });
      }
    }
    return (
      <>
        <details id={heading} className={`sub-reading ${heading} `}>
          <summary>
            <h3>{heading}</h3>
          </summary>
          <div className="translations">
            {text.map((textObj, index) => (
              <details
                className={`translation-option`}
                key={`${heading}-${textObj.translationText}-${index}-${textObj.author}`}
              >
                <summary>
                  <h4>{textObj.author}</h4>
                </summary>
                <p>{textObj.translationText}</p>
              </details>
            ))}
          </div>
        </details>
      </>
    );
  };
}

export function useRenderNotes() {
  return function renderNotes(notes) {
    const notesArray = notes.split("\n");
    return (
      <>
        <div id="Notes" className="sub-reading other-notes">
          <details className="sub-reading notes">
            <summary>
              <h3>Notes</h3>
            </summary>
            <div className="notes">
              {notesArray.map((note, index) => (
                <p key={`${note}-${index}`}>{note}</p>
              ))}
            </div>
          </details>
        </div>
      </>
    );
  };
}

// I have two functions here that have so many nested details elements
// I ended up using Vanilla JS to simplify the process of opening, closing, and scrolling
// Because changing a hexagram, or changing the reading type rerenders the entire component
// and the event listeners are cleaned up and readded, I do not foresee any negative side effects
// from using Vanilla JS in this way. However I would be open to input on this.

export function useHandleNav() {
  useEffect(() => {
    const allNavButtons = document.querySelectorAll(".reading-nav button");
    allNavButtons.forEach((navBtn) => {
      navBtn.addEventListener("click", handleNav);
    });

    function handleNav(e) {
      document.querySelector("details").open = true;
      const idToScroll = this.dataset.id;
      const scrollToElem = document.getElementById(idToScroll);
      let scrollDetailsElem;
      if (scrollToElem.localName !== "details") {
        scrollDetailsElem = scrollToElem.querySelector("details");
        scrollDetailsElem.open = true;
      } else {
        scrollToElem.open = true;
      }
      scrollToElem.scrollIntoView();
    }

    return () => {
      allNavButtons.forEach((navBtn) => {
        navBtn.removeEventListener("click", handleNav);
      });
    };
  }, []);
}

export function useHandleDetailClick(hexText) {
  useEffect(() => {
    const allDetailsBtns = document.querySelectorAll(
      "details h2, details h3, details h4"
    );

    const allDetails = document.querySelectorAll("details");

    function handleDetailClick(event) {
      if (["h2", "h3", "h4"].includes(event.target.localName)) {
        event.stopPropagation();
      }
      const isOpen = this.open;
      if (!isOpen) {
        setTimeout(() => {
          this.scrollIntoView();
        }, 10);
      }
    }

    if (hexText) {
      allDetails.forEach((detailElem) => {
        detailElem.addEventListener("click", handleDetailClick);
        detailElem.removeAttribute("open");
      });
    }

    return () => {
      allDetailsBtns.forEach((detailElem) => {
        detailElem.removeEventListener("click", handleDetailClick);
      });
    };
  }, [hexText]);
}

export function useRenderLines(
  hexText,
  lines,
  transformedLines,
  type,
  options
) {
  const getCombinedLineData = useCombinedLineData(
    hexText,
    lines,
    transformedLines,
    type
  );

  return function renderLines() {
    const linesDataCombined = getCombinedLineData();

    const atLeastOneChangingLine = linesDataCombined.some(
      (lineData) => lineData.data.changing
    );

    const lineHtml = linesDataCombined.map((lineDataCombined) => {
      const {
        lineNum,
        data,
        transformedData,
        translations,
        lineEnergy,
        lineCorrelateMatch,
        transformedlineEnergy,
        transformedCorrelateMatch,
        type,
      } = lineDataCombined;

      let auspiciousness;

      const goodPrimaryEnergy = lineEnergy === "correct";
      const badEnergy = lineEnergy === "incorrect";

      const goodPrimaryCorrelation = lineCorrelateMatch;
      const badPrimaryCorrelation = !lineCorrelateMatch;

      const goodTransformedEnergy = transformedlineEnergy === "correct";
      const badTransformedEnergy = transformedlineEnergy === "incorrect";

      const goodTransformedCorrelation = transformedCorrelateMatch;
      const badTransformedCorrelation = !transformedCorrelateMatch;

      const possibilities = {
        primary: {
          best: goodPrimaryEnergy && goodPrimaryCorrelation,
          better: goodPrimaryCorrelation,
          okay: goodPrimaryEnergy && badPrimaryCorrelation,
          bad: badEnergy && badPrimaryCorrelation,
        },
        transformed: {
          best: goodTransformedEnergy && goodTransformedCorrelation,
          better: goodPrimaryCorrelation && goodTransformedCorrelation,
          okay: goodTransformedEnergy && badTransformedCorrelation,
          bad: badTransformedEnergy && badTransformedCorrelation,
        },
      };

      if (type === "primary") {
        if (possibilities.primary.best) {
          auspiciousness = "Very Highly Auspicious";
        } else if (possibilities.primary.better) {
          auspiciousness = "Highly Auspicious";
        } else if (possibilities.primary.okay) {
          auspiciousness = "Moderately Auspicious or Perhaps Bad idk";
        } else if (possibilities.primary.bad) {
          auspiciousness = "Not good lol";
        }
      } else {
        if (possibilities.transformed.best) {
          auspiciousness = "Very Highly Auspicious";
        } else if (possibilities.transformed.better) {
          auspiciousness = "Highly Auspicious";
        } else if (possibilities.transformed.okay) {
          auspiciousness = "Moderately Auspicious or Perhaps Bad idk";
        } else if (possibilities.transformed.bad) {
          auspiciousness = "Not good lol";
        }
      }

      let possibilityMatrix;

      if (type === "primary" && atLeastOneChangingLine) {
        const primaryPossibilities = Object.keys(possibilities.primary);
        const transformedPossibilities = Object.keys(possibilities.transformed);

        const firstHexPossibility = primaryPossibilities.find(
          (key) => possibilities.primary[key]
        );

        const secondHexPossibility = transformedPossibilities.find(
          (key) => possibilities.transformed[key]
        );

        possibilityMatrix = `${firstHexPossibility}-${secondHexPossibility}`;

        const matrixOutcomes = {
          "best-best":
            "Things are in the best possible scenario and staying that way.",
          "best-better":
            "Things are in the best possible scenario and are moving to a lower level which is still better than most.",
          "best-okay":
            "Things are in the best possible scenario and moving to a lower level, which is okay.",
          "best-bad":
            "Things are in the best possible scenario and getting real bad RIP lmao.",
          "better-best":
            "Things are in a state of being better than most and moving to the best possible scenario.",
          "better-better":
            "Things are in a state of being better than most and staying that way.",
          "better-okay":
            "Things are in a state of being better than most and moving to a lower level, which is okay.",
          "better-bad":
            "Things are in a state of being better than most and getting real bad RIP lmao.",
          "okay-best":
            "Things are in a state of being okay and moving to the best possible scenario.",
          "okay-better":
            "Things are in a state of being okay and moving to being better than most.",
          "okay-okay":
            "Things are in a state of being okay and staying that way.",
          "okay-bad":
            "Things are in a state of being okay and getting real bad RIP lmao.",
          "bad-best":
            "Things are in a state of being real bad but are about to become as best as they can be!",
          "bad-better":
            "Things are in a state of being real bad but are about to become better than most!",
          "bad-okay":
            "Things are in a state of being real bad but are about to become okay (meh).",
          "bad-bad": "My brother in Christ, you are down bad LMAO.",
        };

        auspiciousness = matrixOutcomes[possibilityMatrix] || auspiciousness;
      }

      const lineNumInt = Number(lineNum.slice(-1));

      const showLineCondition =
        (options.onlyChanging && (data.changing || transformedData.changing)) ||
        !options.onlyChanging;

      const translationLineText = [];

      for (const author in translations) {
        if (Object.hasOwnProperty.call(translations, author)) {
          let translationText = translations[author];
          if (author === "Notes") {
            translationText = translationText.split(":");
          }
          translationLineText.push({ author, translationText });
        }
      }
      const lineKey = `${lineDataCombined.type}-${lineNumInt}-${lineNum}-${lineDataCombined.data.value}`;
      return (
        <>
          <details
            className={`changing-line ${lineNum} ${
              showLineCondition ? "show" : "hide"
            }`}
            key={lineKey}
          >
            <summary>
              <h4>Line {lineNumInt}</h4>
            </summary>
            <div className="changing-line-contents">
              <div className="outcome">
                <h4>Line Energy: {lineEnergy}</h4>
                <h4>
                  Line Correlate Match{" "}
                  {lineCorrelateMatch ? "Correlated" : "Uncorrelated"}
                </h4>
                <h4>Expected Outcome: {auspiciousness}</h4>
              </div>

              <div className="line-translations">
                {translationLineText.map((translationLineText, index) => (
                  <details
                    key={`${lineNum}-${type}-${translationLineText.author}-${index}`}
                    open
                    className="changing-line-option "
                  >
                    <summary>
                      <h4>{translationLineText.author}</h4>
                    </summary>
                    {!["Notes"].includes(translationLineText.author) ? (
                      <p>{translationLineText.translationText}</p>
                    ) : (
                      <>
                        {translationLineText.translationText.map(
                          (textChunk, index) => {
                            if (textChunk === "Siu") {
                              return null;
                            }
                            return (
                              <p key={`${lineNumInt}-${textChunk}`}>
                                {textChunk}
                              </p>
                            );
                          }
                        )}
                      </>
                    )}
                  </details>
                ))}
              </div>
            </div>
          </details>
        </>
      );
    });
    return (
      <>
        <div id="Lines" className="sub-reading changing-lines">
          <details>
            <summary>
              <h3>Changing Lines</h3>
            </summary>
            {lineHtml}
          </details>
        </div>
      </>
    );
  };
}
