import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const signup = async (user) => {
  return await api.post("auth/signup", user);
};

export const login = async (user) => {
  return await api.post("auth/login", user);
};
