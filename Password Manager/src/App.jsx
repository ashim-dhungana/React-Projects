import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div>New div</div>
      <Manager />
    </>
  );
}

export default App;
