import React from "react";
import PropTypes from "prop-types";
import "./line.css";
import {
  getCorrectLineEnergy,
  getLineNumber,
  getLineType,
  getTransformationSymbol,
  getYinYang,
} from "../../utilities/toolbelt";

function Line({ lineData, index, type }) {
  const lineType = getLineType(lineData);
  const lineValue = getYinYang(lineData);
  const transformationSymbol = getTransformationSymbol(lineData);
  const lineNumber = getLineNumber(index);
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
  index: PropTypes.number.isRequired,
};

export default Line;
