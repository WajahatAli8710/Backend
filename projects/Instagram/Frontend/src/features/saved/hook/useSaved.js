import { PostSaved } from "../services/saved.api";

import { SavedContext } from "../saved.context";
import { useContext } from "react";

export const useSaved = () => {
  const context = useContext(SavedContext);

  const { saved, setSaved } = context;

  const handleSaved = async (entityID) => {
    const responces = await PostSaved(entityID);
     if (responces.status === 201) {
    setSaved(true);
    return true;
  } else {
    setSaved(false);
    return false;
  }

  };

  return {
    handleSaved, saved 
  };
};
