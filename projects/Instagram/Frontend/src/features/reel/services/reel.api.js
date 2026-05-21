import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:3000/api/reel",
  withCredentials: true,
});



export const createReel= async (caption, video) => {

     const formData = new FormData();

  formData.append("caption", caption);

  formData.append("videoUrl" , video)
  console.log(video)

  const responces = await api.post("/", formData);
    console.log(responces)
  return responces;
};

export const feedReelData = async () => {
  const responces = await api.get("/get-feed");
  return responces;
};

