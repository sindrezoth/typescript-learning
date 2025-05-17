import { exportedModule } from "./types";

function run() {
  let prices: number[] = [100, 23, 5];
  console.log(`prices is array: ${Array.isArray(prices)}`);
  console.log("prices:", prices);
}

const moduleToExport: exportedModule = {
  name: "arrays",
  run,
};

export default moduleToExport;
