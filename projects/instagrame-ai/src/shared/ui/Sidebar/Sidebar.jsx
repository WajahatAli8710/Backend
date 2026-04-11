import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../features/auth/context/AuthContext';
import Avatar from '../Avatar/Avatar';
import {
  HomeIcon,
  ExploreIcon,
  ReelsIcon,
  NewPostIcon,
  HeartIcon,
  InstagramTextLogo,
} from '../Icons/Icons';
import styles from './Sidebar.module.scss';

const navItems = [
  { to: '/', icon: HomeIcon, label: 'Home' },
  { to: '/explore', icon: ExploreIcon, label: 'Explore' },
  { to: '/reels', icon: ReelsIcon, label: 'Reels' },
  { to: '/create', icon: NewPostIcon, label: 'Create' },
  { to: '/notifications', icon: HeartIcon, label: 'Notifications' },
];

export default function Sidebar() {
  const { currentUser } = useAuth();

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <NavLink to="/">
          <InstagramTextLogo />
        </NavLink>
      </div>

      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={styles.icon}>
                    <item.icon active={isActive} />
                  </span>
                  <span className={styles.label}>{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink
            to={`/profile/${currentUser?.username || 'john.doe'}`}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.icon}>
              <Avatar
                src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=12'}
                size={24}
              />
            </span>
            <span className={styles.label}>Profile</span>
          </NavLink>
        </li>
      </ul>

      <div className={styles.bottom}>
        <NavLink to="/settings" className={styles.navItem}>
          <span className={styles.icon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="4" x2="21" y2="4" strokeLinecap="round" />
              <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
              <line x1="3" y1="20" x2="21" y2="20" strokeLinecap="round" />
            </svg>
          </span>
          <span className={styles.label}>More</span>
        </NavLink>
      </div>
    </nav>
  );
}
