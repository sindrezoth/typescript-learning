import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  private _ul: HTMLUListElement;

  private _clearBtn: HTMLButtonElement;
  constructor() {
    this._ul = document.getElementById("listItems") as HTMLUListElement;

    this._clearBtn = document.getElementById(
      "clearItemsButton",
    ) as HTMLButtonElement;
    this._clearBtn.addEventListener("click", () => {
      this.clear();
    });
  }

  clear(): void {
    const childNodes = this._ul.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      const checked = childNodes[i].firstChild as HTMLInputElement;
      if (checked.checked) {
        childNodes[i].remove();
      }
    }
  }

  render(fullList: FullList) {
    while (this._ul.firstChild) {
      this._ul.firstChild.remove();
    }

    fullList.list.forEach((item) => {
      const { id, item: label, checked } = item;
      const newItem = document.createElement("li");
      newItem.classList.add("item");

      const newItemCheckbox = document.createElement("input");
      newItemCheckbox.type = "checkbox";
      newItemCheckbox.id = item.id;
      newItemCheckbox.tabIndex = 0;
      newItemCheckbox.checked = checked;
      newItemCheckbox.addEventListener("change", () => {
        fullList.checkedSwitch(id);
      });

      const newItemLabel = document.createElement("label");
      newItemLabel.htmlFor = id;
      newItemLabel.textContent = label;

      const newItemDeleteBtn = document.createElement("button");
      newItemDeleteBtn.classList.add("button");
      newItemDeleteBtn.addEventListener("click", () => {
        newItem.remove();
        fullList.removeItem(id);
      });
      newItemDeleteBtn.textContent = "X";

      newItem.appendChild(newItemCheckbox);
      newItem.appendChild(newItemLabel);
      newItem.appendChild(newItemDeleteBtn);
      this._ul.appendChild(newItem);
    });
  }

  get ul() {
    return this._ul;
  }
}
