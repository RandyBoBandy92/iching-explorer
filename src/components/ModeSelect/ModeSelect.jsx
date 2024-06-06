import React, { useState, useEffect, useRef } from "react";
import "./ModeSelect.css";
import PropTypes from "prop-types";

const ModeSelect = ({ mode, setMode }) => {
  const [selectedOption, setSelectedOption] = useState(
    getCurrentModeAndIndex().currentMode
  );
  const [selectedIndex, setSelectedIndex] = useState(
    getCurrentModeAndIndex().currentIndex
  );
  const optionRefs = useRef([]);

  function getCurrentModeAndIndex() {
    const currentMode = mode.modes.find((modeOpt) => modeOpt === mode.mode);
    const currentIndex = mode.modes.indexOf(currentMode);
    return { currentMode, currentIndex };
  }

  const handleSelect = (option, index) => {
    setSelectedOption(option);
    setSelectedIndex(index);
    setMode({ ...mode, mode: option });
  };

  useEffect(() => {
    if (optionRefs.current[selectedIndex]) {
      optionRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  return (
    <div className="mode-select-container">
      <div className="mode-select-options">
        <div
          className="selected-background"
          style={{
            transform: `translateX(${selectedIndex * 100}%)`,
          }}
        />
        {mode.modes.map((option, index) => (
          <div
            key={option}
            className={`mode-select-option ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => handleSelect(option, index)}
            ref={(el) => (optionRefs.current[index] = el)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

ModeSelect.propTypes = {
  mode: PropTypes.object.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default ModeSelect;
