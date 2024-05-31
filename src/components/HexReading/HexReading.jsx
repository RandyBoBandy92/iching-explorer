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
function HexReading({ hexText, show, type }) {
  // putting a comment here because two functions side by side makes me autism

  const { lines, transformedLines } = useContext(GlobalContext);

  const [lineText, setLineText] = useState([]);

  useEffect(() => {
    const tempLineText = [];
    for (let lineNumber = 1; lineNumber < 7; lineNumber++) {
      const tempLineData = hexText[`line_${lineNumber}`];
      tempLineData.data =
        type === "primary"
          ? lines[`line${lineNumber}`]
          : transformedLines[`line${lineNumber}`];
      tempLineData.lineNum = `line${lineNumber}`;
      tempLineData.lineEnergy = getCorrectLineEnergy(
        tempLineData.data.value,
        tempLineData.lineNum,
        type === "primary" ? lines : transformedLines
      );
      tempLineData.lineCorrelateMatch = getLineCorrelate(
        tempLineData.data,
        tempLineData.lineNum,
        type === "primary" ? lines : transformedLines
      );
      tempLineText.push(tempLineData);
    }
    setLineText(tempLineText);
  }, []);

  console.log(lineText);

  useEffect(() => {
    const allDetails = document.querySelectorAll("details");
    function handleDetailClick(event) {
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
        <details className={`sub-reading ${heading}`}>
          <summary>
            <h3>{heading}</h3>
          </summary>
          <div className="translations">
            {text.map((textObj) => (
              <details
                className="translation-option"
                key={`${type}-${textObj.author}`}
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
        <div className="other-notes">
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

  return (
    <details className={`hex-reading ${show ? "show" : "hide"}`}>
      <summary>
        <h2>
          Hexgram {hexText.number} | {hexText.title}
        </h2>
      </summary>
      <div className="other-titles">
        <p>{hexText.other_titles}</p>
      </div>
      <div className="reading-content">
        {renderCategory("Judgement", hexText.Judgment)}
        {renderCategory("Image", hexText.Image)}
        {renderNotes(hexText.Notes)}
      </div>
    </details>
  );
}

HexReading.propTypes = {
  hexText: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(["primary", "transformed"]).isRequired,
};
export default HexReading;
