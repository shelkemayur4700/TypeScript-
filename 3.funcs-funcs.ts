// --write a callback in TS
export function printToFile(text: string, callback: () => void): void {
  console.log(text);
  callback();
}

// --calbback with arguments
export function arrayMutate(
  numbers: number[],
  mutate: (v: number) => number
): number[] {
  return numbers.map(mutate);
}
console.log(arrayMutate([1, 20, 3], (v) => v * 10));

//  -- can make seperate type for callback function
export type MutateFunction = (v: number) => number;

export function arrayMutate2(
  numbers: number[],
  mutate: MutateFunction
): number[] {
  return numbers.map(mutate);
}

console.log(arrayMutate([1, 20, 3], (v) => v * 10));

// -------function that returns function

export type adderFunction = (v: number) => number; //function return type is function

export function createAdder(num: number): adderFunction {
  return (val: number) => num + val;
}

const addone = createAdder(1);
console.log(addone(55));
