console.log("My own approach of making this app");
import { api } from "./db/Database";

type Item = {
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

class ItemList {
  private list: Item[];
  constructor(list: Item[] = []) {
    this.list = list;
    api.read(undefined).then((listt) => {
      this.list = listt?.data as Item[];
      console.log(this.list);
    });
  }

  addItem(item: Item): void {
    this.list.push(item);
    api.create(item);
  }

  addItems(items: Item[]): void {
    this.list.push(...items);
    api.create(items);
  }

  readItem(itemId: string): Item | undefined {
    api.read(itemId);
    const item = this.list.find((item) => item.id === itemId);
    return item ? { ...item } : undefined;
  }
  readItems(itemId?: string[] | undefined): Item[] | undefined {
    api.read(itemId);
    if (itemId === undefined) {
      return this.list.map((item) => ({ ...item }));
    }
    return this.list
      .filter((item) => itemId.some((iid) => item.id === iid))
      .map((item) => ({ ...item }));
  }

  removeItem(itemId: string): void {
    this.list = this.list.filter((item) => item.id !== itemId);
    api.delete(itemId);
  }
  removeItems(itemId: string[]): void {
    this.list = this.list.filter((item) =>
      itemId.some((iid) => iid !== item.id),
    );
    api.delete(itemId);
  }

  editItem(itemId: string, updateTo: string): void {
    const item = this.list.find((item) => item.id === itemId);
    if (item) {
      item.label = updateTo;
      api.update(itemId, item);
    }
  }
  switchItemCheck(itemId: string): void {
    const item = this.list.find((item) => item.id === itemId);
    if (item) {
      item.checked = !item.checked;
      api.update(itemId, item);
    }
  }
}

const l = new ItemList();
// l.addItem({
//   id: "l0",
//   checked: false,
//   label: "new item",
//   createdAt: Date.now(),
//   updatedAt: Date.now(),
// });
// l.addItems([
//   {
//     id: "l1",
//     checked: false,
//     label: "new item",
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//   },
//   {
//     id: "l2",
//     checked: false,
//     label: "new item",
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//   },
// ] as Item[]);

//l.removeItem("l1");
//l.readItems();

// <!-- <li class="item"> -->
// <!--   <input type="checkbox" id="1" /> -->
// <!--   <label for="1">eat</label> -->
// <!--   <button class="button">X</button> -->
// <!-- </li> -->
