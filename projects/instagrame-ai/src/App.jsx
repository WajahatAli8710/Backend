import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import { PostProvider } from './features/post/context/PostContext';
import { ReelProvider } from './features/reel/context/ReelContext';
import { UserProvider } from './features/user/context/UserContext';
import Layout from './shared/ui/Layout/Layout';
import LoginPage from './features/auth/components/LoginPage/LoginPage';
import RegisterPage from './features/auth/components/RegisterPage/RegisterPage';
import Feed from './features/post/components/Feed/Feed';
import ExplorePage from './features/post/components/ExplorePage/ExplorePage';
import SinglePost from './features/post/components/SinglePost/SinglePost';
import CreatePost from './features/post/components/CreatePost/CreatePost';
import ReelFeed from './features/reel/components/ReelFeed/ReelFeed';
import SingleReel from './features/reel/components/SingleReel/SingleReel';
import CreateReel from './features/reel/components/CreateReel/CreateReel';
import ProfilePage from './features/user/components/ProfilePage/ProfilePage';
import NotificationsPage from './shared/ui/NotificationsPage/NotificationsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <PostProvider>
            <ReelProvider>
              <Routes>
                <Route element={<Layout />}>
                  {/* Feed */}
                  <Route path="/" element={<Feed />} />

                  {/* Explore */}
                  <Route path="/explore" element={<ExplorePage />} />

                  {/* Posts */}
                  <Route path="/post/:postId" element={<SinglePost />} />
                  <Route path="/create" element={<CreatePost />} />

                  {/* Reels */}
                  <Route path="/reels" element={<ReelFeed />} />
                  <Route path="/reels/:reelId" element={<SingleReel />} />
                  <Route path="/create-reel" element={<CreateReel />} />

                  {/* User */}
                  <Route path="/profile/:username" element={<ProfilePage />} />

                  {/* Notifications */}
                  <Route path="/notifications" element={<NotificationsPage />} />
                </Route>

                {/* Auth (no layout) */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </ReelProvider>
          </PostProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
