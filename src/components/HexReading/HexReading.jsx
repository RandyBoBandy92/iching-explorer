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

function HexReading({ primaryHexText, transformedHexText, show, type }) {
  // putting a comment here because two functions side by side makes me autism

  const hexText = type === "primary" ? primaryHexText : transformedHexText;

  const { lines, transformedLines } = useContext(GlobalContext);

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
        this.scrollIntoView();
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
        <details id={heading} className={`sub-reading ${heading}`}>
          <summary>
            <h3>{heading}</h3>
          </summary>
          <div className="translations">
            {text.map((textObj, index) => (
              <details
                className="translation-option"
                key={`${index} ${textObj.translationText}`}
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
              {notesArray.map((note) => (
                <p key={note}>{note}</p>
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
        }
        if (possibilities.primary.better) {
          auspiciousness = "Highly Auspicious";
        }
        if (possibilities.primary.okay) {
          auspiciousness = "Moderately Auspicious or Perhaps Bad idk";
        }
        if (possibilities.primary.bad) {
          auspiciousness = "Not good lol";
        }
      } else {
        // transformed
        if (possibilities.transformed.best) {
          auspiciousness = "Very Highly Auspicious";
        }
        if (possibilities.transformed.better) {
          auspiciousness = "Highly Auspicious";
        }
        if (possibilities.transformed.okay) {
          auspiciousness = "Moderately Auspicious or Perhaps Bad idk";
        }
        if (possibilities.transformed.bad) {
          auspiciousness = "Not good lol";
        }
      }

      let possibilityMatrix;

      if (type === "primary" && atLeastOneChangingLine) {
        for (const key in possibilities.primary) {
          if (Object.hasOwnProperty.call(possibilities.primary, key)) {
            const outcome = possibilities.primary[key];
            if (outcome) {
              possibilityMatrix = key;
            }
          }
        }
        for (const key in possibilities.transformed) {
          if (Object.hasOwnProperty.call(possibilities.transformed, key)) {
            const outcome = possibilities.transformed[key];
            if (outcome) {
              possibilityMatrix += `-${key}`;
            }
          }
        }
        switch (possibilityMatrix) {
          case "best-best":
            auspiciousness =
              "Things are in best possible scenario, and staying that way.";
            break;
          case "best-better":
            auspiciousness =
              "Things are in best possible scenario, and are moving to a lower level which is still better than most.";
            break;
          case "best-okay":
            auspiciousness =
              "Things are in best possible scenario, and moving to a lower level, which is okay.";
            break;
          case "best-bad":
            auspiciousness =
              "Things are in best possible scenario, and getting real bad RIP lmao.";
            break;
          case "better-best":
            auspiciousness =
              "Things are in a state of being better than most, and moving to best possible scenario.";
            break;
          case "better-better":
            auspiciousness =
              "Things are in a state of being better than most, and staying that way.";
            break;
          case "better-okay":
            auspiciousness =
              "Things are in a state of being better than most, and moving to a lower level, which is okay.";
            break;
          case "better-bad":
            auspiciousness =
              "Things are in a state of being better than most, and getting real bad RIP lmao.";
            break;
          case "okay-best":
            auspiciousness =
              "Things are in a state of being okay, and moving to best possible scenario.";
            break;
          case "okay-better":
            auspiciousness =
              "Things are in a state of being okay, and moving to being better than most.";
            break;
          case "okay-okay":
            auspiciousness =
              "Things are in a state of being okay, and staying that way.";
            break;
          case "okay-bad":
            auspiciousness =
              "Things are in a state of being okay, and getting real bad RIP lmao.";
            break;
          case "bad-best":
            auspiciousness =
              "Things are in a state of being real bad, but are about to become as best as they can be!.";
            break;
          case "bad-better":
            auspiciousness =
              "Things are in a state of being real bad, but are about to become better than most!.";
            break;
          case "bad-okay":
            auspiciousness =
              "Things are in a state of being real bad, but are about to become okay (meh).";
            break;
          case "bad-bad":
            auspiciousness = "My brother in Christ you are down bad LMAO.";
            break;
          default:
            break;
        }
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

      return (
        <>
          <details
            className={`changing-line ${lineNum} ${showLine ? "show" : "hide"}`}
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
                {translationLineText.map((translationLineText) => (
                  <>
                    <details open className="changing-line-option ">
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
                  </>
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

  console.log(hexText);

  return (
    <div className="reading-container">
      <h1>
        {primaryHexText.title}({primaryHexText.number}) =>{" "}
        {transformedHexText.title}({transformedHexText.number})
      </h1>
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
                setOptions({ ...options, onlyChanging: !options.onlyChanging });
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
      <nav className="reading-nav">
        <ul>
          <li>
            <button data-id="Judgement">Judgment</button>
          </li>
          <li>
            <button data-id="Image">Image</button>
          </li>
          <li>
            <button data-id="Commentary">Commentary</button>
          </li>
          <li>
            <button data-id="Notes">Notes</button>
          </li>
          <li>
            <button data-id="Lines">Lines</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

HexReading.propTypes = {
  hexText: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(["primary", "transformed"]).isRequired,
};
export default HexReading;
