import { useContext } from "react";

import { CreateReelContext, ReelFeedContext } from "../reel.context";

import { createReel, feedReelData } from "../services/reel.api";

export const useCreateReel = () => {
  const context = useContext(CreateReelContext);

  const { createReelData, setCreateReelData, loading, setLoading } = context;

  const handleCreateReel = async (caption, video) => {
    setLoading(true);
    const responces = await createReel(caption, video);
    setCreateReelData(responces.data.data);
    setLoading(false);
  };

  return { createReelData, loading, handleCreateReel };
};

export const useReelFeed = () => {
  const context = useContext(ReelFeedContext);
  const { reelFeed, setReelFeed, loading, setLoading } = context;

  const handleReelFeed = async () => {
    setLoading(true);
    const responces = await feedReelData();
    setReelFeed(responces.data.data);
    setLoading(false);
  };

  return { reelFeed, loading, handleReelFeed };
};


