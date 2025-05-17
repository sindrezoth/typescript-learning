import "./style.css";
import { exportedModule } from "./types";
import primitives from "./primitives";
import arrays from "./arrays";

function runModule(module: exportedModule) {
  console.log(`${module.name} is logged: `);
  module.run();
}

runModule(arrays);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Typescript practical course!</h1> 
    <p>Outputs must be on the console <br><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd><br>or<br><kbd>F12</kbd> -> Console tab</kbd></p>
  </div>
`;
