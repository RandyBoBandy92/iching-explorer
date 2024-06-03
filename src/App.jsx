import { useState } from "react";
import "./App.css";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import Hexagram from "./components/Hexagram/Hexagram";
import { useEffect } from "react";
import { useRef } from "react";
import HexReading from "./components/HexReading/HexReading";
import DebugMenu from "./components/DebugMenu/DebugMenu";
import { useAppHooks } from "./hooks/useAppHooks";

function App() {
  const {
    forceChangeHexagram,
    setDesiredHexagram,
    changingLinesExist,
    primaryHexText,
    transformedHexText,
  } = useContext(GlobalContext);

  // return { changeHexRef, desiredHexRef, handleSearch };
  const {
    handleSearch,
    changeHexRef,
    desiredHexRef,
    newHexagramNumber,
    setNewHexagramNumber,
    desiredHexagramNumber,
    setDesiredHexagramNumber,
    readingToShow,
    setReadingToShow,
  } = useAppHooks({
    forceChangeHexagram,
    setDesiredHexagram,
  });

  const showTransformClass = changingLinesExist ? "show-transform" : "";

  return (
    <>
      <div className={`i-ching-container ${showTransformClass}`}>
        <Hexagram type="primary" />
        {/* {changingLinesExist && } */}
        <Hexagram type="transformed" />
        {/* <Hexagram hexagramData={transformedHexagram} type="transformed" /> */}
      </div>
      <DebugMenu
        newHexagramNumber={newHexagramNumber}
        setNewHexagramNumber={setNewHexagramNumber}
        desiredHexagramNumber={desiredHexagramNumber}
        setDesiredHexagramNumber={setDesiredHexagramNumber}
        handleSearch={handleSearch}
        changeHexRef={changeHexRef}
        desiredHexRef={desiredHexRef}
      />

      {primaryHexText && transformedHexText && (
        <>
          <div className="reading-select">
            <button onClick={() => setReadingToShow("primary")}>Primary</button>
            <button onClick={() => setReadingToShow("transformed")}>
              Transformed
            </button>
          </div>
        </>
      )}
      {(primaryHexText && !transformedHexText) ||
        (primaryHexText && transformedHexText && (
          <HexReading
            primaryHexText={primaryHexText}
            transformedHexText={transformedHexText}
            show={true}
            type={readingToShow}
          />
        ))}
    </>
  );
}

export default App;
