import React from "react";
import PropTypes from "prop-types";
import "./line.css";
import {
  getCorrectLineEnergy,
  getTransformationSymbol,
} from "../../utilities/toolbelt";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

function Line({ lineData, lineNumber, type }) {
  const { cycleLine } = useContext(GlobalContext);
  const activeLine = lineData.value !== "none";
  const changingClass = lineData.changing ? `old-${lineData.value}` : "";
  const lineEnergy = getCorrectLineEnergy(lineData.value, lineNumber);

  const handleClick = () => {
    if (type === "primary") {
      cycleLine(lineNumber, lineData);
    }
  };

  return (
    <div
      className={`line ${lineNumber} ${lineData.value} ${changingClass} ${lineEnergy}`}
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
};

export default Line;
