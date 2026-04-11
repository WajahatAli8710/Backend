import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReel } from '../../context/ReelContext';
import { useAuth } from '../../../auth/context/AuthContext';
import Avatar from '../../../../shared/ui/Avatar/Avatar';
import Comments from '../../../post/components/Comments/Comments';
import {
  HeartIcon,
  CommentIcon,
  ShareIcon,
  SaveIcon,
  MoreIcon,
  MusicIcon,
  VerifiedIcon,
  BackIcon,
} from '../../../../shared/ui/Icons/Icons';
import styles from './SingleReel.module.scss';

export default function SingleReel() {
  const { reelId } = useParams();
  const { getReelById, toggleLike, toggleSave, addComment } = useReel();
  const { currentUser } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const reel = getReelById(reelId);

  if (!reel) {
    return (
      <div className={styles.notFound}>
        <h2>Reel not found</h2>
        <Link to="/reels" className={styles.backLink}>Back to Reels</Link>
      </div>
    );
  }

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(reel.id, {
        id: `rc-${Date.now()}`,
        user: currentUser,
        text: commentText.trim(),
        likes: 0,
        timestamp: 'now',
      });
      setCommentText('');
    }
  };

  const formatCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className={styles.singleReel}>
      <div className={styles.reelContainer}>
        {/* Media */}
        <div className={styles.mediaSection}>
          <img src={reel.video} alt={reel.caption} className={styles.media} />
          <div className={styles.overlay} />

          {/* Back button */}
          <Link to="/reels" className={styles.backBtn}>
            <BackIcon size={24} />
          </Link>

          {/* Bottom info on media */}
          <div className={styles.mediaInfo}>
            <div className={styles.userRow}>
              <Link to={`/profile/${reel.user.username}`} className={styles.username}>
                <Avatar src={reel.user.avatar} size={36} />
                <span>
                  {reel.user.username}
                  {reel.user.isVerified && <VerifiedIcon size={12} />}
                </span>
              </Link>
            </div>
            <p className={styles.caption}>{reel.caption}</p>
            <div className={styles.audio}>
              <MusicIcon size={12} />
              <span>{reel.audio}</span>
            </div>
          </div>

          {/* Right actions */}
          <div className={styles.actions}>
            <button
              className={`${styles.actionBtn} ${reel.isLiked ? styles.liked : ''}`}
              onClick={() => toggleLike(reel.id)}
            >
              <HeartIcon active={reel.isLiked} size={28} />
              <span>{formatCount(reel.likes)}</span>
            </button>
            <button className={styles.actionBtn} onClick={() => setShowComments(true)}>
              <CommentIcon size={28} />
              <span>{reel.comments.length}</span>
            </button>
            <button className={styles.actionBtn}>
              <ShareIcon size={28} />
            </button>
            <button className={styles.actionBtn} onClick={() => toggleSave(reel.id)}>
              <SaveIcon active={reel.isSaved} size={28} />
            </button>
            <button className={styles.actionBtn}>
              <MoreIcon size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Comments Panel */}
      {showComments && (
        <div className={styles.commentsOverlay} onClick={() => setShowComments(false)}>
          <div className={styles.commentsPanel} onClick={(e) => e.stopPropagation()}>
            <div className={styles.commentsHeader}>
              <h3>Comments</h3>
              <button onClick={() => setShowComments(false)}>&times;</button>
            </div>
            <div className={styles.commentsList}>
              <Comments comments={reel.comments} />
            </div>
            <div className={styles.addComment}>
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                className={styles.commentInput}
              />
              {commentText.trim() && (
                <button className={styles.postBtn} onClick={handleAddComment}>
                  Post
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
