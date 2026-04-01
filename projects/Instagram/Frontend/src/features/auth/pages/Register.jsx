import "../style/form.scss"
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate , Link } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const {handleRegister , loading} = useAuth()
    const navigate = useNavigate()

    const handleSubmit =async(e)=>{
        e.preventDefault()
        await handleRegister(username , email , password)
        navigate("/")
    }       
    return(
        
       <main>
         <div className="fromContainer">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input onInput={(e)=> setUsername(e.target.value)} type="username" placeholder="enter a username" name="username" />
                <input  onInput={(e)=> setEmail(e.target.value)} type="email" placeholder="enter a email" name="email" />
                <input  onInput={(e)=> setPassword(e.target.value)} type="password" placeholder="enter a password" name="password"  />
                <button>Register
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
            <p>Already have an account please <Link to={"/login"}>Login</Link> </p>
            </form>
        </div>
       </main>
    )
};

export default Register;
