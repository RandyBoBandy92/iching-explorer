import PropTypes from "prop-types";
import Line from "../Line/Line";
import "./Hexagram.css";

function Hexagram({ hexagramData, type }) {
  return (
    <div className={`hexagram ${type}`}>
      {/* Your component content goes here */}
      {hexagramData.lines.map((line, index) => (
        <Line
          lineData={line}
          key={`${type}=${index}-${line}`}
          index={index}
          type={type}
        />
      ))}
    </div>
  );
}

Hexagram.propTypes = {
  hexagramData: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["primary", "transformed"]).isRequired,
};

export default Hexagram;
