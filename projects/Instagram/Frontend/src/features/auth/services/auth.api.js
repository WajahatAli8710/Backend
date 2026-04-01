import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const login = async (email, password) => {
  const responces = await api.post("/login", {
    email,
    password,
  });
  return responces;
};

export const register = async (username, email, password) => {
  const responces = await api.post("/register", {
    username,
    email,
    password,
  });

  return responces;
};

export const getMe = async () => {
  const responces = await api.get("/get-me");
  return responces;
};
