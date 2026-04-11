import styles from './Avatar.module.scss';

export default function Avatar({ src, alt = '', size = 32, hasStory = false, storySeeen = false, onClick }) {
  const wrapperClass = [
    styles.avatar,
    hasStory ? (storySeeen ? styles.storySeen : styles.storyActive) : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={wrapperClass}
      style={{ '--avatar-size': `${size}px` }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.avatarInner}>
        <img src={src} alt={alt} className={styles.avatarImg} />
      </div>
    </div>
  );
}
