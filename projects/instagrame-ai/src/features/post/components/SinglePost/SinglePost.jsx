import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePost } from '../../context/PostContext';
import { useAuth } from '../../../auth/context/AuthContext';
import Avatar from '../../../../shared/ui/Avatar/Avatar';
import Comments from '../Comments/Comments';
import {
  HeartIcon,
  CommentIcon,
  ShareIcon,
  SaveIcon,
  MoreIcon,
  VerifiedIcon,
} from '../../../../shared/ui/Icons/Icons';
import styles from './SinglePost.module.scss';

export default function SinglePost() {
  const { postId } = useParams();
  const { getPostById, toggleLike, toggleSave, addComment } = usePost();
  const { currentUser } = useAuth();
  const [commentText, setCommentText] = useState('');

  const post = getPostById(postId);

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h2>Post not found</h2>
        <p>The post you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className={styles.backLink}>Go back to feed</Link>
      </div>
    );
  }

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
    if (count >= 1000) return `${(count / 1000).toFixed(0)}k`;
    return count.toLocaleString();
  };

  return (
    <div className={styles.singlePost}>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img src={post.images[0]} alt={post.caption} className={styles.image} />
        </div>

        <div className={styles.detailsSection}>
          {/* Header */}
          <div className={styles.header}>
            <Link to={`/profile/${post.user.username}`} className={styles.userInfo}>
              <Avatar src={post.user.avatar} size={32} />
              <span className={styles.username}>
                {post.user.username}
                {post.user.isVerified && <VerifiedIcon size={12} />}
              </span>
            </Link>
            <button className={styles.moreBtn}>
              <MoreIcon size={24} />
            </button>
          </div>

          {/* Comments area */}
          <div className={styles.commentsArea}>
            {/* Caption as first comment */}
            <div className={styles.captionComment}>
              <Avatar src={post.user.avatar} size={32} />
              <div className={styles.captionBody}>
                <p>
                  <Link to={`/profile/${post.user.username}`} className={styles.captionUser}>
                    {post.user.username}
                  </Link>{' '}
                  {post.caption}
                </p>
                <span className={styles.captionTime}>{post.timestamp}</span>
              </div>
            </div>

            {/* Comments */}
            <Comments comments={post.comments} />
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <div className={styles.actionsRow}>
              <div className={styles.actionsLeft}>
                <button
                  className={`${styles.actionBtn} ${post.isLiked ? styles.liked : ''}`}
                  onClick={() => toggleLike(post.id)}
                >
                  <HeartIcon active={post.isLiked} size={24} />
                </button>
                <button className={styles.actionBtn}>
                  <CommentIcon size={24} />
                </button>
                <button className={styles.actionBtn}>
                  <ShareIcon size={24} />
                </button>
              </div>
              <button className={styles.actionBtn} onClick={() => toggleSave(post.id)}>
                <SaveIcon active={post.isSaved} size={24} />
              </button>
            </div>
            <div className={styles.likes}>{formatLikes(post.likes)} likes</div>
            <div className={styles.timestamp}>{post.timestamp}</div>
          </div>

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
        </div>
      </div>
    </div>
  );
}
