import React from "react";
import PropTypes from "prop-types";
import Line from "../Line/Line";
import "./Hexagram.css";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

function Hexagram({ type }) {
  const { lines, transformedLines, hexagram, transformedHexagram } =
    useContext(GlobalContext);
  function renderLines(linesToRender) {
    const lineComponents = [];
    for (let lineNum in linesToRender) {
      const lineData = linesToRender[lineNum];
      lineComponents.push(
        <Line
          lineData={lineData}
          lineNumber={lineNum}
          lines={linesToRender}
          key={lineNum}
          type={type}
        />
      );
    }
    return lineComponents;
  }

  return (
    <>
      <div className={`hexagram ${type}`}>
        <h2>
          {type === "primary" ? hexagram.number : transformedHexagram.number}
        </h2>
        {/* Your component content goes here */}
        {renderLines(type === "primary" ? lines : transformedLines)}
      </div>
    </>
  );
}

Hexagram.propTypes = {
  type: PropTypes.oneOf(["primary", "transformed"]).isRequired,
};

export default Hexagram;
