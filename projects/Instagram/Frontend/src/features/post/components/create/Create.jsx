import { useState } from "react";
import "./create.scss";
import  {useCreatePost}  from "../../hooks/usePost";
import  {useCreateReel } from "../../../reel/hooks/useReel";
import { useNavigate } from "react-router-dom";
import PostUi from "../postui/PostUi";
import ReelUi from "../reelui/ReelUi";
const Create = () => {
  const [activeTab, setActiveTab] = useState("post");

  const { handleCreatePost, loading: postLoading } = useCreatePost();
  const { handleCreateReel, loading: ReelLoading } = useCreateReel();
  
  const navigate = useNavigate();

  const handlePostSubmit = async (e, caption, images) => {
    e.preventDefault();

    await handleCreatePost(caption, images);
    navigate("/");
  };

  const handleReelSubmit = async (e, caption, video) => {
    e.preventDefault();

    await handleCreateReel(caption, video);
    navigate("/reels");
  };

  return (
    <div className="create-container">
      <div className="create-box">
        <div className="create-header">
          <h3>Create new {activeTab === "post" ? "post" : "reel"}</h3>
        </div>  

        <div className="tabs">
          <button
            className={activeTab === "post" ? "active" : ""}
            onClick={() => setActiveTab("post")}
          >
            Post
          </button>
          <button
            className={activeTab === "reel" ? "active" : ""}
            onClick={() => setActiveTab("reel")}
          >
            Reel
          </button>
        </div>

        <div className="content">
          {activeTab === "post" ? (
            <PostUi handlePostSubmit={handlePostSubmit} loading={postLoading}  />
          ) : (
            <ReelUi handleReelSubmit={handleReelSubmit} loading={ReelLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;


