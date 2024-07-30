import React from "react";
import PropTypes from "prop-types";
import "./HexReading.css";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useState } from "react";
import {
  getCorrectLineEnergy,
  getLineCorrelate,
} from "../../utilities/toolbelt";
import { useRef } from "react";
import { useAppHooks } from "../../hooks/useAppHooks";

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

  function getCombinedLineData() {
    const tempLineText = [];
    for (let lineNumber = 1; lineNumber < 7; lineNumber++) {
      const tempLineData = {};

      // Associate translation writings
      tempLineData.translations = hexText[`line_${lineNumber}`];

      // add type
      tempLineData.type = type;

      // associate line data
      tempLineData.data = lines[`line${lineNumber}`];
      tempLineData.transformedData = transformedLines[`line${lineNumber}`];
      tempLineData.lineNum = `line${lineNumber}`;

      // Get energy reading
      tempLineData.lineEnergy = getCorrectLineEnergy(
        tempLineData.data.value,
        tempLineData.lineNum,
        lines
      );
      tempLineData.transformedlineEnergy = transformedLines
        ? getCorrectLineEnergy(
            tempLineData.transformedData.value,
            tempLineData.lineNum,
            transformedLines
          )
        : undefined;

      // Get line correlation
      tempLineData.lineCorrelateMatch = getLineCorrelate(
        tempLineData.data,
        tempLineData.lineNum,
        transformedLines
      );
      tempLineData.transformedCorrelateMatch = transformedLines
        ? getLineCorrelate(
            tempLineData.transformedData,
            tempLineData.lineNum,
            transformedLines
          )
        : undefined;

      tempLineText.push(tempLineData);
    }

    return tempLineText;
  }

  useEffect(() => {
    const allDetailsBtns = document.querySelectorAll(
      "details h2, details h3, details h4"
    );

    const allDetails = document.querySelectorAll("details");

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

    function handleDetailClick(event) {
      if (["h2", "h3", "h4"].includes(event.target.localName)) {
        event.stopPropagation();
      }
      const isOpen = this.open;
      if (!isOpen) {
        // opening
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

  function renderCategory(heading, iChingSubCategory) {
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
                key={`${textObj.translationText}-${index}-${textObj.author}`}
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
  }

  function renderNotes(notes) {
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
  }

  function renderLines() {
    const linesDataCombined = getCombinedLineData();

    const atLeastOneChangingLine = linesDataCombined.some(
      (lineData) => lineData.data.changing
    );

    const lineHtml = linesDataCombined.map((lineDataCombined) => {
      // pull data from line data combined
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

      // determine auspiciousness of reading
      // say that if the energy is good.. that's moderate
      // if correlate is good, that's auspicious
      // if both, very auspicious

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
        // transformed
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
      const showLine = showLineCondition ? true : false;

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
            className={`changing-line ${lineNum} ${showLine ? "show" : "hide"}`}
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
    // if (shouldShow) {
    //   mainDetails.open = true;
    // } else {
    //   mainDetails.removeAttribute("open");
    // }
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
