// Type Assertion / Type Casting

type One = string;
type Two = string | number;
type Three = 'hello';

// Convert to more or less specific
let a: One = 'hello';
let b = a as Two; // less specific
let c = a as Three; // more specific

let d = <One>'world';
let e = <string | number>'world';
// Cannot use this type of syntax in tsx files (for React)

// ------- ================= ------------
const addOrConcant = (a: number, b: number, c: 'add' | 'concat'): number | string => {
  if(c === 'add') return a + b;
  return '' + a + b;
}

let myVal: string = addOrConcant(2,2,'concat') as string;
// TS sees no problem with that but the String is returned
let nextVal: number = addOrConcant(2,2,'concat') as number;

// 10 as string - error 
(10 as unknown) as string // not error, but avoid that 

// ------- ================= ------------
// Dom

// Able to infer only tags, not ids, classed e.g.
const img = document.querySelector('img'); 
const img1 = document.querySelector('img')!; 
const img2 = document.querySelector('img') as HTMLImageElement; 
const img3 = <HTMLImageElement>document.querySelector('img'); // Here's is ok, but not working inside React (.tsx)

img?.src // can be null
img1.src // ! its non-null assertion 
img2.src // 100% HTMLImageElement

const myImg = document.getElementById('#img'); // HTMLElement | null
// myImg.src // src does not exist inside HTMLElement
