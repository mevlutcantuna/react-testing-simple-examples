const { default: axios } = require("axios");

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export const getAllTodos = async () => await api.get("/todos");

export const addTodo = async (todo) => await api.post("/todos", todo);

export const deleteTodo = async (id) => await api.delete(`/todos/${id}`);

export const updateTodo = async (id, todo) =>
  await api.put(`/todos/${id}`, todo);
