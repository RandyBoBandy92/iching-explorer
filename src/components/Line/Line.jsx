import React from "react";
import PropTypes from "prop-types";
import "./line.css";
import {
  getCorrectLineEnergy,
  getTransformationSymbol,
  getLineCorrelate,
} from "../../utilities/toolbelt";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

function Line({ lineData, lineNumber, type, lines }) {
  const { cycleLine, random, randomLine } = useContext(GlobalContext);
  const activeLine = lineData.value !== "none";
  const changingClass = lineData.changing ? `old-${lineData.value}` : "";
  const lineEnergy = getCorrectLineEnergy(lineData.value, lineNumber);
  const lineCorrelateMatch = getLineCorrelate(lineData, lineNumber, lines);

  const handleClick = () => {
    if (type === "primary") {
      random
        ? randomLine(lineNumber, lineData)
        : cycleLine(lineNumber, lineData);
    }
  };

  return (
    <div
      className={`line ${lineNumber} ${
        lineData.value
      } ${changingClass} ${lineEnergy} ${
        lineCorrelateMatch ? "correlate" : "uncorrelated"
      }`}
      onClick={handleClick}
    >
      <div className="line-left"></div>
      <div className="line-middle">
        {activeLine && lineData.changing && (
          <span className="transformationSymbol">
            {getTransformationSymbol(lineData.value)}
          </span>
        )}
      </div>
      <div className="line-right"></div>
    </div>
  );
}

Line.propTypes = {
  lineData: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["primary", "transformed"]).isRequired,
  lineNumber: PropTypes.string.isRequired,
  lines: PropTypes.object.isRequired,
};

export default Line;
