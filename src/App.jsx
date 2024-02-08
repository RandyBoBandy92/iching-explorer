import { useState } from "react";
import "./App.css";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import Hexagram from "./components/Hexagram/Hexagram";

function App() {
  const { iChingReading } = useContext(GlobalContext);
  const { primaryHexagram, transformedHexagram } = iChingReading;

  console.log(primaryHexagram, transformedHexagram);
  return (
    <div className="i-ching-container">
      <Hexagram hexagramData={primaryHexagram} type="primary" />
      {/* <Hexagram hexagramData={transformedHexagram} type="transformed" /> */}
    </div>
  );
}

export default App;
