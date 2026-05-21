import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/post/components/feed/Feed";
import Create from "./features/post/components/create/Create";

import ReelFeed from "./features/reel/pages/ReelFeed";
import Home from "./components/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/reels",
        element: <ReelFeed />,
      },
    ],
  },
]);
