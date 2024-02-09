import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const initialLines = {
  line6: 0,
  line5: 0,
  line4: 0,
  line3: 0,
  line2: 0,
  line1: 0,
};

// Create a new context
const GlobalContext = createContext();

// Create a provider component
const GlobalProvider = ({ children }) => {
  const [hexagram, setHexagram] = useState(0);
  const [trigrams, setTrigrams] = useState(["", ""]);
  const [lines, setLines] = useState(initialLines);

  const cycleLine = (lineNumber) => {
    const newLines = { ...lines };
    const currentLine = newLines[lineNumber];
    switch (currentLine) {
      case 0:
        newLines[lineNumber] = 6;
        break;
      case 6:
        newLines[lineNumber] = 7;
        break;
      case 7:
        newLines[lineNumber] = 8;
        break;
      case 8:
        newLines[lineNumber] = 9;
        break;
      case 9:
        newLines[lineNumber] = 0;
        break;
    }
    setLines(newLines);
  };

  // Provide the context value to the consumer components
  return (
    <GlobalContext.Provider value={{ hexagram, trigrams, lines, cycleLine }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Define your propTypes
GlobalProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalProvider };
