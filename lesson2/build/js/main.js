"use strict";
// Primitives
let myName = "sindrezoth";
let meaningOFLife;
let isLoading;
meaningOFLife = 42;
isLoading = false;
let album;
album = myName;
album = meaningOFLife;
album = isLoading;
// Union type
let someUNION;
someUNION = meaningOFLife;
someUNION = myName;
// Function
const sum = (a, b) => {
    return a + b;
};
const sub = (a, b) => {
    return a + b;
};
console.log(`myName: ${myName}`);
console.log(`meaningOFLife: ${meaningOFLife}`);
console.log(`isLoading: ${isLoading}`);
console.log(sum(3.1415, myName));
console.log(sub(5, meaningOFLife));
