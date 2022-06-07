import "./App.css";
import { useEffect, useState } from "react";
import { addTodo, deleteTodo, getAllTodos, updateTodo } from "./lib/api";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const _getAllTodos = async () => {
    const { data } = await getAllTodos();
    setTodos(data);
  };

  const _addTodo = async () => {
    const newTodo = {
      id: uuidv4(),
      name: input,
      completed: false,
    };

    const { data } = await addTodo(newTodo);
    setTodos((prev) => [...prev, data]);
    setInput("");
  };

  const _deleteTodo = async (id) => {
    await deleteTodo(id);
    const deletedTodos = todos.filter((item) => item.id !== id);
    setTodos(deletedTodos);
  };

  const _updateTodo = async (id, todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    const { data } = await updateTodo(id, updatedTodo);
    const updatedTodos = todos.map((item) => {
      if (item.id === data.id) {
        return data;
      } else return item;
    });

    setTodos(updatedTodos);
  };

  useEffect(() => {
    _getAllTodos();
  }, []);

  return (
    <div className="app">
      <h3 style={{ marginBottom: "1rem" }}>TodoApp</h3>
      <div>
        <input
          className="addInput"
          style={{ marginRight: "1rem" }}
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={_addTodo} className="addButton">
          Add
        </button>
      </div>
      <div>
        {todos && todos.length === 0 ? (
          <div className="notFound" style={{ marginTop: "1rem" }}>
            Not Found Todos
          </div>
        ) : (
          <ul className="todos">
            {todos.map((todo) => (
              <li
                className="todo-item"
                style={{
                  marginTop: ".5rem",
                  display: "flex",
                  alignItems: "center",
                }}
                key={todo.id}
              >
                <input
                  onChange={() => _updateTodo(todo.id, todo)}
                  style={{ marginRight: ".25rem" }}
                  type="checkbox"
                  checked={todo.completed}
                />
                <span>{todo.name}</span>
                <button
                  onClick={() => _deleteTodo(todo.id)}
                  style={{ marginLeft: "1rem" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="leftTodos" style={{ marginTop: "2rem" }}>
          {todos.filter((item) => item.completed !== true).length} left
        </div>
      </div>
    </div>
  );
}

export default App;
