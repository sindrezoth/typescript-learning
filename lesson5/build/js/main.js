"use strict";
// Type Assertion / Type Casting
// Convert to more or less specific
let a = 'hello';
let b = a; // less specific
let c = a; // more specific
let d = 'world';
let e = 'world';
// Cannot use this type of syntax in tsx files (for React)
// ------- ================= ------------
const addOrConcant = (a, b, c) => {
    if (c === 'add')
        return a + b;
    return '' + a + b;
};
let myVal = addOrConcant(2, 2, 'concat');
// TS sees no problem with that but the String is returned
let nextVal = addOrConcant(2, 2, 'concat');
// 10 as string - error 
10; // not error, but avoid that 
// ------- ================= ------------
// Dom
// Able to infer only tags, not ids, classed e.g.
const img = document.querySelector('img');
const img1 = document.querySelector('img');
const img2 = document.querySelector('img');
const img3 = document.querySelector('img'); // Here's is ok, but not working inside React (.tsx)
img === null || img === void 0 ? void 0 : img.src; // can be null
img1.src; // ! its non-null assertion 
img2.src; // 100% HTMLImageElement
const myImg = document.getElementById('#img'); // HTMLElement | null
// myImg.src // src does not exist inside HTMLElement
