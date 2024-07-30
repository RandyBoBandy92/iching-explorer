import React from "react";
import PropTypes from "prop-types";
import Line from "../Line/Line";
import "./Hexagram.css";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useMemo } from "react";

function Hexagram({ type }) {
  const { lines, transformedLines, hexagram, transformedHexagram } =
    useContext(GlobalContext);

  const linesToRender = type === "primary" ? lines : transformedLines;

  const lineComponents = useMemo(() => {
    return Object.keys(linesToRender).map((lineNum) => {
      const lineData = linesToRender[lineNum];
      const key = `${lineNum}-${type}`;
      return (
        <Line
          lineData={lineData}
          lineNumber={lineNum}
          lines={linesToRender}
          key={key}
          type={type}
        />
      );
    });
  }, [linesToRender, type]);

  return (
    <>
      <div className={`hexagram ${type}`}>
        <h2>
          {type === "primary" ? hexagram.number : transformedHexagram.number}
        </h2>
        {lineComponents}
      </div>
    </>
  );
}

Hexagram.propTypes = {
  type: PropTypes.oneOf(["primary", "transformed"]).isRequired,
};

export default Hexagram;
