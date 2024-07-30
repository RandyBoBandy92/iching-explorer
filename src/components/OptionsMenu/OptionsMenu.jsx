import React from "react";
import { useState } from "react";
import "./optionsmenu.css";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";
import { useAppHooks } from "../../hooks/useAppHooks";
import { useRef } from "react";

function OptionsMenu() {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const {
    hexagram,
    forceChangeHexagram,
    setDesiredHexagram,
    readingMode,
    transformedHexagram,
  } = useContext(GlobalContext);

  const [selectHex, setSelectHex] = useState({
    primary: hexagram.number,
    transform: transformedHexagram.number,
  });

  const changeHexRef = useRef();
  const desiredHexRef = useRef();

  const { setReadingToShow } = useAppHooks({
    forceChangeHexagram,
    setDesiredHexagram,
  });

  function handleReset() {
    setReadingToShow("primary");
    forceChangeHexagram(0);
  }

  useEffect(() => {
    if (readingMode.mode === "reading") {
      setShowOptionsMenu(false);
    }
  }, [readingMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showOptionsMenu) {
        return;
      }
      // if key combo is shift + /, focus on the desired hex input
      if (e.key === "?" && e.shiftKey) {
        desiredHexRef.current.focus();
      }

      // if key down is '/' focus on the input
      if (e.key === "/") {
        changeHexRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
        <p>
          Press <code>/</code> to focus on Primary, <code>Shift + /</code> to
          focus on Transform
        </p>
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
              ref={changeHexRef}
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
              ref={desiredHexRef}
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
