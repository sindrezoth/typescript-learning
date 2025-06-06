import React, { type ChangeEvent, type ReactElement, memo } from "react";
import {
  type CartItemType,
  type ReducerAction,
  type ReducerActionType,
} from "../context/CartProvider";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url)
    .href;

  const lineTotal: number = item.qty * item.price;

  const highestQty: number = 20 > item.qty ? 20 : item.qty;

  const optionValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1,
  );

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveCart = () =>
    dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });

  const content = (
    <li className="cart__item">
      <img className="cart__img" src={img} alt={item.name} />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Item Per Item">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </div>
      <label htmlFor="itemQty" className="offscreen">
        Item Quantinty
      </label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart__select"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
      >
        {options}
      </select>

      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>

      <button
        onClick={onRemoveCart}
        className="cart__button"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
      >
        X
      </button>
    </li>
  );

  return content;
};

function areItemsEqual({ item: prev }: PropsType, { item: next }: PropsType) {
  return Object.keys(prev).every(
    (key) =>
      prev[key as keyof CartItemType] === next[key as keyof CartItemType],
  );
}

const MemoizedCardLineItme = memo<typeof CartLineItem>(
  CartLineItem,
  areItemsEqual,
);
export default MemoizedCardLineItme;
