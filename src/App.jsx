import { useState } from "react";
import "./App.css";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import Hexagram from "./components/Hexagram/Hexagram";

function App() {
  const { changingLinesExist, hexagram, forceChangeHexagram } =
    useContext(GlobalContext);
  const [newHexagramNumber, setNewHexagramNumber] = useState(0);

  function handleIncrementOrDecrement(increment) {
    // if new value is going to be less than 0, set it to 0
    // if new value is going to be more than 64, set it to 64
    let newHexNum = +newHexagramNumber + increment;
    if (newHexNum < 0) newHexNum = 0;
    if (newHexNum > 64) newHexNum = 64;
    setNewHexagramNumber(newHexNum);
    forceChangeHexagram(newHexNum);
  }

  return (
    <>
      <div className="i-ching-container">
        <Hexagram type="primary" />
        {/* {changingLinesExist && } */}
        <Hexagram type="transformed" />
        {/* <Hexagram hexagramData={transformedHexagram} type="transformed" /> */}
      </div>
      <div className="debug">
        <h2>debug menu</h2>
        <input
          type="number"
          min={0}
          max={64}
          value={newHexagramNumber}
          onChange={(e) => {
            setNewHexagramNumber(e.target.value);
          }}
        />
        <button onClick={() => forceChangeHexagram(+newHexagramNumber)}>
          Change Hexagram
        </button>

        <button onClick={() => handleIncrementOrDecrement(1)}>Increase</button>
        <button onClick={() => handleIncrementOrDecrement(-1)}>
          Decrement
        </button>
      </div>
    </>
  );
}

export default App;
