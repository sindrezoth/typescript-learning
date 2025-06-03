import type { ReactNode } from "react";

type SimpleCounterProps = {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  children: ReactNode;
};

const Counter = ({ children, setCount }: SimpleCounterProps) => {
  return (
    <>
      <h3>{children}</h3>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
    </>
  );
};

export default Counter;
