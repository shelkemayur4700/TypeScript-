// readonly utility in TS
// 1. make selective property readonly
interface Cat {
  readonly name: string; //can make each ele readonly
  breed: string;
}
// 2.make complete object as readonly
type ReadonlyCat = Readonly<Cat>; // either make type like this
//use in function like below
function makeCat1(name: string, breed: string): ReadonlyCat {
  return {
    name,
    breed,
  };
}

// 2.1  you can directly use like below no need to create type as well
function makeCat(name: string, breed: string): Readonly<Cat> {
  return {
    name,
    breed,
  };
}

const usul = makeCat("Usul", "Tabby");
 usul.name = "Piter";

// -----------use of readoly around Tuple

function makeCoordinate(
  x: number,
  y: number,
  z: number
): readonly [number, number, number] {
  //this above readonly make response readonly not able to update that
  return [x, y, z];
}

const c1 = makeCoordinate(10, 20, 30);
c1[0] = 40; //this will throw error

// ---------------cosnt with premitive data Types 
const x = 10;
x = 20; // ❌ Error (can't reassign primitive)

// ------------cosnt with objects 
const user = { name: "Alice", age: 25 };

user.age = 30;   // ✅ Allowed (can modify property)
user = { name: "Bob", age: 40 }; // ❌ Error (can't reassign object)

// ---------array with const  
const nums = [1, 2, 3];

nums.push(4);   // ✅ Allowed
nums[0] = 99;   // ✅ Allowed
nums = [7, 8, 9]; // ❌ Error (can't reassign array)

// ------------tuple with const 
const tuple: [number, string] = [1, "hi"];

tuple[0] = 42;     // ✅ Allowed
tuple[1] = "bye";  // ✅ Allowed
tuple = [2, "ok"]; // ❌ Error (can't reassign tuple)

// ------------make it immutable 
const settings = { theme: "dark", lang: "en" } as const;
settings.theme = "light"; // ❌ Error (read-only)

const colors = ["red", "green"] as const;
colors.push("blue"); // ❌ Error (read-only)
