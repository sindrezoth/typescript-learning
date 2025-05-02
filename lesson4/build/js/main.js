"use strict";
// Types Aliases
let userId;
userId = "123";
userId = 123;
let a = {
    name: "name",
    active: false,
    albums: ["123", 1123, "123"],
};
// Literal Types
let myName;
let userName;
userName = "Kabas";
// Functions
const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const logMsg = (message) => {
    console.log(message);
};
// void function
logMsg("Hello!");
logMsg(true);
logMsg(add(2, 3));
let mult = (a, b) => a * b;
logMsg(mult(5, mult(3, 1)));
let dev = (a, b) => a / b;
logMsg(dev(6, mult(2, 3)));
// Optional parameters
function Line(a = 15, b, c) {
    // Typeguard!
    if (c !== undefined) {
        return a + b * c;
    }
    return a + b;
}
function Line1(a, b, c = 1) {
    // Cause of default on "c" parameter it will be ok without typeguard
    return a + b * c;
}
logMsg(Line(1, 2, 3));
logMsg(Line(1, 2));
logMsg(Line(undefined, 2, 3)); // passed in undefined for ignoring params with default values
logMsg(Line1(1, 2, 3));
logMsg(Line1(1, 2));
// Rest Parameters
const total = (a, ...nums) => {
    return a + nums.reduce((acc, n) => acc + n);
};
logMsg(total(1, 1, 2, 3, 5, 8, 13, 21));
// NEVER Type
const createError = (errMsg) => {
    throw new Error(errMsg);
    // throwing Error create an never type return
};
const infinite = () => {
    let i = 1;
    while (true) {
        i++;
    }
    // infinite loops create never as well
};
// custom type guard
const isNumber = (value) => {
    return typeof value === "number" ? true : false;
};
// use of the never type
const numberOrString = (value) => {
    if (typeof value === "string")
        return "string";
    if (typeof value === "number")
        return "number";
    return createError("This is return never");
};
