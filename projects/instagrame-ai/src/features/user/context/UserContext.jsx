import { createContext, useContext, useState } from 'react';
import { dummyUsers as initialUsers } from '../../../shared/data/dummyUsers';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [users, setUsers] = useState(initialUsers);

  const toggleFollow = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              isFollowing: !user.isFollowing,
              followersCount: user.isFollowing
                ? user.followersCount - 1
                : user.followersCount + 1,
            }
          : user
      )
    );
  };

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const getUserByUsername = (username) => {
    return users.find((user) => user.username === username);
  };

  const getSuggestedUsers = (limit = 5) => {
    return users.filter((user) => !user.isFollowing).slice(0, limit);
  };

  const getFollowingUsers = () => {
    return users.filter((user) => user.isFollowing);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        toggleFollow,
        getUserById,
        getUserByUsername,
        getSuggestedUsers,
        getFollowingUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
