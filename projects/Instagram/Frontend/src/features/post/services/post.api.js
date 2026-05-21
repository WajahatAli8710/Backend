import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/post",
  withCredentials: true,
});

export const createPost = async (caption, images) => {

     const formData = new FormData();

  formData.append("caption", caption);

  images.forEach((file) => {
    formData.append("imageUrl", file); // 👈 SAME NAME as multer
  });
  const responces = await api.post("/", formData);

  return responces;
};

export const feedData = async () => {
  const responces = await api.get("/get-feed");
  return responces;
};

