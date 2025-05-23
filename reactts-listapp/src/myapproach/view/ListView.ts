const List: HTMLUListElement = document.getElementById(
  "listItems",
) as HTMLUListElement;

export function newItemAddHandle(
  label: string,
  id: string,
  removeItemCallback: (id: string) => void,
  setItemCheck: (id: string, checked: boolean) => void,
) {
  const newItemList: HTMLLIElement = document.createElement("li");
  newItemList.classList.add("item");

  const newItemListInputCheckbox: HTMLInputElement =
    document.createElement("input");

  newItemListInputCheckbox.type = "checkbox";
  newItemListInputCheckbox.id = id;
  newItemListInputCheckbox.addEventListener("change", (e: Event) => {
    setItemCheck(id, (e.target as HTMLInputElement).checked);
  });

  const newItemListLabel: HTMLLabelElement = document.createElement("label");
  newItemListLabel.htmlFor = id;
  newItemListLabel.textContent = label;

  const newItemListButton: HTMLButtonElement = document.createElement("button");
  newItemListButton.classList.add("button");
  newItemListButton.addEventListener("click", () => {
    removeItemCallback(id);
    List.removeChild(newItemList);
  });

  newItemListButton.textContent = "X";
  newItemList.appendChild(newItemListInputCheckbox);
  newItemList.appendChild(newItemListLabel);
  newItemList.appendChild(newItemListButton);

  List.appendChild(newItemList);
}

type ItemViewType = {
  elem: HTMLLIElement;
  label: string;
  id: string;
  checked: boolean;
};
type CreateItemFromType = {
  label: string;
  id: string;
  removeItemCallback: (id: string) => void;
  setItemCheck: (id: string, checked: boolean) => void;
};

export function createItem({
  label,
  id,
  removeItemCallback,
  setItemCheck,
}: CreateItemFromType): ItemViewType {
  const newItemList: HTMLLIElement = document.createElement("li");
  newItemList.classList.add("item");

  const newItemListInputCheckbox: HTMLInputElement =
    document.createElement("input");

  newItemListInputCheckbox.type = "checkbox";
  newItemListInputCheckbox.id = id;
  newItemListInputCheckbox.addEventListener("change", (e: Event) => {
    setItemCheck(id, (e.target as HTMLInputElement).checked);
  });

  const newItemListLabel: HTMLLabelElement = document.createElement("label");
  newItemListLabel.htmlFor = id;
  newItemListLabel.textContent = label;

  const newItemListButton: HTMLButtonElement = document.createElement("button");
  newItemListButton.classList.add("button");
  newItemListButton.addEventListener("click", () => {
    removeItemCallback(id);
    List.removeChild(newItemList);
  });

  newItemListButton.textContent = "X";
  newItemList.appendChild(newItemListInputCheckbox);
  newItemList.appendChild(newItemListLabel);
  newItemList.appendChild(newItemListButton);

  return { elem: newItemList, label, id, checked: false };
}

const clearBtn: HTMLButtonElement = document.getElementById(
  "clearItemsButton",
) as HTMLButtonElement;
clearBtn.addEventListener("click", () => {
  console.log("clear list");
});

export function clearItemSubmitCallbackReceiver(callback: any) {
  clearBtn.addEventListener("click", callback);
}

// public printList = (list: any[]): void => {
//   list.forEach((item: any): void => {
//     newItemAddHandle(item.label, item.id, itemList.removeItem, itemList.setItemCheck)
//   })
// }
//
class ItemView {
  public elem: HTMLLIElement;
  public props: Omit<ItemViewType, "elem">;
  constructor(item: ItemViewType) {
    this.elem = item.elem;
    this.props = {
      label: item.label,
      id: item.id,
      checked: item.checked,
    };
  }
}

class ListView {
  private elem: HTMLUListElement;
  private list: ItemView[];
  constructor() {
    this.elem = document.getElementById("listItems") as HTMLUListElement;
    this.list = [];
  }

  public addItem = ({
    label,
    id,
    removeItemCallback,
    setItemCheck,
  }: CreateItemFromType): void => {
    const createdItemElement = createItem({
      label,
      id,
      removeItemCallback,
      setItemCheck,
    });
    this.elem.appendChild(createdItemElement.elem);
    this.list.push(new ItemView(createdItemElement));
  };

  public addItems = (items: CreateItemFromType[]): void => {
    const createdItemElements: ItemViewType[] = items.map(
      (item: CreateItemFromType) => createItem(item),
    );
    this.elem.append(
      ...createdItemElements.map((item: ItemViewType) => item.elem),
    );
    this.list.push(
      ...createdItemElements.map((item: ItemViewType) => new ItemView(item)),
    );
  };

  public removeItem = (id: string): void => {
    const item = this.list.find((item) => item.props.id === id);
    if (item) {
      this.elem.removeChild(item.elem);
      this.list = this.list.filter((item) => item.props.id !== id);
    } else {
      console.log(`Item with "${id}" id not found`);
    }
  };
}

export class View {
  private list: ListView;
  constructor() {
    this.list = new ListView();
    this.list;
  }
}
