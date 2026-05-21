import { useContext } from "react";

import { FeedContext } from "../post.context";
import { CreatePostContext } from "../post.context";

import { feedData } from "../services/post.api";
import { createPost } from "../services/post.api";

export const useFeed = () => {
  const context = useContext(FeedContext);

  const { feed, setFeed, loading, setLoading } = context;

  const handleFeed = async () => {
    setLoading(true);
    const responces = await feedData();

    setFeed(responces.data.data);

    setLoading(false);
  };

  return { feed, loading, handleFeed };
};

export const useCreatePost = () => {
  const context = useContext(CreatePostContext);

  const { createPostData, setCreatePostData, loading, setLoading } = context;

  const handleCreatePost = async (caption, images) => {
    setLoading(true);
    const responces = await createPost(caption, images);
    setCreatePostData(responces.data.data);
    setLoading(false);
  };

  return { createPostData, loading, handleCreatePost };
};
