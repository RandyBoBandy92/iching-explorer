import React from "react";
import { useState } from "react";
import "./optionsmenu.css";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";
import { useAppHooks } from "../../hooks/useAppHooks";
import { useRef } from "react";
import { useJournalHooks } from "../../hooks/useJournalHooks";

function OptionsMenu() {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const {
    hexagram,
    forceChangeHexagram,
    setDesiredHexagram,
    readingMode,
    transformedHexagram,
  } = useContext(GlobalContext);

  const { closeJournal, setJournalNotes } = useJournalHooks();

  const [selectHex, setSelectHex] = useState({
    primary: hexagram.number,
    transform: transformedHexagram.number,
  });

  const { setReadingToShow } = useAppHooks({
    forceChangeHexagram,
    setDesiredHexagram,
  });

  function handleReset() {
    setReadingToShow("primary");
    forceChangeHexagram(0);
    setJournalNotes({ title: "", note: "" });
    closeJournal();
  }

  useEffect(() => {
    if (readingMode.mode === "reading") {
      setShowOptionsMenu(false);
    }
  }, [readingMode]);

  // These event listeners are added once on mount
  // so dependency array is left empty despite exhaustive eslint rules

  // use effect, whenever either the transformed or primary hex changes,
  // update the selectHex state to match

  useEffect(() => {
    setSelectHex((prevSelectHex) => {
      const updatedSelectHex = { ...prevSelectHex };
      let changed = false;

      if (hexagram.number !== prevSelectHex.primary) {
        updatedSelectHex.primary = hexagram.number;
        changed = true;
      }

      if (transformedHexagram.number !== prevSelectHex.transform) {
        updatedSelectHex.transform = transformedHexagram.number;
        changed = true;
      }

      return changed ? updatedSelectHex : prevSelectHex;
    });
  }, [hexagram.number, transformedHexagram.number]);

  function handleUpdateSelectHex(event, type) {
    const newHexNumber = event.target.value;
    // if number is not between 1 and 64, prevent updating
    if (newHexNumber < 0 || newHexNumber > 64) {
      return;
    }
    if (type === "primary") {
      setSelectHex({ ...selectHex, primary: newHexNumber });
    } else if (type === "transform") {
      setSelectHex({ ...selectHex, transform: newHexNumber });
    }
  }

  const updateGearUnicode = "\u26EE";

  return (
    <div className="options-menu">
      <button
        disabled={readingMode.mode === "reading"}
        onClick={() => setShowOptionsMenu(!showOptionsMenu)}
        className="options-btn"
      >
        Options
      </button>
      <div
        className={`options-menu-content ${
          showOptionsMenu ? "options-enabled" : "options-closed"
        }`}
      >
        <h2>Options</h2>
        <div className="option-buttons">
          <button onClick={handleReset}>Reset</button>
          <button onClick={() => forceChangeHexagram(hexagram.number + 1)}>
            Hex+
          </button>
          <button onClick={() => forceChangeHexagram(hexagram.number - 1)}>
            Hex-
          </button>
        </div>
        <div className="select-hex">
          <div className="selector select-primary">
            <h2>Primary Hex</h2>
            <button
              onClick={() => forceChangeHexagram(+selectHex.primary)}
              className="update-select"
            >
              {updateGearUnicode}
            </button>
            <input
              type="number"
              min="1"
              max="64"
              onChange={(e) => handleUpdateSelectHex(e, "primary")}
              value={selectHex.primary}
            />
          </div>

          <div className=" selector select-transform">
            <h2>Transform Hex</h2>
            <button
              onClick={() => setDesiredHexagram(+selectHex.transform)}
              className="update-select"
            >
              {updateGearUnicode}
            </button>
            <input
              // disabled when primary hex number is 0
              type="number"
              min="1"
              max="64"
              disabled={selectHex.primary === 0}
              value={selectHex.transform}
              onChange={(e) => handleUpdateSelectHex(e, "transform")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionsMenu;
