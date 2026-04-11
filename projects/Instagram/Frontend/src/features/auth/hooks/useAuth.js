import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { login , register } from "../services/auth.api"


export const useAuth = () => {

    const context = useContext(AuthContext)

    const {user , loading , setUser , setLoading} = context;

     const handleLogin = async (email , password)=>{
        setLoading(true)

        const responces = await login(email  , password)

        setUser(responces.user)
        setLoading(false)
    }

     const handleRegister = async(username , email , password , name)=>{
        setLoading(true)
        const responces = await register(username, email , password , name)
        setUser(responces.user)
        setLoading(false)
    }

  return {
    user , loading , handleLogin , handleRegister
  }
}

