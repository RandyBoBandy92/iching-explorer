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

function HexReading({ hexText, show, type }) {
  // putting a comment here because two functions side by side makes me autism

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
      tempLineData.translations = hexText[`line_${lineNumber}`];
      tempLineData.data =
        type === "primary"
          ? lines[`line${lineNumber}`]
          : transformedLines[`line${lineNumber}`];
      tempLineData.lineNum = `line${lineNumber}`;
      tempLineData.lineEnergy = getCorrectLineEnergy(
        tempLineData.data.value,
        tempLineData.lineNum,
        lines
      );
      tempLineData.lineCorrelateMatch = getLineCorrelate(
        tempLineData.data,
        tempLineData.lineNum,
        lines
      );
      tempLineText.push(tempLineData);
    }
    return tempLineText;
  }

  useEffect(() => {
    const allDetails = document.querySelectorAll(
      "details h2, details h3, details h4"
    );

    const allNavButtons = document.querySelectorAll(".reading-nav button");
    allNavButtons.forEach((navBtn) => {
      navBtn.addEventListener("click", handleNav);
    });

    function handleNav(e) {
      const primaryDetails = (document.querySelector("details").open = true);
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
      allDetails.forEach((detailElem) => {
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

    const lineHtml = linesDataCombined.map((lineDataCombined) => {
      // pull data from line data combined
      const { lineNum, data, translations, lineEnergy, lineCorrelateMatch } =
        lineDataCombined;

      // determine auspiciousness of reading
      // say that if the energy is good.. that's moderate
      // if correlate is good, that's auspicious
      // if both, very auspicious

      let auspiciousness;
      if (lineEnergy === "correct") {
        auspiciousness = "Moderately Auspicious or Perhaps Bad idk";
      }

      if (lineCorrelateMatch) {
        auspiciousness = "Highly Auspicious";
      }

      if (lineEnergy === "correct" && lineCorrelateMatch) {
        auspiciousness = "Very Highly Auspicious";
      }

      if (lineEnergy !== "correct" && !lineCorrelateMatch) {
        auspiciousness = "Not good lol";
      }

      const lineNumInt = Number(lineNum.slice(-1));

      const showLineCondition =
        (options.onlyChanging && data.changing) || !options.onlyChanging;
      const showLine = showLineCondition ? true : false;

      const translationLineText = [];

      for (const author in translations) {
        if (Object.hasOwnProperty.call(translations, author)) {
          const translationText = translations[author];
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
                      <p>{translationLineText.translationText}</p>
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
    <>
      <details className={`hex-reading ${show ? "show" : "hide"}`}>
        <summary>
          <h2>
            Hexgram {hexText.number} | {hexText.title}
          </h2>
          <button ref={showAllRef} onClick={handleToggleShowAll}>
            Show/Hide All
          </button>
        </summary>
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
    </>
  );
}

HexReading.propTypes = {
  hexText: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(["primary", "transformed"]).isRequired,
};
export default HexReading;
