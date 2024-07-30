// src/hooks/useHexReadingHelpers.js
import { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import {
  getCorrectLineEnergy,
  getLineCorrelate,
} from "../../utilities/toolbelt";

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
