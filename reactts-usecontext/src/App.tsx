import Counter from "./Counter";

function App() {

  return (
    <main>
      <Counter>
        {(count) => <h1>Count is {count}</h1>}
      </Counter>
    </main>
  );
}

export default App;
