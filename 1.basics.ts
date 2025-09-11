let userName: string = "mayur";
let hasloggedIn: boolean = true;

userName = "mayur";
console.log(userName);

let myNumber: number = 10; //number

let myRegex: RegExp = /foo/; //regex

const names: string[] = userName.split(""); //array

const myVal: Array<number> = [1, 2, 3]; //another way of array

// ---- 1.way to use objects
const person: { first: string; last: string; cool?: boolean } = {
  first: "Jhon",
  last: "doe",
  cool: true,
}; // objects

// --------- 2.write interface so that no need to change everywhere
interface Person {
  first: string;
  last: string;
  cool?: boolean;
}
const person2: Person = {
  first: "Jhon",
  last: "doe",
  cool: true,
}; // objects

// ------object as maps

const ids: Record<number, string> = {
  10: "a",
  20: "b",
};
ids[30] = "c";
if (ids[30] === "A") {
  //if this is number then it will throw error
}

// ------for loop
for (let i = 0; i < 10; i++) {
  //no need to do this let i:number
  console.log(i); //TS infer type
}

// -----for each and maps

[1, 2, 3].forEach((d) => console.log(d)); // no need to do d:number in callback

const output = [4, 5, 6].map((n) => n * 10);
console.log(output); //no need to typecast bcz TS knows array ele type is num
// so it will return array of type nums

const output2: string[] = [4, 5, 6].map((n) => `${n * 10}`);
console.log(output2); //but we type caseted output as number array but
// ele type is string so it will throw error.
