import { createContext } from "react";

import { useState } from "react";

// export const ReelContext = createContext();
// export const FeedReelContext = createContext();
export const CreateReelContext = createContext();
export const ReelFeedContext = createContext();

// export const ReelProvider = ({ children }) => {
//   const [reel, setReel] = useState(null);
//   const [loading, setLoading] = useState(null);
//   return (
//     <ReelContext.Provider value={{ reel, setReel, loading, setLoading }}>
//       {children}
//     </ReelContext.Provider>
//   );
// };


export const CreateReelProvider = ({ children }) => {
  const [createReelData, setCreateReelData] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <CreateReelContext.Provider
      value={{
        createReelData,
        setCreateReelData,
        loading,
        setLoading,
      }}
    >
      {children}
    </CreateReelContext.Provider>
  );
};

export const ReelFeedProvider = ({ children }) => {
  const [reelFeed, setReelFeed] = useState([]);
  const [loading, setLoading] = useState(null);

  return (
    <ReelFeedContext.Provider value={{ reelFeed, setReelFeed, loading, setLoading }}>
      {children}
    </ReelFeedContext.Provider>
  );
};