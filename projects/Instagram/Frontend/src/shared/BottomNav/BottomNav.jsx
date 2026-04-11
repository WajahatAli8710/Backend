import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../features/auth/context/AuthContext';
import Avatar from '../Avatar/Avatar';
import {
  HomeIcon,
  ExploreIcon,
  ReelsIcon,
  NewPostIcon,
} from '../Icons/Icons';
import styles from './BottomNav.module.scss';

const navItems = [
  { to: '/', icon: HomeIcon, label: 'Home' },
  { to: '/explore', icon: ExploreIcon, label: 'Explore' },
  { to: '/reels', icon: ReelsIcon, label: 'Reels' },
  { to: '/create', icon: NewPostIcon, label: 'Create' },
];

export default function BottomNav() {
  const { currentUser } = useAuth();

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ''}`
          }
        >
          {({ isActive }) => (
            <span className={styles.icon}>
              <item.icon active={isActive} />
            </span>
          )}
        </NavLink>
      ))}
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
      </NavLink>
    </nav>
  );
}
