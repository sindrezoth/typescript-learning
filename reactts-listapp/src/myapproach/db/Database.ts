function fetchSym(
  url: string,
  params: {
    method: "get" | "post" | "put" | "patch" | "delete";
    body: string;
  },
  timeout: number = 200,
) {
  url;

  let tmplist = localStorage.getItem("list");
  let list: Item[] = [];
  if (tmplist && tmplist.length) {
    list = JSON.parse(tmplist);
  }

  const { id, item, updateTo }: { id: string | string[], item: Item, updateTo: string} = JSON.parse(params.body);

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (params.method === "get") {
        if(id) {
          if(Array.isArray(id)) {
            const item = list.filter(item => id.some(i => item.id === i));
            if(item.length > 0) {
              res({
                statusCode: 200,
                message: "getted",
                params,
                data: item
              });
            } else {
              rej({
                statusCode: 404,
                message: `No items with ${id.reduce((i, n) => i + ', ' + n)} ids.`,
                params,
              });
            }
          }
          else {
            const item = list?.find(i => i.id === id);
            if(item) {
              res({
                statusCode: 200,
                message: "getted",
                params,
                data: item
              });
            } else {
              rej({
                statusCode: 404,
                message: `No item with ${id} id.`,
                params,
              });
            }
          }
        } 
        else {
          res({
            statusCode: 200,
            message: "getted",
            params,
            data: list.map(item => ({...item}))
          });
        }
      } 
      else if (params.method === "post") {
        if(Array.isArray(item) && item.length > 0) {
          list.push(...item);
          localStorage.setItem("list", JSON.stringify(list));

          res({
            statusCode: 201,
            message: "created",
            params,
            data: item
          });
        } 
        else if (item) {
          list.push(item);
          localStorage.setItem("list", JSON.stringify(list));
          res({
            statusCode: 201,
            message: "created",
            params,
            data: item
          });
        }
        else {
          rej({
            statusCode: 401,
            message: `Bad request`,
            params,
          })
        }
      }
      else if (params.method === "put") {
        if(!id || !updateTo) {
          rej({
            statusCode: 401,
            message: `Bad request`,
            params,
          })
        }
        const item = list.find(item => item.id === id);
        if(item) {
          item.label = updateTo;
        }
        else {
          rej({
            statusCode: 404,
            message: `No item with ${id} id.`,
            params,
          })
        }
       
        localStorage.setItem("list", JSON.stringify(list));
        res({
          statusCode: 200,
          message: "updated",
          params,
          data: item
        });
      }
      else if (params.method === "delete") {
        if(id) {
          if(Array.isArray(id)) {
            const {left, remove}: {left: Item[], remove: Item[]} = list.reduce((
              {left, remove}: {left: Item[], remove: Item[]}, 
              item: Item
            ) => {
                if(id.some(i => item.id === i)) {
                  remove.push(item);
                } else {
                  left.push(item);
                }
                return {left, remove};
              }, {left: [] as Item[], remove: [] as Item[]});
            list = left;

            localStorage.setItem("list", JSON.stringify(list));
            res({
              statusCode: 200,
              message: "deleted",
              params,
              data: remove
            })
          } else {
            list = list.filter(item => item.id !== id);

            localStorage.setItem("list", JSON.stringify(list));
            res({
              statusCode: 200,
              message: "deleted",
              params,
              data: item
            })
          }
        } else {
          rej({
            statusCode: 404,
            message: `No item with ${id} id.`,
            params,
          })
        }
      }
    }, timeout);
  });
}

interface DatabaseCRUDFacade {
  create: (item: Item | Item[]) => Promise<DatabaseOperationResult>;
  read: (id: string | string[] | undefined) => Promise<DatabaseOperationResult>;
  update: (id: string, updateTo: Item) => Promise<DatabaseOperationResult>;
  delete: (id: string | string[]) => Promise<DatabaseOperationResult>;
}

type DatabaseOperationResult = {
  statusCode: number;
  message: string;
  data?: Item | Item[];
};

type Item = {
  id: string;
  label: string;
  checked: boolean;
  createdAt: number;
  updatedAt: number;
};

class Database implements DatabaseCRUDFacade {
  async create(item: Item | Item[]): Promise<DatabaseOperationResult> {
    const res = await fetchSym("/api/additem", {
      method: "post",
      body: JSON.stringify({ item }),
    });

    return res as Promise<DatabaseOperationResult>;
  }

  async read(
    id: string | string[] | undefined,
  ): Promise<DatabaseOperationResult> {
    const res = await fetchSym("/api/readitem", {
      method: "get",
      body: JSON.stringify({ id }),
    });

    return res as Promise<DatabaseOperationResult>;
  }

  async update(id: string, updateTo: Item): Promise<DatabaseOperationResult> {
    const res = await fetchSym("/api/updateitem", {
      method: "put",
      body: JSON.stringify({ id, updateTo }),
    });

    return res as Promise<DatabaseOperationResult>;
  }

  async delete(id: string | string[]): Promise<DatabaseOperationResult> {
    const res = await fetchSym("/api/updateitem", {
      method: "delete",
      body: JSON.stringify({ id }),
    });

    return res as Promise<DatabaseOperationResult>;
  }
}

const db = new Database();

export const api: DatabaseCRUDFacade = db as DatabaseCRUDFacade;
