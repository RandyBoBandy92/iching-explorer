import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const initialState = {
  primaryHexagram: {
    hexagram: 0,
    trigrams: ["", ""],
    lines: [6, 7, 8, 9, 0, 0],
  },
  transformedHexagram: {
    hexagram: 0,
    trigrams: ["", ""],
    lines: [0, 0, 0, 0, 0, 0],
  },
};

// Create a new context
const GlobalContext = createContext();

// Create a provider component
const GlobalProvider = ({ children }) => {
  const [iChingReading, setIChingReading] = useState(initialState);

  // Provide the context value to the consumer components
  return (
    <GlobalContext.Provider value={{ iChingReading }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Define your propTypes
GlobalProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalProvider };
