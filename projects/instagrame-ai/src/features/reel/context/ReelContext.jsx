import { createContext, useContext, useState } from 'react';
import { dummyReels as initialReels } from '../../../shared/data/dummyReels';

const ReelContext = createContext(null);

export function ReelProvider({ children }) {
  const [reels, setReels] = useState(initialReels);

  const toggleLike = (reelId) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === reelId
          ? {
              ...reel,
              isLiked: !reel.isLiked,
              likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1,
            }
          : reel
      )
    );
  };

  const toggleSave = (reelId) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === reelId ? { ...reel, isSaved: !reel.isSaved } : reel
      )
    );
  };

  const addComment = (reelId, comment) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === reelId
          ? { ...reel, comments: [...reel.comments, comment] }
          : reel
      )
    );
  };

  const createReel = (newReel) => {
    setReels((prev) => [newReel, ...prev]);
  };

  const getReelById = (reelId) => {
    return reels.find((reel) => reel.id === reelId);
  };

  return (
    <ReelContext.Provider
      value={{
        reels,
        toggleLike,
        toggleSave,
        addComment,
        createReel,
        getReelById,
      }}
    >
      {children}
    </ReelContext.Provider>
  );
}

export function useReel() {
  const context = useContext(ReelContext);
  if (!context) {
    throw new Error('useReel must be used within a ReelProvider');
  }
  return context;
}
