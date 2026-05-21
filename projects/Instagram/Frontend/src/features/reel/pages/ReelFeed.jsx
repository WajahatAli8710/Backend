import { useReelFeed } from "../hooks/useReel";
import "../styles/ReelFeed.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ReelCard from "../components/ReelCard/ReelCard";

dayjs.extend(relativeTime);

import { useState, useEffect } from "react";

const Feed = () => {
  const { reelFeed, loading, handleReelFeed } = useReelFeed();

  const [globalMuted, setGlobalMuted] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await handleReelFeed();
    };
    fetchData();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <div className="main">
      {reelFeed.map((reel) => (
        <ReelCard
          key={reel._id}
          reel={reel}
          globalMuted={globalMuted}
          setGlobalMuted={setGlobalMuted}
        />
      ))}
    </div>
  );
};

export default Feed;

