import { useState, useRef, useEffect } from 'react';
import { useReel } from '../../context/ReelContext';
import ReelCard from '../ReelCard/ReelCard';
import styles from './ReelFeed.module.scss';

export default function ReelFeed() {
  const { reels } = useReel();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    const items = container.querySelectorAll('[data-index]');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [reels]);

  return (
    <div className={styles.reelFeed} ref={containerRef}>
      {reels.map((reel, index) => (
        <div
          key={reel.id}
          className={styles.reelSlide}
          data-index={index}
        >
          <ReelCard reel={reel} isActive={index === activeIndex} />
        </div>
      ))}
    </div>
  );
}
