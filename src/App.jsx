import { useState } from "react";
import "./App.css";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import Hexagram from "./components/Hexagram/Hexagram";
import { useEffect } from "react";
import { useRef } from "react";
import HexReading from "./components/HexReading/HexReading";
import DebugMenu from "./components/DebugMenu/DebugMenu";

function App() {
  const {
    hexagram,
    forceChangeHexagram,
    setDesiredHexagram,
    changingLinesExist,
    primaryHexText,
    transformedHexText,
  } = useContext(GlobalContext);
  const [newHexagramNumber, setNewHexagramNumber] = useState(hexagram.number);
  const [desiredHexagramNumber, setDesiredHexagramNumber] = useState(0);
  const [loadingReading, setLoadingReading] = useState();
  const [readingToShow, setReadingToShow] = useState("primary");

  const changeHexRef = useRef();
  const desiredHexRef = useRef();

  function handleSearch(href) {
    const searchParams = decodeURIComponent(href.split("?search=")[1]);
    if (!searchParams || searchParams === "undefined") return;
    const type = searchParams.includes("=>") ? "multi" : "single";
    if (type === "single") {
      // if it's a single hexagram
      // change the hexagram
      forceChangeHexagram(+searchParams);
      setNewHexagramNumber(+searchParams);
    } else {
      // if it's a multi hexagram
      // split the search query into start and end
      const [start, end] = searchParams.split("=>");
      setLoadingReading(+end);
      forceChangeHexagram(+start);
      setNewHexagramNumber(+start);
    }
  }

  useEffect(() => {
    if (loadingReading) {
      setDesiredHexagram(loadingReading);
      setDesiredHexagramNumber(loadingReading);
      setLoadingReading();
    }
  }, [loadingReading]);

  useEffect(() => {
    const currentHref = window.location.href;
    const searchParams = decodeURIComponent(currentHref.split("?search=")[1]);
    if (searchParams) {
      handleSearch(currentHref);
    }
    const handleKeyDown = (e) => {
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
