import { v4 as uuid} from "uuid";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {
  const fullList = new FullList();
  const template = new ListTemplate();

  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;
  itemEntryForm.addEventListener("submit", (e: SubmitEvent): void => {
    e?.preventDefault();
    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText: string = input.value.trim();
    if(!newEntryText) { 
      console.log("Label is empty!");
      return; 
    }

    const itemId: string = uuid().slice(0, 8);
    const newItem = new ListItem(itemId, newEntryText);

    fullList.addItem(newItem);
    template.render(fullList);
    input.value = "";
  })

  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;
  clearItems.addEventListener("click", (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);
}

document.addEventListener("DOMContentLoaded", initApp);
