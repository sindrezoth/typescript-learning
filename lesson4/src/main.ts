// Types Aliases

type stringOrNumber = string | number;

type stringOrNumberArray = stringOrNumber[];

type Guitarist = {
  name?: string;
  active: boolean;
  albums: stringOrNumberArray;
};

type UserId = stringOrNumber;
let userId: UserId;
userId = "123";
userId = 123;

let a: Guitarist = {
  name: "name",
  active: false,
  albums: ["123", 1123, "123"],
};

// Literal Types

let myName: "sindrezoth";

let userName: typeof myName | "Kabas" | "Law" | "Meduz";

userName = "Kabas";

// Functions

const add = (a: number, b: number): number => a + b;
const sub = (a: number, b: number): number => a - b;

const logMsg = (message: any) => {
  console.log(message);
};
// void function

logMsg("Hello!");
logMsg(true);
logMsg(add(2, 3));

// Function Type
type MathFunc = (a: number, b: number) => number;
let mult: MathFunc = (a, b) => a * b;
logMsg(mult(5, mult(3, 1)));

// Function Interface
interface MathFunc2 {
  (a: number, b: number): number;
}
let dev: MathFunc2 = (a, b) => a / b;
logMsg(dev(6, mult(2, 3)));

// Optional parameters
function Line(a: number = 15, b: number, c?: number): number {
  // Typeguard!
  if (c !== undefined) {
    return a + b * c;
  }

  return a + b;
}

function Line1(a: number, b: number, c: number = 1): number {
  // Cause of default on "c" parameter it will be ok without typeguard
  return a + b * c;
}

logMsg(Line(1, 2, 3));
logMsg(Line(1, 2));
logMsg(Line(undefined, 2, 3)); // passed in undefined for ignoring params with default values

logMsg(Line1(1, 2, 3));
logMsg(Line1(1, 2));

// Rest Parameters

const total = (a: number, ...nums: number[]): number => {
  return a + nums.reduce((acc, n) => acc + n);
};

logMsg(total(1, 1, 2, 3, 5, 8, 13, 21));

// NEVER Type
const createError = (errMsg: string) => {
  throw new Error(errMsg);
  // throwing Error create an never type return
};

const infinite = () => {
  let i: number = 1;
  while (true) {
    i++;
  }
  // infinite loops create never as well
};

// custom type guard
const isNumber = (value: any): boolean => {
  return typeof value === "number" ? true : false;
};

// use of the never type
const numberOrString = (value: number | string): string => {
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  return createError("This is return never");
};
