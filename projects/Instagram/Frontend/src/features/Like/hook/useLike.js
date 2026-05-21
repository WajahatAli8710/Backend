import { PostLike } from "../services/like.api";

import { LikeContext } from "../like.context";
import { useContext } from "react";

export const useLike = () => {
  const context = useContext(LikeContext);

  const { like, setLike } = context;

  const handleLike = async (entityID) => {
    const responces = await PostLike(entityID);
     if (responces.status === 201) {
    setLike(true);
    return true;
  } else {
    setLike(false);
    return false;
  }

  };

  return {
    handleLike, like 
  };
};



