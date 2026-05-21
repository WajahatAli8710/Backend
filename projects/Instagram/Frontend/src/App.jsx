import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { PostProvider } from "./features/post/post.context.jsx";
import { FeedProvider } from "./features/post/post.context.jsx";
import { CreatePostProvider } from "./features/post/post.context.jsx";
import {
  CreateReelProvider,
  ReelFeedProvider,
} from "./features/reel/reel.context.jsx";
import { LikeProvider } from "./features/Like/like.context.jsx";
import { SavedProvider } from "./features/saved/saved.context.jsx";

function App() {
  return (
    <>
      <SavedProvider>
        <LikeProvider>
          <ReelFeedProvider>
            <CreateReelProvider>
              <CreatePostProvider>
                <FeedProvider>
                  <PostProvider>
                    <AuthProvider>
                      <RouterProvider router={router} />
                    </AuthProvider>
                  </PostProvider>
                </FeedProvider>
              </CreatePostProvider>
            </CreateReelProvider>
          </ReelFeedProvider>
        </LikeProvider>
      </SavedProvider>
    </>
  );
}

export default App;
