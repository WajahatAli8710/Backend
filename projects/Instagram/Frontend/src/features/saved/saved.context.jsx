import { createContext } from "react";

import { useState } from "react";

export const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [saved, setSaved] = useState(false);
  return (
    <SavedContext.Provider value={{ saved, setSaved }}>
      {children}
    </SavedContext.Provider>
  );
};
