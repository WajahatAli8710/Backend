import { createContext, useContext, useState } from 'react';
import { dummyPosts as initialPosts } from '../../../shared/data/dummyPosts';

const PostContext = createContext(null);

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleSave = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, isSaved: !post.isSaved } : post
      )
    );
  };

  const addComment = (postId, comment) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  const createPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const getPostById = (postId) => {
    return posts.find((post) => post.id === postId);
  };

  const getPostsByUserId = (userId) => {
    return posts.filter((post) => post.user.id === userId);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        toggleLike,
        toggleSave,
        addComment,
        createPost,
        getPostById,
        getPostsByUserId,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
}
