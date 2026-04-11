import { Link } from 'react-router-dom';
import { usePost } from '../../context/PostContext';
import styles from './ExplorePage.module.scss';

export default function ExplorePage() {
  const { posts } = usePost();

  return (
    <div className={styles.explorePage}>
      <div className={styles.grid}>
        {posts.map((post, index) => {
          const isLarge = index % 5 === 0;
          return (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className={`${styles.gridItem} ${isLarge ? styles.large : ''}`}
            >
              <img src={post.images[0]} alt="" className={styles.gridImage} />
              <div className={styles.gridOverlay}>
                <span className={styles.stat}>&#9829; {post.likes}</span>
                <span className={styles.stat}>&#128172; {post.comments.length}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
