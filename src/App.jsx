import { useState } from "react";
import "./App.css";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import Hexagram from "./components/Hexagram/Hexagram";

function App() {
  return (
    <div className="i-ching-container">
      <Hexagram type="primary" />
      <Hexagram type="transformed" />
      {/* <Hexagram hexagramData={transformedHexagram} type="transformed" /> */}
    </div>
  );
}

export default App;
