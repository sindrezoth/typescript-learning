import { useState } from "react";
import "./App.css";

import Form from "./components/Form"
import "./models/Example"
import fetchUsers from "./lib/fetchUsers";

fetchUsers();

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>React + Zod</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Form />
    </>
  );
}

export default App;
