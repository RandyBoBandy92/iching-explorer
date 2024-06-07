import React from "react";

import "./ToggleSwitch.css";
import { useState } from "react";
const ToggleSwitch = ({ label, option, setOption }) => {
  // Component logic goes here

  const handleToggle = () => {
    setOption(!option);
  };

  return (
    <>
      <div className="toggle-container">
        <label className="toggle">
          <input type="checkbox" checked={option} onChange={handleToggle} />
          <span className="slider"></span>
        </label>
        <span className={`toggle-label `}>{label}</span>
      </div>
    </>
  );
};

export default ToggleSwitch;
