import { useState, useRef } from "react";
import "./Slider.scss";

const Slider = ({ images }) => {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // 📱 swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;

    if (touchStartX.current - touchEndX.current > 50) {
      next(); // swipe left
    }

    if (touchEndX.current - touchStartX.current > 50) {
      prev(); // swipe right
    }
  };

  return (
    <div
      className="slider"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="sliderTrack"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {images.map((img, i) => (
          <img key={i} src={img} className="postImage" />
        ))}
      </div>
      <div className="navgation">
        {images.length > 1 && (
          <>
            <button className="nav prev" onClick={prev}>
              ❮
            </button>
            <button className="nav next" onClick={next}>
              ❯
            </button>

            
          </>
        )}
      </div>
      <div className="dots">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={i === index ? "dot active" : "dot"}
                ></span>
              ))}
            </div>
    </div>
  );
};

export default Slider;
