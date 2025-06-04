import { useState, useEffect, useCallback, useMemo, useRef} from "react";
import type { MouseEvent, KeyboardEvent } from "react";

import "./App.css";

type User = {
  id: number,
  username: string
};


type fibFunc = (n: number) => number

const fib: fibFunc = (n) => {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}

function App() {
  const [counter, setCounter] = useState<number>(0);
  const [user, setUser] = useState<User>({
    id:0,
    username: "Zoth"
  });
  const [users, setUsers] = useState<User[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  console.log(inputRef?.current);
  console.log(inputRef?.current?.value);

  useEffect(() => {
    console.log('mounting')

    setUsers([{id: 234, username: "Kabas"}, {id: 333, username: "Meduz"}]);

    return () => console.log('unmounting')
  }, [])

  useEffect(() => {
    console.log("Users: ", users);
  }, [users])


  const subTwo = useCallback((e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
    console.log(e.target);
    setCounter((prev) => prev - 2);
  }, []);


  const fibNum: number = 36;
  const result = useMemo(() => fib(fibNum), [fibNum]);

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>

      {user && 
        <>
          <button onClick={() => {
            setCounter((prev) => prev + 1);
            setUser((prev) => ({...prev, id: prev.id + 1}));
          }}>
        user is {user?.username}<br/>
        user id is {user?.id}
      </button>
      <p>counter: {counter}</p>
      <button onClick={() => setCounter(prev => prev -1)}>
        -
      </button>
      <button onClick={subTwo}>
        -2
      </button>
    </>}
      <p>{result}</p>
      <input ref={inputRef} type="text" />

    </div>
  );
}

export default App;
