import { type ReactNode } from "react";
import { useCounter, useCounterText } from "./context/CounterContext";


type ChildrenType = {
  children: (num: number) => ReactNode;
};

const Counter = ({ children }: ChildrenType) => {
  const {count, increment, decrement } = useCounter();
  const {text, handleTextInput } = useCounterText();
  return (
    <>
      {children(count)}
      <div className="plusminusbtns">
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      <input type="text" onChange={handleTextInput} />
      <p>{text}</p>
    </>
  );
};

export default Counter;
