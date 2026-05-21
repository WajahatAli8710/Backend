import React from "react";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import "./ReelActions.scss";
import Avatar from "../../../../components/Avatar/Avatar";
const ReelActions = ({ likeCount, savedCount, isLiked, isSaved, imageUrl }) => {
  return (
    <div className="actions">
      <div className="actionsBtnn">
        <button>
          <Heart className={isLiked ? "icon-active" : "icon"} size={24} />
          <p>{likeCount}</p>
        </button>

        <button>
          <Bookmark className={isSaved ? "icon-active" : "icon"} size={24} />
          <p>{savedCount}</p>
        </button>
      </div>

      <Avatar
        image={imageUrl}
        borderRadius={".5rem"}
        border={"2px solid gray"}
      />
    </div>
  );
};

export default ReelActions;
