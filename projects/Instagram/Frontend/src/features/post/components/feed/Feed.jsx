import { useEffect } from "react";
import { useFeed } from "../../hooks/usePost";

import PostCard from "../PostCard";

const Feed = () => {
  const { feed, loading, handleFeed } = useFeed();

  useEffect(() => {
    const fetchData = async () => {
      await handleFeed();
    };

    fetchData();
  }, []);

  if (loading || !feed) {
    return <div>loading...</div>;
  }

  return (
    <div className="main">
      {feed.map((post) => {
        return (
          <div key={post._id}>
            <PostCard post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
