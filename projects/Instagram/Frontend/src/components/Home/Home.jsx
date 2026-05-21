import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Home.scss";
import { useFeed } from "../../features/post/hooks/usePost";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="navbar">
        <div className="logo">
          <img
            src="https://imgs.search.brave.com/5-pxEa8r1LKJda70MTkxioUNxl7SlbEw4x67-NBqZBU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDUv/OTM0LzI0My9zbWFs/bC9pbnN0YWdyYW0t/bG9nby1pY29uLXRy/YW5zcGFyZW50LWJh/Y2tncm91bmQtZnJl/ZS1wbmcucG5n"
            alt=""
          />
          <p>Instagram</p>
        </div>
        <button
          onClick={() => {
            navigate("/reels");
          }}
        >
          Reel
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          post
        </button>

        <button
          onClick={() => {
            navigate("/create");
          }}
        >
          create
        </button>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </main>
  );
};

export default Home;
