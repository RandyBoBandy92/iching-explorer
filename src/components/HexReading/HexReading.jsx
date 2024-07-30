// src/components/HexReading/HexReading.js
import React from "react";
import PropTypes from "prop-types";
import "./HexReading.css";
import { useContext, useState, useRef } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useAppHooks } from "../../hooks/useAppHooks";
import {
  useCombinedLineData,
  useRenderCategory,
  useRenderNotes,
  useHandleNav,
  useHandleDetailClick,
} from "../../hooks/useHexReadingHooks";

function HexReading({ primaryHexText, transformedHexText, show }) {
  const {
    lines,
    transformedLines,
    showJournalModal,
    forceChangeHexagram,
    setDesiredHexagram,
  } = useContext(GlobalContext);

  const { setReadingToShow, readingToShow } = useAppHooks({
    forceChangeHexagram,
    setDesiredHexagram,
  });

  const type = readingToShow;
  const hexText = type === "primary" ? primaryHexText : transformedHexText;

  const [options, setOptions] = useState({
    onlyChanging: false,
    showHideAll: true,
  });

  const showAllRef = useRef();

  const getCombinedLineData = useCombinedLineData(
    hexText,
    lines,
    transformedLines,
    type
  );
  const renderCategory = useRenderCategory();
  const renderNotes = useRenderNotes();
  useHandleNav();
  useHandleDetailClick(hexText);

  function renderLines() {
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
      const lineKey = `${lineDataCombined.type}-${lineNumInt}-${lineNum}`;
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
                          (textChunk) => (
                            <p key={textChunk}>{textChunk}</p>
                          )
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
  }

  function handleToggleShowAll() {
    const buttonElem = showAllRef.current;
    const mainDetails = buttonElem.parentElement.parentElement;
    const allSubDetails = mainDetails.querySelectorAll("details");
    const shouldShow = options.showHideAll;
    if (!mainDetails.open) {
      mainDetails.open = true;
    }
    allSubDetails.forEach((detail) => {
      if (shouldShow) {
        detail.open = true;
      } else {
        detail.removeAttribute("open");
      }
    });
    setOptions({ ...options, showHideAll: !options.showHideAll });
  }

  const isChanging =
    primaryHexText &&
    transformedHexText &&
    primaryHexText?.number !== transformedHexText?.number;

  return (
    <>
      {show && hexText && (
        <>
          <div
            className={`reading-container ${show ? "show" : "hide"} ${
              showJournalModal ? "modal-showing" : ""
            }`}
          >
            <h1>
              {!isChanging ? (
                `Unchanging Hexagram ${primaryHexText.number}`
              ) : (
                <>
                  {primaryHexText.title}({primaryHexText.number}) ➡ ️
                  {transformedHexText.title}({transformedHexText.number})
                </>
              )}
            </h1>
            {primaryHexText && transformedHexText && (
              <>
                <div className="reading-select">
                  <button onClick={() => setReadingToShow("primary")}>
                    Primary
                  </button>
                  <button onClick={() => setReadingToShow("transformed")}>
                    Transformed
                  </button>
                </div>
              </>
            )}
            <details className={`hex-reading ${show ? "show" : "hide"}`}>
              <summary>
                <h2>
                  Hexgram {hexText.number} | {hexText.title}
                </h2>
                <button ref={showAllRef} onClick={handleToggleShowAll}>
                  Show/Hide All
                </button>
                <div className="options">
                  <label htmlFor="options-lines">Only show changing</label>
                  <input
                    type="checkbox"
                    name="options-lines"
                    id="options-lines"
                    onChange={() => {
                      setOptions({
                        ...options,
                        onlyChanging: !options.onlyChanging,
                      });
                    }}
                    checked={options.onlyChanging}
                  />
                </div>
              </summary>
              <div className="other-titles">
                <p>{hexText.other_titles}</p>
              </div>
              <div className="reading-content">
                {renderCategory("Judgement", hexText.Judgment)}
                {renderCategory("Image", hexText.Image)}
                {renderCategory("Commentary", hexText.Commentary)}
                {renderNotes(hexText.Notes)}
                {renderLines()}
              </div>
            </details>
          </div>
        </>
      )}
      <nav
        className={`reading-nav ${
          show ? "show-reading-nav" : "hide-reading-nav"
        } `}
      >
        <ul>
          <li>
            <button data-id="Judgement">Judgm.</button>
          </li>
          <li>
            <button data-id="Image">Image</button>
          </li>
          <li>
            <button data-id="Commentary">Comm.</button>
          </li>
          <li>
            <button data-id="Notes">Notes</button>
          </li>
          <li>
            <button data-id="Lines">Lines</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

HexReading.propTypes = {
  primaryHexText: PropTypes.object,
  transformedHexText: PropTypes.object,
  show: PropTypes.bool,
};
export default HexReading;
