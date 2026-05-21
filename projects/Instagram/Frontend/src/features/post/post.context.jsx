import { createContext } from "react";

import { useState } from "react";

export const PostContext = createContext();
export const FeedContext = createContext();
export const CreatePostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(null);
  return (
    <PostContext.Provider value={{ post, setPost, loading, setLoading }}>
      {children}
    </PostContext.Provider>
  );
};

export const FeedProvider = ({ children }) => {
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(null);
  const [like, setLike] = useState(false);
  
  return (
    <FeedContext.Provider value={{ feed, setFeed, loading, setLoading }}>
      {children}
    </FeedContext.Provider>
  );
};

export const CreatePostProvider = ({ children }) => {
  const [createPostData, setCreatePostData] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <CreatePostContext.Provider
      value={{
        createPostData,
        setCreatePostData,
        loading,
        setLoading,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};
