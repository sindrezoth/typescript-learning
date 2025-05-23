import { newItemSubmitCallbackReceiver } from "../view/newItemView";
import { clearItemSubmitCallbackReceiver } from "../view/ListView";
import { newItemAddHandle } from "../view/ListView";
import { ItemList } from "../model/model";

class View {
  public printList = (list: any[]): void => { 
    list.forEach((item: any): void => {
      newItemAddHandle(item.label, item.id, itemList.removeItem, itemList.setItemCheck)
    })
  }
}

const view = new View(); 
const itemList = new ItemList(); 

itemList.onready(() => {
  view.printList(itemList.readItems()!) 
  newItemSubmitCallbackReceiver((label: string) => {
    const item = itemList.newItem(label);
    itemList.addItem(item);
    return item.id;
  }, itemList.removeItem, itemList.setItemCheck);
  clearItemSubmitCallbackReceiver(() => {
    itemList.clearItems();
    view.printList(itemList.readItems()!);
  })
})

itemList.init();
