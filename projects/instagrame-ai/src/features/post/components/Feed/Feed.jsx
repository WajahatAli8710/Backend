import { Link } from 'react-router-dom';
import { usePost } from '../../context/PostContext';
import { useUser } from '../../../user/context/UserContext';
import { useAuth } from '../../../auth/context/AuthContext';
import PostCard from '../PostCard/PostCard';
import Avatar from '../../../../shared/ui/Avatar/Avatar';
import { VerifiedIcon } from '../../../../shared/ui/Icons/Icons';
import styles from './Feed.module.scss';

function StoriesBar() {
  const { users } = useUser();
  const { currentUser } = useAuth();
  const storiesUsers = users.filter((u) => u.stories.length > 0);

  return (
    <div className={styles.storiesBar}>
      <div className={styles.storiesScroll}>
        {/* Current user story */}
        <div className={styles.storyItem}>
          <div className={styles.storyAvatarWrapper}>
            <Avatar src={currentUser?.avatar} size={56} />
            <div className={styles.addStory}>+</div>
          </div>
          <span className={styles.storyUsername}>Your story</span>
        </div>
        {/* Other users stories */}
        {storiesUsers.map((user) => (
          <div key={user.id} className={styles.storyItem}>
            <Avatar
              src={user.avatar}
              alt={user.username}
              size={56}
              hasStory
              storySeeen={user.stories[0]?.seen}
            />
            <span className={styles.storyUsername}>{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Suggestions() {
  const { getSuggestedUsers, toggleFollow } = useUser();
  const { currentUser } = useAuth();
  const suggested = getSuggestedUsers(5);

  return (
    <div className={styles.suggestions}>
      <div className={styles.suggestionsUser}>
        <Link to={`/profile/${currentUser?.username}`} className={styles.sugUserInfo}>
          <Avatar src={currentUser?.avatar} size={44} />
          <div>
            <span className={styles.sugUsername}>{currentUser?.username}</span>
            <span className={styles.sugFullname}>{currentUser?.fullName}</span>
          </div>
        </Link>
        <button className={styles.switchBtn}>Switch</button>
      </div>

      <div className={styles.suggestionsHeader}>
        <span>Suggested for you</span>
        <button className={styles.seeAllBtn}>See All</button>
      </div>

      {suggested.map((user) => (
        <div key={user.id} className={styles.suggestedItem}>
          <Link to={`/profile/${user.username}`} className={styles.sugUserInfo}>
            <Avatar src={user.avatar} size={32} />
            <div>
              <span className={styles.sugItemUsername}>
                {user.username}
                {user.isVerified && <VerifiedIcon size={12} />}
              </span>
              <span className={styles.sugItemMeta}>Suggested for you</span>
            </div>
          </Link>
          <button
            className={styles.followBtn}
            onClick={() => toggleFollow(user.id)}
          >
            Follow
          </button>
        </div>
      ))}

      <div className={styles.footerLinks}>
        <p>About &middot; Help &middot; Press &middot; API &middot; Jobs &middot; Privacy &middot; Terms</p>
        <p>&copy; 2024 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
}

export default function Feed() {
  const { posts } = usePost();

  return (
    <div className={styles.feedPage}>
      <div className={styles.feedMain}>
        <StoriesBar />
        <div className={styles.postsList}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <aside className={styles.feedSidebar}>
        <Suggestions />
      </aside>
    </div>
  );
}
