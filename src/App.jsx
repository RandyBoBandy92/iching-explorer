import { useState } from "react";
import "./App.css";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import Hexagram from "./components/Hexagram/Hexagram";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const {
    changingLinesExist,
    hexagram,
    forceChangeHexagram,
    random,
    setRandom,
  } = useContext(GlobalContext);
  const [newHexagramNumber, setNewHexagramNumber] = useState(hexagram.number);
  // add a use ref here
  const inputRef = useRef();

  function handleIncrementOrDecrement(increment) {
    // if new value is going to be less than 0, set it to 0
    // if new value is going to be more than 64, set it to 64
    let newHexNum = +newHexagramNumber + increment;
    if (newHexNum < 0) newHexNum = 0;
    if (newHexNum > 64) newHexNum = 64;
    setNewHexagramNumber(newHexNum);
    forceChangeHexagram(newHexNum);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    forceChangeHexagram(+newHexagramNumber);
    // blur the input
    inputRef.current.blur();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // if key down is '/' focus on the input
      if (e.key === "/") {
        inputRef.current.focus();
        // highlight the value inside the input
        // inputRef.current.select();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="i-ching-container">
        <Hexagram type="primary" />
        {/* {changingLinesExist && } */}
        <Hexagram type="transformed" />
        {/* <Hexagram hexagramData={transformedHexagram} type="transformed" /> */}
      </div>
      <div className="debug">
        <hr />
        <h2>debug menu</h2>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="number"
            min={0}
            max={64}
            value={newHexagramNumber}
            onChange={(e) => {
              setNewHexagramNumber(e.target.value);
            }}
          />
          <button type="submit">Change Hexagram</button>
        </form>

        <button onClick={() => handleIncrementOrDecrement(1)}>Increase</button>
        <button onClick={() => handleIncrementOrDecrement(-1)}>
          Decrement
        </button>
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
      </div>
    </>
  );
}

export default App;
