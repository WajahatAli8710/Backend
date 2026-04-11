// import "../style/form.scss"
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../style/Register.scss";

const Register = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);

  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(username, email, password , name);
    navigate("/");
  };
  // return(

  //    <main>
  //      <div className="fromContainer">
  //         <h2>Register</h2>
  //         <form onSubmit={handleSubmit}>
  //             <input onInput={(e)=> setUsername(e.target.value)} type="username" placeholder="enter a username" name="username" />
  //             <input  onInput={(e)=> setEmail(e.target.value)} type="email" placeholder="enter a email" name="email" />
  //             <input  onInput={(e)=> setPassword(e.target.value)} type="password" placeholder="enter a password" name="password"  />
  //             <button>Register
  //                 {loading ? (
  //           <div className="loader">
  //             <div className="dots">
  //               <div className="dot"></div>
  //               <div className="dot"></div>
  //               <div className="dot"></div>
  //             </div>
  //           </div>
  //         ) : (
  //           ""
  //         )}
  //             </button>
  //         <p>Already have an account please <Link to={"/login"}>Login</Link> </p>
  //         </form>
  //     </div>
  //    </main>
  // )''

  return (
    <main>
      <div className="fromContainer">
        <div className="formCard">
          <h2>Instagram</h2>

          <p className="tagline">
            Sign up to see photos and videos from your friends.
          </p>

          <form onSubmit={(e)=>{
            handleSubmit(e)
          }}>
            <div className="inputGroup">
              <input
                type="text"
                placeholder="enter a Full Name"
                value={name}
                onInput={(e) => setName(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="enter a User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                required
                type="email"
                placeholder="enter a Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                required
                type="password"
                placeholder="enter a Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
