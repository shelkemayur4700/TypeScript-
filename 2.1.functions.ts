// -----function which return number
function addNumbers(a: number, b: number): number {
  return a + b;
}

export default addNumbers;
// ----------named export function which returns string
export const addStrings = (str1: string, str2: string): string =>
  `${str1} ${str2}`;

export const format = (title: string, param: string | number): string =>
  `${title}${param}`;
// ------- function which does not returnanything
export const printFormat = (title: string, param: string | number): void => {
  console.log(format(title, param));
};
// -------function which return promise
export const fetchData = (url: string): Promise<string> =>
  Promise.resolve(`Data from ${url}`);
// --function with multiple args and collaps then into single array
function introduce(salutaion: string, ...names: string[]): string {
  return `${salutaion}${names.join(" ")}`;
}
// -how TS checks types at compile time
// and how JS checks types at runtime
export function getName(user: { first: string; last: string }): string {
  return `${user?.first ?? "first"} ${user?.last ?? "last"}`;
}
