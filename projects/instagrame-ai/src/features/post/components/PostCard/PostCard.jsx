import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePost } from '../../context/PostContext';
import { useAuth } from '../../../auth/context/AuthContext';
import Avatar from '../../../../shared/ui/Avatar/Avatar';
import { VerifiedIcon, HeartIcon, CommentIcon, ShareIcon, SaveIcon, MoreIcon } from '../../../../shared/ui/Icons/Icons';
import Comments from '../Comments/Comments';
import styles from './PostCard.module.scss';

export default function PostCard({ post }) {
  const { toggleLike, toggleSave, addComment } = usePost();
  const { currentUser } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  const handleDoubleTap = () => {
    if (!post.isLiked) {
      toggleLike(post.id);
    }
    setIsLikeAnimating(true);
    setTimeout(() => setIsLikeAnimating(false), 600);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(post.id, {
        id: `c-${Date.now()}`,
        user: currentUser,
        text: commentText.trim(),
        likes: 0,
        timestamp: 'now',
      });
      setCommentText('');
    }
  };

  const formatLikes = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}m`;
    if (count >= 1000) return `${(count / 1000).toFixed(0).replace(/\.0$/, '')}k`;
    return count.toLocaleString();
  };

  return (
    <article className={styles.postCard}>
      {/* Header */}
      <div className={styles.header}>
        <Link to={`/profile/${post.user.username}`} className={styles.userInfo}>
          <Avatar
            src={post.user.avatar}
            alt={post.user.username}
            size={32}
            hasStory={post.user.stories?.length > 0}
          />
          <div className={styles.userMeta}>
            <span className={styles.username}>
              {post.user.username}
              {post.user.isVerified && (
                <span className={styles.verified}>
                  <VerifiedIcon size={12} />
                </span>
              )}
            </span>
            {post.location && (
              <span className={styles.location}>{post.location}</span>
            )}
          </div>
        </Link>
        <button className={styles.moreBtn}>
          <MoreIcon size={24} />
        </button>
      </div>

      {/* Image */}
      <div className={styles.imageWrapper} onDoubleClick={handleDoubleTap}>
        <img
          src={post.images[0]}
          alt={post.caption}
          className={styles.image}
          loading="lazy"
        />
        {isLikeAnimating && (
          <div className={styles.likeAnimation}>
            <HeartIcon active size={80} />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <div className={styles.actionsLeft}>
          <button
            className={`${styles.actionBtn} ${post.isLiked ? styles.liked : ''}`}
            onClick={() => toggleLike(post.id)}
          >
            <HeartIcon active={post.isLiked} size={24} />
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => setShowComments(!showComments)}
          >
            <CommentIcon size={24} />
          </button>
          <button className={styles.actionBtn}>
            <ShareIcon size={24} />
          </button>
        </div>
        <button
          className={styles.actionBtn}
          onClick={() => toggleSave(post.id)}
        >
          <SaveIcon active={post.isSaved} size={24} />
        </button>
      </div>

      {/* Likes */}
      <div className={styles.likes}>
        {formatLikes(post.likes)} likes
      </div>

      {/* Caption */}
      <div className={styles.caption}>
        <Link to={`/profile/${post.user.username}`} className={styles.captionUser}>
          {post.user.username}
        </Link>{' '}
        <span className={styles.captionText}>{post.caption}</span>
      </div>

      {/* View comments link */}
      {post.comments.length > 0 && (
        <button
          className={styles.viewComments}
          onClick={() => setShowComments(!showComments)}
        >
          {showComments
            ? 'Hide comments'
            : `View all ${post.comments.length} comments`}
        </button>
      )}

      {/* Comments */}
      {showComments && <Comments comments={post.comments} />}

      {/* Timestamp */}
      <div className={styles.timestamp}>{post.timestamp}</div>

      {/* Add comment */}
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
    </article>
  );
}
