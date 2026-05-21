import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000/api/like",
    withCredentials:true
})


export const PostLike = async (entityId )=>{
  const responces = await api.post(`/${entityId}`)
  return responces
}
