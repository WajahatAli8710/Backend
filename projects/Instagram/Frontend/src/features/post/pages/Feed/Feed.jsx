import { Link } from "react-router-dom";

import styles from "./Feed.module.scss";

// function Suggestions() {
//   const { getSuggestedUsers, toggleFollow } = useUser();
//   const { currentUser } = useAuth();
//   const suggested = getSuggestedUsers(5);

//   return (
//     <div className={styles.suggestions}>
//       <div className={styles.suggestionsUser}>
//         <Link to={`/profile/${currentUser?.username}`} className={styles.sugUserInfo}>
//           <Avatar src={currentUser?.avatar} size={44} />
//           <div>
//             <span className={styles.sugUsername}>{currentUser?.username}</span>
//             <span className={styles.sugFullname}>{currentUser?.fullName}</span>
//           </div>
//         </Link>
//         <button className={styles.switchBtn}>Switch</button>
//       </div>

//       <div className={styles.suggestionsHeader}>
//         <span>Suggested for you</span>
//         <button className={styles.seeAllBtn}>See All</button>
//       </div>

//       {suggested.map((user) => (
//         <div key={user.id} className={styles.suggestedItem}>
//           <Link to={`/profile/${user.username}`} className={styles.sugUserInfo}>
//             <Avatar src={user.avatar} size={32} />
//             <div>
//               <span className={styles.sugItemUsername}>
//                 {user.username}
//                 {user.isVerified && <VerifiedIcon size={12} />}
//               </span>
//               <span className={styles.sugItemMeta}>Suggested for you</span>
//             </div>
//           </Link>
//           <button
//             className={styles.followBtn}
//             onClick={() => toggleFollow(user.id)}
//           >
//             Follow
//           </button>
//         </div>
//       ))}

//       <div className={styles.footerLinks}>
//         <p>About &middot; Help &middot; Press &middot; API &middot; Jobs &middot; Privacy &middot; Terms</p>
//         <p>&copy; 2024 INSTAGRAM FROM META</p>
//       </div>
//     </div>
//   );
// }

export default function Feed() {
  return (
    <div className={styles.feedPage}>
      <div className={styles.feedMain}>
        <div className={styles.postsList}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
