// src/components/HexReading/HexReading.js
import React, { useContext, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./HexReading.css";
import { GlobalContext } from "../../context/GlobalContext";
import { useAppHooks } from "../../hooks/useAppHooks";
import {
  useRenderCategory,
  useRenderNotes,
  useHandleDetailClick,
  useRenderLines,
} from "../../hooks/useHexReadingHooks";
import { useEffect } from "react";

function HexReading({ primaryHexText, transformedHexText, show }) {
  const {
    lines,
    transformedLines,
    showJournalModal,
    forceChangeHexagram,
    setDesiredHexagram,
  } = useContext(GlobalContext);

  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const hexReadingRef = useRef();

  const renderCategory = useRenderCategory();
  const renderNotes = useRenderNotes();
  const renderLines = useRenderLines(
    hexText,
    lines,
    transformedLines,
    type,
    options
  );
  useHandleDetailClick(hexText);

  // See comments on useHexReadingHooks.js:useHandleDetailClick
  // for my rational behind using vanilla JS in this context for the following 2 functions.
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

  function handleToggleShowAll() {
    const mainDetails = hexReadingRef.current;
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

  const shouldTruncate = viewportSize.width < 900;

  return (
    <>
      {show && hexText && (
        <>
          <div
            className={`reading-container ${show ? "show fade-in" : "hide"} ${
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
                  <button
                    disabled={!isChanging}
                    onClick={() => setReadingToShow("transformed")}
                  >
                    Transformed
                  </button>
                </div>
              </>
            )}
            <details
              ref={hexReadingRef}
              className={`hex-reading ${show ? "show" : "hide"}`}
            >
              <summary>
                <h2>
                  Hexgram {hexText.number} | {hexText.title}
                </h2>
                <button onClick={handleToggleShowAll}>Show/Hide All</button>
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
                <h4>Other Titles:</h4>
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
            <button className="truncate" data-id="Judgement">
              {shouldTruncate ? "Judg." : "Judgement"}
            </button>
          </li>
          <li>
            <button data-id="Image">Image</button>
          </li>
          <li>
            <button className="truncate" data-id="Commentary">
              {shouldTruncate ? "Comm." : "Commentary"}
            </button>
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
