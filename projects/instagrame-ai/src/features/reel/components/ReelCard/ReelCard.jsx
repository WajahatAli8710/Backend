import { Link } from 'react-router-dom';
import { useReel } from '../../context/ReelContext';
import Avatar from '../../../../shared/ui/Avatar/Avatar';
import {
  HeartIcon,
  CommentIcon,
  ShareIcon,
  SaveIcon,
  MoreIcon,
  MusicIcon,
  VerifiedIcon,
} from '../../../../shared/ui/Icons/Icons';
import styles from './ReelCard.module.scss';

export default function ReelCard({ reel, isActive = false }) {
  const { toggleLike, toggleSave } = useReel();

  const formatCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className={styles.reelCard}>
      {/* Video/Image display */}
      <div className={styles.mediaContainer}>
        <img
          src={reel.video}
          alt={reel.caption}
          className={styles.media}
        />
        <div className={styles.overlay} />
      </div>

      {/* Right side actions */}
      <div className={styles.actions}>
        <button
          className={`${styles.actionBtn} ${reel.isLiked ? styles.liked : ''}`}
          onClick={() => toggleLike(reel.id)}
        >
          <HeartIcon active={reel.isLiked} size={28} />
          <span className={styles.actionCount}>{formatCount(reel.likes)}</span>
        </button>

        <Link to={`/reels/${reel.id}`} className={styles.actionBtn}>
          <CommentIcon size={28} />
          <span className={styles.actionCount}>{reel.comments.length}</span>
        </Link>

        <button className={styles.actionBtn}>
          <ShareIcon size={28} />
        </button>

        <button
          className={styles.actionBtn}
          onClick={() => toggleSave(reel.id)}
        >
          <SaveIcon active={reel.isSaved} size={28} />
        </button>

        <button className={styles.actionBtn}>
          <MoreIcon size={28} />
        </button>

        <Link to={`/profile/${reel.user.username}`} className={styles.actionAvatar}>
          <Avatar src={reel.user.avatar} size={32} />
        </Link>
      </div>

      {/* Bottom info */}
      <div className={styles.info}>
        <div className={styles.userRow}>
          <Link to={`/profile/${reel.user.username}`} className={styles.username}>
            <Avatar src={reel.user.avatar} size={32} />
            <span>
              {reel.user.username}
              {reel.user.isVerified && <VerifiedIcon size={12} />}
            </span>
          </Link>
          <button className={styles.followBtn}>Follow</button>
        </div>

        <p className={styles.caption}>{reel.caption}</p>

        <div className={styles.audio}>
          <MusicIcon size={12} />
          <span className={styles.audioText}>{reel.audio}</span>
        </div>
      </div>
    </div>
  );
}
