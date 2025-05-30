import { View } from "../view/ListView";
import { Model } from "../model/model";

const model = new Model(); 
const view = new View();

model.onready(() => {
  const listToPrint = model.readItems();
  if (listToPrint && listToPrint.length) {
    const { removeItem: removeItemCallback, setItemChecked} = model;
    view.printList(listToPrint.map(item => ({ ...item, removeItemCallback, setItemChecked })) )
  } 

  view.handleAddItemBtnClick((label: string) => {
    const item = model.newItem(label);
    const {removeItem: removeItemCallback, setItemChecked} = model;
    model.addItem(item);
    return { ...item, removeItemCallback, setItemChecked }
  })

  view.handleClearListBtnClick(() => {
    console.log(model.readItems());
    model.clearItems();
    const listToPrint = model.readItems();
    console.log(model.readItems());
    if (listToPrint) {
      const { removeItem: removeItemCallback, setItemChecked} = model;
      view.printList(listToPrint.map(item => ({ ...item, removeItemCallback, setItemChecked })) )
    } 
  })
})

model.init();
