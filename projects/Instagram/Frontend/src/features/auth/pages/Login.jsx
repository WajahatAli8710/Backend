import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../style/Login.scss";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { handleLogin, loading } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin(email, password);

    navigate("/");
  };

  return (
    <main>
      <div className="fromContainer">
        <div className="formCard">
          <h2>Instagram</h2>

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="inputGroup">
              <input
                type="email"
                placeholder="username, or email"
                value={email}
                onInput={(e) => {
                  setEmail(e.target.value)
                  }}
                name="email"
                required
              />

              <input
                required
                placeholder="password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                name="password"
              />
            </div>

            <button>
              Login
              {loading ? (
                <div className="loader">
                  <div className="dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </button>
          </form>
        </div>

        <div className="signupCard">
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
