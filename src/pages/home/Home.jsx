import React from "react";
import Hexagram from "../../components/Hexagram/Hexagram";
import DebugMenu from "../../components/DebugMenu/DebugMenu";
import HexReading from "../../components/HexReading/HexReading";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useAppHooks } from "../../hooks/useAppHooks";
import ModeSelect from "../../components/ModeSelect/ModeSelect";
import JournalBtn from "../../components/JournalBtn/JournalBtn";
import JournalModal from "../../components/Journal/Journal";
import { useLocation } from "react-router-dom";
import OptionsMenu from "../../components/OptionsMenu/OptionsMenu";
import { useEffect } from "react";

const Home = () => {
  const location = useLocation();
  const {
    forceChangeHexagram,
    setDesiredHexagram,
    changingLinesExist,
    primaryHexText,
    transformedHexText,
    readingMode,
    setReadingMode,
    hexagram,
  } = useContext(GlobalContext);

  const { readingToShow, handleSearch } = useAppHooks({
    forceChangeHexagram,
    setDesiredHexagram,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams) {
      handleSearch(searchParams);
    }
  }, []);

  const showTransformClass =
    hexagram.number && changingLinesExist ? "show-transform" : "";

  const show =
    (primaryHexText && readingToShow === "primary") ||
    (transformedHexText && readingToShow === "transformed");
  return (
    <>
      <JournalModal />
      <JournalBtn />
      <div id="home" className="page">
        <div className={`i-ching-container ${showTransformClass}`}>
          <Hexagram type="primary" />
          <Hexagram type="transformed" />
        </div>
        <ModeSelect mode={readingMode} setMode={setReadingMode} />
        <OptionsMenu />
        {/* <DebugMenu
          newHexagramNumber={newHexagramNumber}
          setNewHexagramNumber={setNewHexagramNumber}
          desiredHexagramNumber={desiredHexagramNumber}
          setDesiredHexagramNumber={setDesiredHexagramNumber}
          handleSearch={handleSearch}
          changeHexRef={changeHexRef}
          desiredHexRef={desiredHexRef}
        /> */}

        <HexReading
          primaryHexText={primaryHexText}
          transformedHexText={transformedHexText}
          show={show}
        />
      </div>
    </>
  );
};

export default Home;
