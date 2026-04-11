import { useUser } from '../../../features/user/context/UserContext';
import Avatar from '../Avatar/Avatar';
import { HeartIcon } from '../Icons/Icons';
import styles from './NotificationsPage.module.scss';

const dummyNotifications = [
  { id: 1, type: 'like', userIndex: 0, text: 'liked your photo.', time: '2h' },
  { id: 2, type: 'follow', userIndex: 1, text: 'started following you.', time: '5h' },
  { id: 3, type: 'like', userIndex: 2, text: 'liked your photo.', time: '8h' },
  { id: 4, type: 'comment', userIndex: 3, text: 'commented: "Amazing! 🔥"', time: '1d' },
  { id: 5, type: 'follow', userIndex: 4, text: 'started following you.', time: '2d' },
  { id: 6, type: 'like', userIndex: 5, text: 'liked your reel.', time: '3d' },
];

export default function NotificationsPage() {
  const { users } = useUser();

  return (
    <div className={styles.notificationsPage}>
      <div className={styles.container}>
        <h2 className={styles.title}>Notifications</h2>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>This Week</h3>
          {dummyNotifications.map((notif) => {
            const user = users[notif.userIndex];
            return (
              <div key={notif.id} className={styles.notifItem}>
                <Avatar src={user.avatar} size={44} />
                <div className={styles.notifBody}>
                  <p>
                    <span className={styles.notifUser}>{user.username}</span>{' '}
                    {notif.text}{' '}
                    <span className={styles.notifTime}>{notif.time}</span>
                  </p>
                </div>
                {notif.type === 'follow' ? (
                  <button className={styles.followBtn}>Follow</button>
                ) : (
                  <div className={styles.notifThumb}>
                    <HeartIcon active size={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
