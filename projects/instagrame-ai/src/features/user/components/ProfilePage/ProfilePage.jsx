import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../../auth/context/AuthContext';
import { usePost } from '../../../post/context/PostContext';
import Avatar from '../../../../shared/ui/Avatar/Avatar';
import Button from '../../../../shared/ui/Button/Button';
import {
  SettingsIcon,
  GridIcon,
  ReelsGridIcon,
  SavedGridIcon,
  VerifiedIcon,
} from '../../../../shared/ui/Icons/Icons';
import styles from './ProfilePage.module.scss';

export default function ProfilePage() {
  const { username } = useParams();
  const { getUserByUsername, toggleFollow } = useUser();
  const { currentUser } = useAuth();
  const { posts } = usePost();
  const [activeTab, setActiveTab] = useState('posts');

  const isOwnProfile = username === currentUser?.username;
  const user = isOwnProfile ? currentUser : getUserByUsername(username);

  if (!user) {
    return (
      <div className={styles.notFound}>
        <h2>User not found</h2>
        <p>The user you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className={styles.backLink}>Go back to feed</Link>
      </div>
    );
  }

  const userPosts = posts.filter((p) => p.user.username === username);

  const formatCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 10000) return `${(count / 1000).toFixed(0)}K`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const tabs = [
    { id: 'posts', icon: GridIcon, label: 'POSTS' },
    { id: 'reels', icon: ReelsGridIcon, label: 'REELS' },
    { id: 'saved', icon: SavedGridIcon, label: 'SAVED' },
  ];

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        {/* Mobile header */}
        <div className={styles.mobileHeader}>
          <button className={styles.settingsBtn}>
            <SettingsIcon size={24} />
          </button>
          <h2 className={styles.mobileUsername}>
            {user.username}
            {user.isVerified && <VerifiedIcon size={14} />}
          </h2>
          <div className={styles.mobileActions} />
        </div>

        {/* Profile Header */}
        <header className={styles.header}>
          <div className={styles.avatarSection}>
            <Avatar
              src={user.avatar}
              alt={user.username}
              size={150}
              hasStory={user.stories?.length > 0}
            />
          </div>

          <div className={styles.infoSection}>
            {/* Username row */}
            <div className={styles.usernameRow}>
              <h1 className={styles.username}>
                {user.username}
                {user.isVerified && (
                  <span className={styles.verified}>
                    <VerifiedIcon size={18} />
                  </span>
                )}
              </h1>
              {isOwnProfile ? (
                <div className={styles.ownActions}>
                  <Button variant="secondary" size="small">
                    Edit profile
                  </Button>
                  <Button variant="secondary" size="small">
                    View archive
                  </Button>
                </div>
              ) : (
                <div className={styles.otherActions}>
                  <Button
                    variant={user.isFollowing ? 'secondary' : 'primary'}
                    size="small"
                    onClick={() => toggleFollow(user.id)}
                  >
                    {user.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button variant="secondary" size="small">
                    Message
                  </Button>
                </div>
              )}
            </div>

            {/* Stats (desktop) */}
            <div className={styles.statsDesktop}>
              <div className={styles.stat}>
                <span className={styles.statCount}>{user.postsCount}</span> posts
              </div>
              <div className={styles.stat}>
                <span className={styles.statCount}>{formatCount(user.followersCount)}</span> followers
              </div>
              <div className={styles.stat}>
                <span className={styles.statCount}>{formatCount(user.followingCount)}</span> following
              </div>
            </div>

            {/* Bio */}
            <div className={styles.bio}>
              <span className={styles.fullName}>{user.fullName}</span>
              <p className={styles.bioText}>{user.bio}</p>
              {user.website && (
                <a href={`https://${user.website}`} className={styles.website} target="_blank" rel="noreferrer">
                  {user.website}
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Mobile bio */}
        <div className={styles.mobileBio}>
          <span className={styles.fullName}>{user.fullName}</span>
          <p className={styles.bioText}>{user.bio}</p>
          {user.website && (
            <a href={`https://${user.website}`} className={styles.website} target="_blank" rel="noreferrer">
              {user.website}
            </a>
          )}
        </div>

        {/* Mobile action buttons */}
        <div className={styles.mobileButtons}>
          {isOwnProfile ? (
            <>
              <Button variant="secondary" size="small" fullWidth>
                Edit profile
              </Button>
              <Button variant="secondary" size="small" fullWidth>
                Share profile
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={user.isFollowing ? 'secondary' : 'primary'}
                size="small"
                fullWidth
                onClick={() => toggleFollow(user.id)}
              >
                {user.isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button variant="secondary" size="small" fullWidth>
                Message
              </Button>
            </>
          )}
        </div>

        {/* Stats (mobile) */}
        <div className={styles.statsMobile}>
          <div className={styles.statItem}>
            <span className={styles.statCount}>{user.postsCount}</span>
            <span className={styles.statLabel}>posts</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statCount}>{formatCount(user.followersCount)}</span>
            <span className={styles.statLabel}>followers</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statCount}>{formatCount(user.followingCount)}</span>
            <span className={styles.statLabel}>following</span>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon active={activeTab === tab.id} size={12} />
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className={styles.postsGrid}>
          {activeTab === 'posts' && (
            userPosts.length > 0 ? (
              userPosts.map((post) => (
                <Link key={post.id} to={`/post/${post.id}`} className={styles.gridItem}>
                  <img src={post.images[0]} alt="" className={styles.gridImage} />
                  <div className={styles.gridOverlay}>
                    <span>&#9829; {post.likes}</span>
                    <span>&#128172; {post.comments.length}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className={styles.emptyGrid}>
                <div className={styles.emptyIcon}>
                  <GridIcon size={32} />
                </div>
                <h3>No Posts Yet</h3>
              </div>
            )
          )}
          {activeTab === 'reels' && (
            <div className={styles.emptyGrid}>
              <div className={styles.emptyIcon}>
                <ReelsGridIcon size={32} />
              </div>
              <h3>No Reels Yet</h3>
            </div>
          )}
          {activeTab === 'saved' && isOwnProfile && (
            <div className={styles.emptyGrid}>
              <div className={styles.emptyIcon}>
                <SavedGridIcon size={32} />
              </div>
              <h3>No Saved Posts</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
