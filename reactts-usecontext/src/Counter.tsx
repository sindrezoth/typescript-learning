import { type ChangeEvent, type ReactNode, useReducer } from "react";

const initState = { count: 0, text: '' };

// @ts-expect-error
const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT
}


type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string
};

const reducer = (
  state: typeof initState,
  action: ReducerAction,
): typeof initState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload ?? ''};
    default:
      throw new Error(`Action ${action.type} do not exists`);
  }
};

type ChildrenType = {
  children: (num: number) => ReactNode;
};

const Counter = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const increment = () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  const decrement = () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });
  const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => 
    dispatch({ type: REDUCER_ACTION_TYPE.NEW_INPUT, payload: e.target.value });

  return (
    <div>
      {children(state.count)}
      <div className="plusminusbtns">
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      <input type="text" onChange={handleTextInput} />
      <p>{state.text}</p>
    </div>
  );
};

export default Counter;
