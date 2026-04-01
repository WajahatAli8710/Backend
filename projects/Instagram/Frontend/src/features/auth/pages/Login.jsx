import "../style/form.scss";
import { useAuth } from "../hooks/useAuth";
import { useNavigate , Link } from "react-router-dom";
import { useState } from "react";

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
        <h2>Login</h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            required
            type="email"
            placeholder="enter a email"
            name="email"
            id="email"
            onInput={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="enter a password"
            name="password"
            id="password"
            onInput={(e) => setPassword(e.target.value)}
          />
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
          <p>Dont have an account ? <Link to={"/register"}>create now</Link> </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
