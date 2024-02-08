import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create a new context
const GlobalContext = createContext();

// Create a provider component
const GlobalProvider = ({ children }) => {
  const [data, setData] = useState("");

  // Define any functions or state variables you want to share
  // with the consumer components

  const updateData = (newData) => {
    setData(newData);
  };

  // Provide the context value to the consumer components
  return (
    <GlobalContext.Provider value={{ data, updateData }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Define your propTypes
GlobalProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalProvider };
