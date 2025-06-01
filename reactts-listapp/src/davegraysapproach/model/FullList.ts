import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  private readonly STORAGE_KEY = "itemList";
  private _loaded: boolean = false;
  private _list: ListItem[] = [];

  constructor(list: ListItem[] = []) {
    this._list = list;
  }

  public load(): void {
    if (this._loaded) {
      console.log("Items already loaded from localStorage");
      return;
    }

    let items = localStorage.getItem(this.STORAGE_KEY);
    if (!items) {
      console.log("No items to load");
      return;
    }

    const parsedList: {
      _id: string;
      _item: string;
      _checked: boolean;
    }[] = JSON.parse(items);

    parsedList.forEach(({ _id, _item, _checked }) =>
      this.addItem(new ListItem(_id, _item, _checked)),
    );

    this._loaded = true;
  }

  public save(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._list));
  }

  public clearList(): void {
    this._list = this._list.filter((item) => !item.checked);
    this.save();
  }

  public addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  public checkedSwitch(id: string): void {
    const item = this._list.find(({id: itemId}) => itemId === id);
    if(!item) {
      console.log("Item not found");
      return;
    }

    item.checked = !item.checked;
    this.save();
  }

  public removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }

  get list(): ListItem[] {
    return JSON.parse(JSON.stringify(this._list)).map((item: {_id: string, _item: string, _checked: boolean}) => ({id: item._id, item: item._item, checked: item._checked}) as ListItem) as ListItem[];
  }
}
