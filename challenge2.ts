// This challenge is after 7th episode
function myForEach<T>(items: T[], callbackFn: (v: T) => void): void {
  items.reduce((acc, val) => {
    callbackFn(val);
    return undefined;
  }, undefined);
}

myForEach(["a", "b", "c"], (v) => console.log(`ForEach ${v}`));

function myFilter<T>(items: T[], callbackFn: (v: T) => boolean): T[] {
  return items.reduce(
    (acc, val) => (callbackFn(val) ? [...acc, val] : acc),
    [] as T[]
  );
}

console.log(myFilter([1, 2, 3, 4, 5, 6], (v) => v % 2 === 0));

function myMap<T, K>(items: T[], mapCallbackFn: (v: T) => K): K[] {
  return items.reduce((acc, val) => [...acc, mapCallbackFn(val)], [] as K[]);
}

console.log(myMap([1, 2, 3, 4, 5, 6], (v) => v * 10).toString());
