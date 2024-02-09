import { useState } from "react";
import "./App.css";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import Hexagram from "./components/Hexagram/Hexagram";

function App() {
  const { changingLinesExist, hexagram, forceChangeHexagram } =
    useContext(GlobalContext);
  const [newHexagramNumber, setNewHexagramNumber] = useState(0);
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
          value={newHexagramNumber}
          onChange={(e) => {
            setNewHexagramNumber(e.target.value);
          }}
        />
        <button onClick={() => forceChangeHexagram(+newHexagramNumber)}>
          Change Hexagram
        </button>
      </div>
    </>
  );
}

export default App;
