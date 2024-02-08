import React from "react";
import PropTypes from "prop-types";
import "./line.css";
import {
  getCorrectLineEnergy,
  getLineType,
  getTransformationSymbol,
  getYinYang,
} from "../../utilities/toolbelt";

function Line({ lineData, lineNumber, type }) {
  const lineType = getLineType(lineData);
  const lineValue = getYinYang(lineData);
  const transformationSymbol = getTransformationSymbol(lineData);
  const lineEnergy = getCorrectLineEnergy(lineType, lineNumber);

  const activeLine = lineType !== "none";

  return (
    <div
      className={`line ${lineValue} ${lineNumber} ${lineType} ${
        activeLine ? lineEnergy : ""
      }`}
    >
      <div className="line-left"></div>
      <div className="line-middle">
        {transformationSymbol && (
          <span className="transformation-symbol">{transformationSymbol}</span>
        )}
      </div>
      <div className="line-right"></div>
    </div>
  );
}

Line.propTypes = {
  lineData: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["primary", "transformed"]).isRequired,
  lineNumber: PropTypes.string.isRequired,
};

export default Line;
