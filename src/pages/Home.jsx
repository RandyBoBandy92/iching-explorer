import React from "react";
import Hexagram from "../components/Hexagram/Hexagram";
import DebugMenu from "../components/DebugMenu/DebugMenu";
import HexReading from "../components/HexReading/HexReading";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useAppHooks } from "../hooks/useAppHooks";

const Home = () => {
  const {
    forceChangeHexagram,
    setDesiredHexagram,
    changingLinesExist,
    primaryHexText,
    transformedHexText,
  } = useContext(GlobalContext);

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
        <Hexagram type="transformed" />
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
};

export default Home;
