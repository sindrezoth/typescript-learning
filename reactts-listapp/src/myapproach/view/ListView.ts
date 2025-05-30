type ItemViewType = {
  elem: HTMLLIElement;
  label: string;
  id: string;
  checked: boolean;
  itemState: ItemState;
  createdAt: number;
  updatedAt: number;
};

type ItemStates = "pending" | "rejected" | "fullfilled" | undefined;

type ItemState = {
  state: ItemStates,
  resetState: () => void,
  setState: (state: ItemStates) => void
};

type CreateItemFromType = {
  label: string;
  id: string;
  checked: boolean;
  createdAt: number;
  updatedAt: number;
  removeItemCallback: (id: string) => void;
  setItemChecked: (id: string, checked: boolean) => void;
};

export function createItem({
  label,
  id,
  createdAt,
  updatedAt,
  removeItemCallback,
  setItemChecked,
}: CreateItemFromType): ItemViewType {
  const newItemList: HTMLLIElement = document.createElement("li");
  newItemList.classList.add("item");

  const newItemListInputCheckbox: HTMLInputElement =
    document.createElement("input");

  newItemListInputCheckbox.type = "checkbox";
  newItemListInputCheckbox.id = id;
  newItemListInputCheckbox.addEventListener("change", (e: Event) => {
    setItemChecked(id, (e.target as HTMLInputElement).checked);
  });

  const newItemListLabel: HTMLLabelElement = document.createElement("label");
  newItemListLabel.htmlFor = id;
  newItemListLabel.textContent = label;

  const newItemListButton: HTMLButtonElement = document.createElement("button");
  newItemListButton.classList.add("button");
  newItemListButton.addEventListener("click", () => {
    removeItemCallback(id);
    //List.removeChild(newItemList);
    newItemList.remove();
  });

  newItemListButton.textContent = "X";
  newItemList.appendChild(newItemListInputCheckbox);
  newItemList.appendChild(newItemListLabel);
  newItemList.appendChild(newItemListButton);

  const itemState: ItemState = {
    state: undefined,
    resetState() {
      this.state = undefined;
    },
    setState(state: ItemStates) {
      this.state = state;
    }
  };

  return { elem: newItemList, itemState, label, id, checked: false, createdAt, updatedAt };
}

class ItemView {
  public elem: HTMLLIElement;
  public props: Omit<ItemViewType, "elem" | "itemState">;
  public itemState: ItemState;
  constructor(item: ItemViewType) {
    this.elem = item.elem;
    this.itemState = item.itemState;
    this.props = {
      label: item.label,
      id: item.id,
      checked: item.checked,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
}

export class View {
  private addButton: HTMLButtonElement;
  private inputField: HTMLInputElement;
  private clearBtn: HTMLButtonElement;
  private itemList: { elem: HTMLUListElement; list: ItemView[] };
  constructor() {
    this.inputField = document.getElementById("newItem") as HTMLInputElement;
    this.addButton = document.getElementById("addItem") as HTMLButtonElement;
    this.clearBtn = document.getElementById(
      "clearItemsButton",
    ) as HTMLButtonElement;
    this.itemList = {
      elem: document.getElementById("listItems") as HTMLUListElement,
      list: [],
    };
  }

  public printList = (list: CreateItemFromType[]): void => {
    console.log(list);
    this.removeAllItems();
    this.addItems(list);
  };

  public handleClearListBtnClick = (callback: () => void) => {
    this.clearBtn.addEventListener("click", () => {
      callback();
    });
  };

  public handleAddItemBtnClick = (
    callback: (label: string) => Omit<CreateItemFromType, "label">,
  ) => {
    this.addButton.addEventListener("click", (e) => {
      e.preventDefault();
      const label = this.inputField.value;

      const { id, createdAt, updatedAt, removeItemCallback, setItemChecked } =
        callback(label);
      if (label) {
        this.addItem({
          label,
          id,
          checked: false,
          createdAt,
          updatedAt,
          removeItemCallback,
          setItemChecked,
        });
        this.inputField.value = "";
      } else {
        console.log("input field is empty");
      }
    });
  };

  public addItem = ({
    label,
    id,
    checked,
    createdAt,
    updatedAt,
    removeItemCallback,
    setItemChecked,
  }: CreateItemFromType): void => {
    const createdItemElement = createItem({
      label,
      id,
      checked,
      createdAt,
      updatedAt,
      removeItemCallback,
      setItemChecked,
    });
    this.itemList.elem.appendChild(createdItemElement.elem);
    this.itemList.list.push(new ItemView(createdItemElement));
  };

  public addItems = (items: CreateItemFromType[]): void => {
    const createdItemElements: ItemViewType[] = items.map(
      (item: CreateItemFromType) => createItem(item),
    );
    this.itemList.elem.append(
      ...createdItemElements.map((item: ItemViewType) => item.elem),
    );
    this.itemList.list.push(
      ...createdItemElements.map((item: ItemViewType) => new ItemView(item)),
    );
  };

  public removeItem = (id: string): void => {
    const item = this.itemList.list.find((item) => item.props.id === id);
    if (item) {
      this.itemList.elem.removeChild(item.elem);
      this.itemList.list = this.itemList.list.filter(
        (item) => item.props.id !== id,
      );
    } else {
      console.log(`Item with "${id}" id not found`);
    }
  };
  public removeAllItems = (): void => {
    this.itemList.list.forEach(item => this.itemList.elem.removeChild(item.elem));
    this.itemList.list = [];
  }
}
