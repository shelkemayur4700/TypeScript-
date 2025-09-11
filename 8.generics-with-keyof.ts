// -----------PLUCKS
function plucks<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const dogs = [
  { name: "mimi", age: 10 },
  { name: "LG", age: 20 },
];

console.log(plucks(dogs, "age"));
console.log(plucks(dogs, "name"));

// ----------EVENT MAP
interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: String };
  checkout: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name]
): void {
  console.log([name, data]);
}

sendEvent("addToCart", {
  productID: "foo",
  user: "baz",
  quantity: 1,
  time: 20,
});

sendEvent("checkout", { time: 20, user: "boob" });
