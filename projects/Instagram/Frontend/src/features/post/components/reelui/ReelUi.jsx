import { useState } from "react";
import "./ReelUi.scss";
function ReelUi({ handleReelSubmit, loading }) {
  const [caption, setCaption] = useState("");
  const [video, setVideo] = useState([]);

  return (
    <div className="reel-ui">
      <form
        className="form"
        onSubmit={(e) => {
          handleReelSubmit(e, caption, video);
        }}
      >
        <label htmlFor="reel-video-label" className="reel-video-label">
          upload reel video
        </label>

        <input
          hidden
          type="file"
          onChange={(e) => {
            setVideo(e.target.files[0]);
          }}
          id="reel-video-label"
        />

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
        ></textarea>

        <button className="share-btn" type="submit "  disabled={loading}>
          Share Reel
          {loading ? (
            <div className="loader">
              <div className="dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          ) : (
            ""
          )}
        </button>
      </form>

    
    </div>
  );
}

export default ReelUi;
