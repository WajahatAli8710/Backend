import { useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../style/Register.scss";

const Register = () => {
  // Always use empty strings for input states to keep them controlled
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      await handleRegister(username, email, password, name, profilePic);
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };




  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const selected = e.target.files[0];

    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    fileRef.current.value = "";
  };

  return (
    <main className="register-page">
      <div className="fromContainer">
        <div className="formCard">
          <h2>Instagram</h2>
          <p className="tagline">
            Sign up to see photos and videos from your friends.
          </p>

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="inputGroup">
              <div className="profilePicUpload">
                <input
                  type="file"
                  ref={fileRef}
                  hidden
                  onChange={handleChange}
                />

                {/* upload button */}
                {!preview && (
                  <button
                    type="button"
                    className="uploadeBtn"
                    onClick={() => fileRef.current.click()}
                  >
                    upload Profile Pic
                  </button>
                )}

                {/* preview section */}
                {preview && (
                  <div className="preview">
                    <img src={preview} alt="preview" />

                    <div className="actions">
                      <button
                        type="button"
                        onClick={() => fileRef.current.click()}
                      >
                        change
                      </button>

                      <button type="button" onClick={handleRemove}>
                        remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? (
                <div className="loader">
                  <div className="dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>

        <div className="loginCard">
          <p>
            Have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
