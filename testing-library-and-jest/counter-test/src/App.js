import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button onClick={(prev) => setCount(count + 1)}>increment</button>
      <h3>{count}</h3>
      <button onClick={(prev) => setCount(count - 1)}>decrement</button>
    </div>
  );
}

export default App;
