import { newItemAddHandle } from "./ListView.ts";

const inputBtn: HTMLButtonElement = document.getElementById("addItem") as HTMLButtonElement;
const inputField: HTMLButtonElement = document.getElementById("newItem") as HTMLButtonElement;

export function toBusinessLogic(
  addItemCallback: (label: string) => string, 
  removeItemCallback: (id: string) => void,
  setItemCheck: (id: string, checked: boolean) => void
) {
  inputBtn.addEventListener('click', e => {
    e.preventDefault();
    console.log(inputField.value)
    const label = inputField.value; 

    const id: string = addItemCallback(label);
    if(label) {
      newItemAddHandle(label, id, removeItemCallback, setItemCheck)
      inputField.value = "";
    }
    else {
      console.log("input field is empty");
    }
  })
}

export function newItemSubmitCallbackReceiver(
  addItemCallback: (label: string) => string, 
  removeItemCallback: (id: string) => void,
  setItemCheck: (id: string, checked: boolean) => void
) {
  inputBtn.addEventListener('click', e => {
    e.preventDefault();

    const value = inputField.value; 
    addItemCallback(value);
    //console.log(inputField.value)
    const label = inputField.value; 

    const id: string = addItemCallback(label);
    if(label) {
      newItemAddHandle(label, id, removeItemCallback, setItemCheck)
      inputField.value = "";
    }
    else {
      console.log("input field is empty");
    }
  })
}
