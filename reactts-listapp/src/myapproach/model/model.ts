import { api } from "../db/Database";
import { v4 } from "uuid";

export type Item = {
  id: string;
  label: string;
  checked: boolean;
  createdAt: number;
  updatedAt: number;
};

// type CRUDResult = {
//   id: string;
//   message: string;
//   operatedAt: number;
//   operationType: "create" | "remove" | "update";
// };

export class ItemList {
  private list: Item[];
  constructor(list: Item[] = []) {
    this.list = list;
  }
  newItem(label: string): Item {
    return {
      id: v4().slice(0, 8),
      label,
      checked: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }

  public addItem = (item: Item): void => {
    console.log(item);
    this.list.push(item);
    api.create(item);
  };

  public addItems = (items: Item[]): void => {
    this.list.push(...items);
    api.create(items);
  };

  public readItem = (itemId: string): Item | undefined => {
    api.read(itemId);
    const item = this.list.find((item) => item.id === itemId);
    return item ? { ...item } : undefined;
  };
  public readItems = (itemId?: string[] | undefined): Item[] | undefined => {
    api.read(itemId);
    if (itemId === undefined) {
      return this.list.map((item) => ({ ...item }));
    }
    return this.list
      .filter((item) => itemId.some((iid) => item.id === iid))
      .map((item) => ({ ...item }));
  };

  public removeItem = (itemId: string) => {
    console.log(this);
    console.log(`item with id ${itemId} has been removed`);
    console.log(this.list);
    this.list = this.list.filter((item) => item.id !== itemId);
    api.delete(itemId);
  };
  public removeItems = (itemId: string[]): void => {
    this.list = this.list.filter((item) =>
      itemId.some((iid) => iid !== item.id),
    );
    api.delete(itemId);
  };

  public clearItems = (): void => {
    const itemsToClear = this.list.filter(item => item.checked).map(item => item.id);
    console.log(itemsToClear);
    this.removeItems(itemsToClear)
  }

  public editItem = (itemId: string, updateTo: string): void => {
    const item = this.list.find((item) => item.id === itemId);
    if (item) {
      item.label = updateTo;
      api.update(itemId, item);
    }
  };
  public setItemCheck = (itemId: string, checked: boolean): void => {
    const item = this.list.find((item) => item.id === itemId);
    if (item) {
      console.log(`${item.label} is ${!checked ? "not " : ""}done`);
      item.checked = checked;
      api.update(itemId, item);
    }
  };


  private onreadyCallbacks: (() => void)[] = [];
  public onready = (callback: () => void): void => {
    this.onreadyCallbacks.push(callback);
  }
  public init = (): void => {
    api.read(undefined)
      .then((listt) => {
        this.list = listt?.data as Item[];
        this.onreadyCallbacks.forEach(callback => callback());
        //console.log(this.list);
    });
  };
}

export const itemList = new ItemList();

