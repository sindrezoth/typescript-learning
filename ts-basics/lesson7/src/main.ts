// Index Signature

// interface TransactionObj {
//   // Indexed, but no required fields is provided.
//   [index: string]: number;
// }
// interface TransactionObj {
//   // not Indexed, will not able to itterate or dynamicly get a value
//   Pizza: number;
//   Books: number;
//   Job: number;
// }
interface TransactionObj {
  // Indexed, but no required fields is provided.
  [index: string]: number;
  // Required fields
  Pizza: number;
  Books: number;
  Job: number;
}

const todaysTransaction: TransactionObj = {
  Pizza: -10,
  Books: -5,
  Job: 50,
  Zoth: 10, // can add other pros (but with indexed signature)
};

console.log(todaysTransaction.Pizza);
console.log(todaysTransaction["Books"]);

// This approach not working without indexing.
let prop: string = "Pizza";
console.log(todaysTransaction[prop]);

// As well here not working too.
const todaysNet = (transactions: TransactionObj) => {
  let n = 0;
  for (const transaction in transactions) {
    n += transactions[transaction];
  }
  return n;
};
console.log(todaysNet(todaysTransaction));

// ----------==============---------------

interface Student {
  [key: string]: string | number | number[] | undefined;
  //              cause classes are optional -^
  name: string;
  GPA: number;
  classes?: number[];
}

const student: Student = {
  name: "Doug",
  GPA: 3.14,
  classes: [100, 200],
};

// console.log(student.test) // without indexing it is the error cause test doesn't exist

console.log("Student(for in): ");
for (const key in student) {
  console.log(`\t${key}: ${student[key as keyof Student]}`);
  // pretend key as a union of types of keys of Stundet.
}

console.log("Student(map): ");
Object.keys(student).map((key) => {
  console.log(`\t${key}: ${student[key as keyof typeof student]}`);
});

const logStudentKey = (stud: Student, key: string): void => {
  console.log(`Student ${key}: ${stud[key]}`);
};

logStudentKey(student, "GPA");

// ----------==============---------------

// interface Incomes {
//   [key: string]: number;
// }

type Streams = "salary" | "snick" | "toiletPaper";

// Utility Rrecord allow add literal types to the interface
type Incomes = Record<Streams, number>;
const todayIncomes = {
  salary: 30,
  snick: -1,
  toiletPaper: -1,
};

for (const key in todayIncomes) {
  console.log(`${key} income is ${todayIncomes[key as keyof Incomes]}`);
  // anyway key need to be specified with as keyof.
}
