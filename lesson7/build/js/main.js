"use strict";
// Index Signature
const todaysTransaction = {
    Pizza: -10,
    Books: -5,
    Job: 50,
    Zoth: 10, // can add other pros (but with indexed signature)
};
console.log(todaysTransaction.Pizza);
console.log(todaysTransaction["Books"]);
// This approach not working without indexing.
let prop = "Pizza";
console.log(todaysTransaction[prop]);
// As well here not working too.
const todaysNet = (transactions) => {
    let n = 0;
    for (const transaction in transactions) {
        n += transactions[transaction];
    }
    return n;
};
console.log(todaysNet(todaysTransaction));
const student = {
    name: "Doug",
    GPA: 3.14,
    classes: [100, 200],
};
// console.log(student.test) // without indexing it is the error cause test doesn't exist
console.log("Student(for in): ");
for (const key in student) {
    console.log(`\t${key}: ${student[key]}`);
    // pretend key as a union of types of keys of Stundet.
}
console.log("Student(map): ");
Object.keys(student).map((key) => {
    console.log(`\t${key}: ${student[key]}`);
});
const logStudentKey = (stud, key) => {
    console.log(`Student ${key}: ${stud[key]}`);
};
logStudentKey(student, "GPA");
const todayIncomes = {
    salary: 30,
    snick: -1,
    toiletPaper: -1,
};
for (const key in todayIncomes) {
    console.log(`${key} income is ${todayIncomes[key]}`);
    // anyway key need to be specified with as keyof.
}
