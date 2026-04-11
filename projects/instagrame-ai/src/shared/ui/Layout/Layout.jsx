import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import BottomNav from '../BottomNav/BottomNav';
import styles from './Layout.module.scss';

const noNavRoutes = ['/login', '/register'];

export default function Layout() {
  const location = useLocation();
  const hideNav = noNavRoutes.includes(location.pathname);

  if (hideNav) {
    return <Outlet />;
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
