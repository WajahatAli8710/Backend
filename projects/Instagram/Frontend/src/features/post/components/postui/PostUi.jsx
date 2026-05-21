import { useState } from "react";
import "./PostUi.scss";

function PostUi({ handlePostSubmit, loading }) {
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");

  return (
    <div className="post-ui">
      <form
        className="form"
        onSubmit={(e) => {
          handlePostSubmit(e, caption, images);
        }}
      >
        <label htmlFor="post-image-label" className="post-image-label">
          upload post image
        </label>

        <input
          hidden
          type="file"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files);

            setImages(files);
          }}
          id="post-image-label"
        />

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
        ></textarea>

        <button className="share-btn" type="submit"  disabled={loading}>
          Share Post
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

export default PostUi;
