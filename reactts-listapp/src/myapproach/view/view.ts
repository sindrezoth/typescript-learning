const clearBtn: HTMLButtonElement = document.getElementById("clearItemsButton") as HTMLButtonElement;
clearBtn.addEventListener('click', () => {
  console.log('clear list');
})

const List: HTMLUListElement = document.getElementById("listItems") as HTMLUListElement;

function newItemAddHandle(
  label: string, 
  id: string, 
  removeItemCallback: (id: string) => void,
  setItemCheck: (id: string, checked: boolean) => void
) {
  const newItemList: HTMLLIElement = document.createElement('li');
  newItemList.classList.add("item");
  const newItemListInputCheckbox: HTMLInputElement = document.createElement("input");
  newItemListInputCheckbox.type="checkbox";
  newItemListInputCheckbox.id=id;
  newItemListInputCheckbox.addEventListener('change', (e: Event) => {
    setItemCheck(id, (e.target as HTMLInputElement).checked);
  })
  
  const newItemListLabel: HTMLLabelElement = document.createElement("label");
  newItemListLabel.htmlFor=id;
  newItemListLabel.textContent=label;
  const newItemListButton: HTMLButtonElement = document.createElement("button");
  newItemListButton.classList.add("button");
  newItemListButton.addEventListener('click', () => {
    //e.preventDefault();
    removeItemCallback(id);
    List.removeChild(newItemList);
  })
  newItemListButton.textContent = "X"
  newItemList.appendChild(newItemListInputCheckbox);
  newItemList.appendChild(newItemListLabel);
  newItemList.appendChild(newItemListButton);
  List.appendChild(newItemList);
}
