import { createContext } from "react";

import { useState } from "react";

export const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [like, setLike] = useState(false);
  return (
    <LikeContext.Provider value={{ like, setLike }}>
      {children}
    </LikeContext.Provider>
  );
};
