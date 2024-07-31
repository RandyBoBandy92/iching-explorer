// src/hooks/useHexReadingHelpers.js
import { useEffect } from "react";
import { getCombinedLineData } from "../utilities/toolbelt";

function useRenderCategory() {
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
            {text.map((textObj) => {
              const subDetailsKey = `${heading}-${textObj.translationText}-${textObj.author}`;
              return (
                <details className={`translation-option`} key={subDetailsKey}>
                  <summary>
                    <h4>{textObj.author}</h4>
                  </summary>
                  <p>{textObj.translationText}</p>
                </details>
              );
            })}
          </div>
        </details>
      </>
    );
  };
}

function useRenderNotes() {
  return function renderNotes(notes) {
    const notesArray = notes.split("\n");
    return (
      <>
        <section id="Notes" className="sub-reading other-notes">
          <details className="sub-reading notes">
            <summary>
              <h3>Notes</h3>
            </summary>
            <div className="notes">
              {notesArray.map((note, index) => {
                const noteKey = `${note}`;
                return <p key={noteKey + index}>{note}</p>;
              })}
            </div>
          </details>
        </section>
      </>
    );
  };
}

// I have a handful of functions (others in HexReading.jsx) that have so many nested details elements
// I ended up using Vanilla JS to simplify the process of opening, closing, and scrolling
// Because changing a line or hexagram rerenders the entire component
// and the event listeners are cleaned up and readded, I do not foresee any negative side effects
// from using Vanilla JS in this way. However I would be open to input on this.

function useHandleDetailClick(hexText) {
  useEffect(() => {
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
      allDetails.forEach((detailElem) => {
        detailElem.removeEventListener("click", handleDetailClick);
        detailElem.removeAttribute("open");
      });
    };
  }, [hexText]);
}

function useRenderLines(hexText, lines, transformedLines, type, options) {
  return function renderLines() {
    const linesDataCombined = getCombinedLineData(
      hexText,
      lines,
      transformedLines,
      type
    );

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
              {translationLineText.map((translationLineText) => {
                const changingLineOptionKey = `${lineNum}-${type}-${translationLineText.author}`;
                return (
                  <details
                    key={changingLineOptionKey}
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
                          (textChunk) => {
                            if (textChunk === "Siu") {
                              return null;
                            }
                            const chunkKey = `${lineNumInt}-${textChunk}`;
                            return (
                              <p key={`${chunkKey}-${textChunk}`}>
                                {textChunk}
                              </p>
                            );
                          }
                        )}
                      </>
                    )}
                  </details>
                );
              })}
            </div>
          </div>
        </details>
      );
    });

    return (
      <div id="Lines" className="sub-reading changing-lines">
        <details key="primary-changing-lines-details">
          <summary>
            <h3>Changing Lines</h3>
          </summary>
          {lineHtml}
        </details>
      </div>
    );
  };
}

export {
  useRenderCategory,
  useRenderNotes,
  useHandleDetailClick,
  useRenderLines,
};
