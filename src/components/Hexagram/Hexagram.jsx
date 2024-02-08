import PropTypes from "prop-types";
import Line from "../Line/Line";
import "./Hexagram.css";

function Hexagram({ hexagramData, type }) {
  function renderLines() {
    const lines = [];
    for (let lineNum in hexagramData.lines) {
      const lineData = hexagramData.lines[lineNum];
      lines.push(
        <Line
          lineData={lineData}
          lineNumber={lineNum}
          key={lineNum}
          type={type}
        />
      );
    }
    return lines;
  }
  return (
    <div className={`hexagram ${type}`}>
      {/* Your component content goes here */}
      {renderLines()}
    </div>
  );
}

Hexagram.propTypes = {
  hexagramData: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["primary", "transformed"]).isRequired,
};

export default Hexagram;
