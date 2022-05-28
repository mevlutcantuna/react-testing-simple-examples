import "./App.css";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (input.trim() === "") return alert("Please provide a new todo...");
    const newTodo = {
      name: input,
      id: Math.random(),
      checked: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
  };

  const deleteTodo = (id) => {
    const changedTods = todos.filter((todo) => todo.id !== id);
    setTodos(changedTods);
  };

  const changeStatusOfTodo = (e, id) => {
    const changedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          checked: e.currentTarget.checked,
        };
      }
      return todo;
    });

    setTodos(changedTodos);
  };

  return (
    <div className="app">
      <h3 style={{ marginBottom: "1rem" }}>TodoApp</h3>
      <div>
        <input
          style={{ marginRight: "1rem" }}
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div>
        <ul>
          {todos &&
            todos.map((todo) => (
              <li
                style={{
                  marginTop: ".5rem",
                  display: "flex",
                  alignItems: "center",
                }}
                key={todo.id}
              >
                <input
                  style={{ marginRight: ".25rem" }}
                  onChange={(e) => changeStatusOfTodo(e, todo.id)}
                  type="checkbox"
                  checked={todo.checked}
                />
                <span>{todo.name}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{ marginLeft: "1rem" }}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
