import { Link } from 'react-router-dom';
import Avatar from '../../../../shared/ui/Avatar/Avatar';
import { HeartIcon } from '../../../../shared/ui/Icons/Icons';
import styles from './Comments.module.scss';

export default function Comments({ comments }) {
  if (!comments || comments.length === 0) return null;

  return (
    <div className={styles.comments}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <Avatar src={comment.user.avatar} alt={comment.user.username} size={28} />
          <div className={styles.commentBody}>
            <p className={styles.commentText}>
              <Link to={`/profile/${comment.user.username}`} className={styles.commentUser}>
                {comment.user.username}
              </Link>{' '}
              {comment.text}
            </p>
            <div className={styles.commentMeta}>
              <span className={styles.commentTime}>{comment.timestamp}</span>
              {comment.likes > 0 && (
                <span className={styles.commentLikes}>
                  {comment.likes} likes
                </span>
              )}
              <button className={styles.replyBtn}>Reply</button>
            </div>
          </div>
          <button className={styles.likeBtn}>
            <HeartIcon size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
