import React, { createContext, useContext, useState } from 'react';

// Create context
const CountryContext = createContext();

// Custom hook to access context values
export const useCountry = () => useContext(CountryContext);

// Context provider component
export const CountryProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState("");

  // Function to update selected country
  const updateSelectedCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <CountryContext.Provider value={{ selectedCountry, updateSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
};
