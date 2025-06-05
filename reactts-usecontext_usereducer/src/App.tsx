import Counter from "./Counter";
import { CounterProvider, initState } from "./context/CounterContext";

function App() {
  return (
    <CounterProvider count={initState.count} text={initState.text}>
      <main>
        <Counter>{(count) => <h1>Count is {count}</h1>}</Counter>
      </main>
    </CounterProvider>
  );
}

export default App;
