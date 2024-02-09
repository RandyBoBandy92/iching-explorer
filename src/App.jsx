import { useState } from "react";
import "./App.css";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import Hexagram from "./components/Hexagram/Hexagram";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const {
    hexagram,
    forceChangeHexagram,
    random,
    setRandom,
    findDesiredHexagram,
    changingLinesExist,
  } = useContext(GlobalContext);
  const [newHexagramNumber, setNewHexagramNumber] = useState(hexagram.number);
  const [desiredHexagramNumber, setDesiredHexagramNumber] = useState(0);
  const [loadingReading, setLoadingReading] = useState();

  const changeHexRef = useRef();
  const desiredHexRef = useRef();

  function handleIncrementOrDecrement(increment) {
    // if new value is going to be less than 0, set it to 0
    // if new value is going to be more than 64, set it to 64
    let newHexNum = +newHexagramNumber + increment;
    if (newHexNum < 0) newHexNum = 0;
    if (newHexNum > 64) newHexNum = 64;
    setNewHexagramNumber(newHexNum);
    forceChangeHexagram(newHexNum);
  }

  function handleHexSubmit(e) {
    e.preventDefault();
    forceChangeHexagram(+newHexagramNumber);
    // blur the input
    changeHexRef.current.blur();
  }

  function handleDesiredHexSubmit(e) {
    e.preventDefault();
    if (hexagram.number === 0) return;
    findDesiredHexagram(+desiredHexagramNumber);
    // blur the input
    desiredHexRef.current.blur();
  }

  function handleClickLink(e) {
    e.preventDefault();
    // get the search query
    const searchParams = decodeURIComponent(e.target.href.split("?search=")[1]);
    if (!searchParams) return;
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

  function handleReset() {
    setNewHexagramNumber(0);
    forceChangeHexagram(0);
    setDesiredHexagramNumber(0);
  }

  useEffect(() => {
    if (loadingReading) {
      findDesiredHexagram(loadingReading);
      setDesiredHexagramNumber(loadingReading);
      setLoadingReading();
    }
  }, [loadingReading]);

  useEffect(() => {
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
      <div className="debug">
        <hr />
        <h2>debug menu</h2>
        <form onSubmit={handleHexSubmit}>
          <input
            ref={changeHexRef}
            type="number"
            min={0}
            max={64}
            value={newHexagramNumber}
            onChange={(e) => {
              setNewHexagramNumber(e.target.value);
            }}
          />
          <button type="submit">Change Hex</button>
        </form>

        <button onClick={() => handleIncrementOrDecrement(1)}>Increase</button>
        <button onClick={() => handleIncrementOrDecrement(-1)}>
          Decrement
        </button>
        <button onClick={handleReset}>Reset</button>
        <form onSubmit={handleDesiredHexSubmit}>
          <input
            ref={desiredHexRef}
            type="number"
            disabled={hexagram.number === 0}
            value={desiredHexagramNumber}
            onChange={(e) => setDesiredHexagramNumber(e.target.value)}
          />
          <button disabled={hexagram.number === 0} type="submit">
            Set Desired Hex
          </button>
        </form>
        <div className="modifiers">
          <h3>Modifiers</h3>
          <label htmlFor="random">Random?</label>
          <input
            type="checkbox"
            name="random"
            value={random}
            onChange={() => setRandom(!random)}
          />
        </div>
        <a onClick={handleClickLink} href="?search=11=>16">
          Peace to Enthusiasm
        </a>
        <hr />
        <a onClick={handleClickLink} href="?search=3=>63">
          Difficulty to After Completion
        </a>
        <hr />
        <a onClick={handleClickLink} href="?search=56">
          The Wanderer
        </a>
        <hr />
        <h3>Months</h3>
        <div className="months">
          <a onClick={handleClickLink} href="?search=19=>11">
            January
          </a>
          <a onClick={handleClickLink} href="?search=11=>34">
            February
          </a>
          <a onClick={handleClickLink} href="?search=34=>43">
            March
          </a>
          <a onClick={handleClickLink} href="?search=43=>1">
            April
          </a>
          <a onClick={handleClickLink} href="?search=1=>44">
            May
          </a>
          <a onClick={handleClickLink} href="?search=44=>33">
            June
          </a>
          <a onClick={handleClickLink} href="?search=33=>12">
            July
          </a>
          <a onClick={handleClickLink} href="?search=12=>20">
            August
          </a>
          <a onClick={handleClickLink} href="?search=20=>23">
            September
          </a>
          <a onClick={handleClickLink} href="?search=23=>2">
            October
          </a>
          <a onClick={handleClickLink} href="?search=2=>24">
            November
          </a>
          <a onClick={handleClickLink} href="?search=24=>19">
            December
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
