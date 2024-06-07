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

const Home = () => {
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

  const location = useLocation();
  console.log(location.search);

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

  const showTransformClass =
    hexagram.number && changingLinesExist ? "show-transform" : "";
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
          show={
            (primaryHexText && readingToShow === "primary") ||
            (transformedHexText && readingToShow === "transformed")
          }
          type={readingToShow}
        />
      </div>
    </>
  );
};

export default Home;
