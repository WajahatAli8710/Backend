import { SaveIcon } from "lucide-react";
import Avatar from "../../../components/Avatar/Avatar";
import { HeartIcon } from "./feed/Icons/icons";
import "./PostCard.scss";
import { useLike } from "../../Like/hook/useLike";
import { useSaved } from "../../saved/hook/useSaved";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const PostCard = ({ post }) => {
  const { handleLike } = useLike();

  const { handleSaved } = useSaved();

  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [saved, setSaved] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    if (post.isLiked) {
      setLike(post.isLiked);
    }

    if (post.likeCount[0]?.count) {
      setLikeCount(post.likeCount[0]?.count);
    }

    if (post.isSaved) {
      setSaved(post.isSaved);
    }

    if (post.savedCount[0]?.count) {
      setSavedCount(post.savedCount[0]?.count);
    }
  }, [post]);

  return (
    <div className="post">
      <div className="username">
        <Avatar image={post.user.profilePic} borderRadius={"50%"} />
        <h3>{post.user.username}</h3>
        <p>{dayjs(post.createdAt).fromNow()}</p>
      </div>

      <img className="img" src={post.imageUrl} alt="" />

      <div className="actions">
        <div className="btnAction">
          <button
            onClick={async () => {
              const updatedLike = await handleLike(post._id);

              setLike(updatedLike);

              if (updatedLike) {
                setLikeCount((pre) => pre + 1);
              } else {
                if (likeCount > 0) {
                  setLikeCount((pre) => pre - 1);
                }
              }
            }}
            className={like ? "activeLike" : ""}
          >
            <HeartIcon />
          </button>

          <p>{likeCount}</p>
        </div>

        <div className="btnAction">
          <button
            onClick={async () => {
              const updatedSaved = await handleSaved(post._id);

              setSaved(updatedSaved);

              if (updatedSaved) {
                setSavedCount((pre) => pre + 1);
              } else {
                if (savedCount > 0) {
                  setSavedCount((pre) => pre - 1);
                }
              }
            }}
            className={saved ? "activeLike" : ""}
          >
            <SaveIcon />
          </button>

          <p>{savedCount}</p>
        </div>
      </div>

      <p>{post.caption}</p>
    </div>
  );
};

export default PostCard;
