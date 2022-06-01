import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button className="increment" onClick={(prev) => setCount(count + 1)}>
        increment
      </button>
      <h3 className='count'>{count}</h3>
      <button className="decrement" onClick={(prev) => setCount(count - 1)}>
        decrement
      </button>
    </div>
  );
}

export default App;
