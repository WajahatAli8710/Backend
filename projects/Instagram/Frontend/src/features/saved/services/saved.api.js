import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000/api/saved",
    withCredentials:true
})


export const PostSaved = async (entityId )=>{
  const responces = await api.post(`/${entityId}`)
  return responces
}
