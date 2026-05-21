import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../../../components/Avatar/Avatar";
import style from "../../../../styles/button.module.scss";
import "./ReelCard.scss";
import ReelActions from "../ReelActions/ReelActions";
import {
  HeartIcon,
  SaveIcon,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useLike } from "../../../Like/hook/useLike";
import { useSaved } from "../../../saved/hook/useSaved";

const ReelCard = ({ reel, globalMuted, setGlobalMuted }) => {
  const videoRef = useRef(null);
  const { handleLike } = useLike();

  const { handleSaved } = useSaved();
  const [isPlaying, setIsPlaying] = useState(false);

  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [saved, setSaved] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = globalMuted;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [globalMuted]);

  useEffect(() => {
    if (reel.isLiked) {
      setLike(reel.isLiked);
    }

    if (reel.likeCount[0]?.count) {
      setLikeCount(reel.likeCount[0]?.count);
    }

    if (reel.isSaved) {
      setSaved(reel.isSaved);
    }

    if (reel.savedCount[0]?.count) {
      setSavedCount(reel.savedCount[0]?.count);
    }
  }, [reel]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSoundToggle = () => {
    setGlobalMuted(!globalMuted);
  };

  return (
    <div className="reel-card">
      <video
        ref={videoRef}
        className="video"
        src={reel.videoUrl}
        loop
        playsInline
      />

      {/* controls */}
      <div className="controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <button onClick={handleSoundToggle}>
          {globalMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      <div className="info">
        <div className="user-info">
          <Avatar image={reel.user.profilePic} borderRadius={"50%"} />
          <p>{reel.user.username}</p>
          <button className={style.button}>Follow</button>
        </div>

        <p className="caption">{reel.caption}</p>
      </div>

      <div className="actions">
        <div className="btnAction">
          <button
            onClick={async () => {
              const updatedLike = await handleLike(reel._id);

              setLike(updatedLike);

              if (updatedLike) {
                setLikeCount((pre) => pre + 1);
              } else {
                if (likeCount > 0) {
                  setLikeCount((pre) => pre - 1);
                }
              }
            }}
          >
            <HeartIcon />
          </button>

          <p>{likeCount}</p>
        </div>

        <div className="btnAction">
          <button
            onClick={async () => {
              const updatedSaved = await handleSaved(reel._id);

              setSaved(updatedSaved);

              if (updatedSaved) {
                setSavedCount((pre) => pre + 1);
              } else {
                if (savedCount > 0) {
                  setSavedCount((pre) => pre - 1);
                }
              }
            }}
          >
            <SaveIcon />
          </button>

          <p>{savedCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ReelCard;
