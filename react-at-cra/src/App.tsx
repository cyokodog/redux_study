import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Child } from "./components/Child";

function App() {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };

  const [message, setMessage] = useState<string>("");

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className="App">
      <div>
        <p>{count}</p>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
      </div>
      <div>
        <input type="text" value={message} onChange={handleMessage} />
        <p>{message}</p>
      </div>

      <Child message="はろー">りあくと</Child>
      <div>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </div>
  );
}

export default App;
