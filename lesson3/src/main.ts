// 1. Arrays

let stringAdd = ["one", "two", "hello"];
// string[]

let guitars = ["Stratocatster", "Les Paul", 5150];
// (string | number)[]

let mixedData = ["EVH", 1909, true];
// (string | number | boolean)[]

guitars.push(100, "100");

stringAdd.push("asdf");

let anyArr = []; // or let anyArr: any = []
let stringArr: string[] = [];

// 2. Tuples
// This is array with fixed length with typed indexes

let preciseTuple: [string, number, boolean] = ["a", 0, true];

// preciseTuple[2] = 2; // not working cause on 2 index is boolean
preciseTuple[2] = false; // just fine

// 3. Objects

let myObj: object;

myObj = []; // it's ok cause array is object
myObj = mixedData;
myObj = {};

const exampleObj = {
  name: "Zoth",
  isSindre: true,
};

// 4. Types

type Guitarast = {
  name: string;
  active: boolean;
  albums: (string | number)[];
  merried?: boolean;
};

let evh: Guitarast = {
  name: "Eddie",
  active: false,
  albums: [1984, 5150, "OU812"],
};

let jp: Guitarast = {
  name: "Jimmy",
  active: true,
  albums: ["I", "II", "IV"],
  merried: true,
};

const greetGuitarast = (guitarast: Guitarast) => {
  console.log(guitarast.name);
};

greetGuitarast(evh);
greetGuitarast(jp);

// 5. Interfaces

interface SomeInterface {
  prop1: string;
  prop2: number;
  prop3?: boolean;
}

let someInter: SomeInterface = {
  prop1: "asdf",
  prop2: 0,
  prop3: false,
};

const printInterface = (someInter: SomeInterface) => {
  console.log(someInter.prop3?.toString());
  // prop3.toString() method must be optional cause TS thinks it can be underfined
};

const printInterfaceWithNarrowing = (someInter: SomeInterface) => {
  //narrowing
  if (someInter.prop3) {
    console.log(someInter.prop3.toString());
    // here prop3.toString() can be call without optional ? operator cause of narrowing
  }
};

// 6. Enums

enum Grade {
  U, // = 1,
  D,
  C,
  B,
  A,
}

console.log(Grade.U);
console.log(Grade.A);
