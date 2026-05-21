import { Link } from "react-router-dom";
import Avatar from "../../../../components/Avatar/Avatar";
import "./CommentSection.scss";

const CommentSection = ({ image, username, time, commentText }) => {
  return (
    <div className="comment">
      <Avatar image={image} />

      <div className="content">
        <div className="user-detail">
          <Link>{username}</Link>
          <span>{time}</span>
        </div>
        <p className="commentText">{commentText}</p>
      </div>
    </div>
  );
};

export default CommentSection;
