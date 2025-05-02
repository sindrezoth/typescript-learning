"use strict";
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
let stringArr = [];
// 2. Tuples
// This is array with fixed length with typed indexes
let preciseTuple = ["a", 0, true];
// preciseTuple[2] = 2; // not working cause on 2 index is boolean
preciseTuple[2] = false; // just fine
// 3. Objects
let myObj;
myObj = []; // it's ok cause array is object
myObj = mixedData;
myObj = {};
const exampleObj = {
    name: "Zoth",
    isSindre: true,
};
let evh = {
    name: "Eddie",
    active: false,
    albums: [1984, 5150, "OU812"],
};
let jp = {
    name: "Jimmy",
    active: true,
    albums: ["I", "II", "IV"],
    merried: true,
};
const greetGuitarast = (guitarast) => {
    console.log(guitarast.name);
};
greetGuitarast(evh);
greetGuitarast(jp);
let someInter = {
    prop1: "asdf",
    prop2: 0,
    prop3: false,
};
const printInterface = (someInter) => {
    var _a;
    console.log((_a = someInter.prop3) === null || _a === void 0 ? void 0 : _a.toString());
    // prop3.toString() method must be optional cause TS thinks it can be underfined
};
const printInterfaceWithNarrowing = (someInter) => {
    //narrowing
    if (someInter.prop3) {
        console.log(someInter.prop3.toString());
        // here prop3.toString() can be call without optional ? operator cause of narrowing
    }
};
// 6. Enums
var Grade;
(function (Grade) {
    Grade[Grade["U"] = 0] = "U";
    Grade[Grade["D"] = 1] = "D";
    Grade[Grade["C"] = 2] = "C";
    Grade[Grade["B"] = 3] = "B";
    Grade[Grade["A"] = 4] = "A";
})(Grade || (Grade = {}));
console.log(Grade.U);
console.log(Grade.A);
