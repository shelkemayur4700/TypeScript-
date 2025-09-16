type Name = {
  first: string;
  last: string;
};
// --------------------function based approach
function addFullName(name: Name): Name & {
  fullName: string;
} {
  return {
    ...name,
    fullName: `${name.first}${name.last}`,
  };
}

function permuteRows<T extends (...args: any) => any>(
  iteratorFun: T,
  data: Parameters<T>[0][]
): ReturnType<T>[] {
  return data.map(iteratorFun);
}

console.log(permuteRows(addFullName, [{ first: "jack", last: "doe" }]));

// -----------------class based approach


