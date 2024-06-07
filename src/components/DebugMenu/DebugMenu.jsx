import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useRef } from "react";
import PropTypes from "prop-types";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import ModeSelect from "../ModeSelect/ModeSelect";
import { useState } from "react";

function DebugMenu({
  newHexagramNumber,
  setNewHexagramNumber,
  desiredHexagramNumber,
  setDesiredHexagramNumber,
  handleSearch,
  changeHexRef,
  desiredHexRef,
}) {
  const {
    hexagram,
    forceChangeHexagram,
    flipHexagram,
    random,
    setRandom,
    setDesiredHexagram,
    readingMode,
    setReadingMode,
  } = useContext(GlobalContext);

  function handleReset() {
    forceChangeHexagram(0);
  }

  function specialHyperLink(e) {
    e.preventDefault();

    const href = e.target.href;
    // get the search query
    handleSearch(href);
  }
  function handleHexSubmit(e) {
    e.preventDefault();
    forceChangeHexagram(+newHexagramNumber);
    // blur the input
    changeHexRef.current.blur();
  }
  function handleIncrementOrDecrement(increment) {
    // if new value is going to be less than 0, set it to 0
    // if new value is going to be more than 64, set it to 64
    let newHexNum = +newHexagramNumber + increment;
    if (newHexNum < 0) newHexNum = 0;
    if (newHexNum > 64) newHexNum = 64;
    setNewHexagramNumber(newHexNum);
    forceChangeHexagram(newHexNum);
  }
  function handleDesiredHexSubmit(e) {
    e.preventDefault();
    if (hexagram.number === 0) return;
    setDesiredHexagram(+desiredHexagramNumber);
    // blur the input
    desiredHexRef.current.blur();
  }
  return (
    <>
      {/* Begin DEBUG Menu */}

      <div className="debug">
        <hr />
        <h2>debug menu</h2>

        <ThemeToggle />
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
        <button onClick={() => flipHexagram("primary")}>
          Flip Primary Hexagram
        </button>
        <button onClick={() => flipHexagram("transformed")}>
          Flip Transformed Hexagram
        </button>
        <div className="modifiers ">
          <h3>Modifiers</h3>
          <ToggleSwitch
            label={"Random"}
            option={random}
            setOption={setRandom}
          />
        </div>
        <div className="special-links show">
          <a onClick={specialHyperLink} href="?search=11=>16">
            Peace to Enthusiasm
          </a>
          <hr />
          <a onClick={specialHyperLink} href="?search=3=>63">
            Difficulty to After Completion
          </a>
          <hr />
          <a onClick={specialHyperLink} href="?search=56">
            The Wanderer
          </a>
          <hr />
          <a onClick={specialHyperLink} href="?search=50=>33">
            Cauldron to Retreat
          </a>
          <hr />
          <a onClick={specialHyperLink} href="?search=64=>43">
            unfinished business to resoluteness
          </a>
          <hr />
        </div>
        <div className="months-debug hide">
          <h3>Months</h3>
          <div className="months">
            <a onClick={specialHyperLink} href="?search=19=>11">
              January
            </a>
            <a onClick={specialHyperLink} href="?search=11=>34">
              February
            </a>
            <a onClick={specialHyperLink} href="?search=34=>43">
              March
            </a>
            <a onClick={specialHyperLink} href="?search=43=>1">
              April
            </a>
            <a onClick={specialHyperLink} href="?search=1=>44">
              May
            </a>
            <a onClick={specialHyperLink} href="?search=44=>33">
              June
            </a>
            <a onClick={specialHyperLink} href="?search=33=>12">
              July
            </a>
            <a onClick={specialHyperLink} href="?search=12=>20">
              August
            </a>
            <a onClick={specialHyperLink} href="?search=20=>23">
              September
            </a>
            <a onClick={specialHyperLink} href="?search=23=>2">
              October
            </a>
            <a onClick={specialHyperLink} href="?search=2=>24">
              November
            </a>
            <a onClick={specialHyperLink} href="?search=24=>19">
              December
            </a>
          </div>
        </div>
      </div>
      {/* END DEBUG Menu */}
    </>
  );
}

export default DebugMenu;

DebugMenu.propTypes = {
  newHexagramNumber: PropTypes.number.isRequired,
  setNewHexagramNumber: PropTypes.func.isRequired,
  desiredHexagramNumber: PropTypes.number.isRequired,
  setDesiredHexagramNumber: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  changeHexRef: PropTypes.object.isRequired,
  desiredHexRef: PropTypes.object.isRequired,
};
