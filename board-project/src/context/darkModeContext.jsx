import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    updateDarkMode(!isDarkMode);
  };
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const updateDarkMode = (isDarkMode) => {
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
export const useDarkMode = () => useContext(DarkModeContext);
