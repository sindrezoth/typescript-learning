// Primitives
let myName: string = "sindrezoth";
let meaningOFLife: number;
let isLoading: boolean;

meaningOFLife = 42;
isLoading = false;

let album: any;
album = myName;
album = meaningOFLife;
album = isLoading;

// Union type
let someUNION: string | number;

someUNION = meaningOFLife;
someUNION = myName;

// Function
const sum = (a: number, b: string) => {
  return a + b;
};

const sub = (a: number, b: number): number => {
  return a + b;
};

console.log(`myName: ${myName}`);
console.log(`meaningOFLife: ${meaningOFLife}`);
console.log(`isLoading: ${isLoading}`);

console.log(sum(3.1415, myName));
console.log(sub(5, meaningOFLife));
