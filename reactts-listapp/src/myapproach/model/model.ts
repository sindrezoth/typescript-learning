import { api } from "../db/Database";
import { v4 as uuid } from "uuid";

export type Item = {
  id: string;
  label: string;
  checked: boolean;
  createdAt: number;
  updatedAt: number;
};

export class Model {
  private list: Item[];
  private onreadyCallbacks: (() => void)[] = [];

  constructor(list: Item[] = []) {
    this.list = list;
  }

  newItem(label: string): Item {
    return {
      id: uuid().slice(0, 8),
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
    if(itemId.length) {
      console.log(this.list);
      this.list = this.list.filter((item) => !itemId.some((id) => id === item.id));

      console.log(this.list);
      api.delete(itemId);
    }
  };

  public clearItems = (): void => {
    const itemsToClear = this.list.filter(({ checked }) => checked).map(item => item.id);
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

  public setItemChecked = (itemId: string, checked: boolean): void => {
    const item = this.list.find((item) => item.id === itemId);
    if (item) {
      //console.log(`${item.label} is ${!checked ? "not " : ""}done`);
      item.checked = checked;
      api.update(itemId, item);
    }
  };

  public onready = (callback: () => void): void => {
    this.onreadyCallbacks.push(callback);
  }

  public init = (): void => {
    api.read(undefined)
      .then((listt) => {
        this.list = listt?.data as Item[];
        this.onreadyCallbacks.forEach(callback => callback());
    });
  };
}

