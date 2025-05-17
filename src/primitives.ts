import { returnedModule } from "./types.ts";

function run() {
  // --- Primitives ---
  //  - string
  //  - number
  //  - boolean

  // --- Union Types ---
  let tax: number | string = 10;
  console.log(`tax is ${tax}`);
  tax = "10";
  console.log(`tax is ${typeof tax === "string" ? '"' + tax + '"' : tax}`);
  console.log("");

  // --- Literal Types ---
  let reqStatus: "pending" | "success" | "rejected" = "pending";
  console.log(
    `reqStatus is ${typeof reqStatus === "string" ? '"' + reqStatus + '"' : reqStatus}`,
  );
  reqStatus = "success";
  console.log(
    `reqStatus is ${typeof reqStatus === "string" ? '"' + reqStatus + '"' : reqStatus}`,
  );
  console.log("");

  // --- Any ---
  let notSure: any = 3;
  console.log(
    `notSure is ${typeof notSure === "string" ? '"' + notSure + '"' : notSure}`,
  );
  notSure = "I'm not sure mb its 4";
  console.log(
    `notSure is ${typeof notSure === "string" ? '"' + notSure + '"' : notSure}`,
  );
  console.log("");
}

const modulToReturn: returnedModule = {
  name: "primitives",
  run,
};
export default modulToReturn;
