// Generics in TypeScript are basically "type variables" — placeholders
//  for a type that you’ll decide later when you use the function/class/interface.

function simpleState<T>(initial: T): [() => T, (v: T) => void] {
  let str: T = initial;
  return [
    () => str,
    (v: T) => {
      str = v;
    },
  ];
}

const [st1get, st1set] = simpleState(10);
console.log(st1get());
st1set(62);
console.log(st1get());

const [st2get, st2set] = simpleState<string | null>(null);
console.log(st2get());
st2set("str");
console.log(st2get());

// ---------checkout below code to understand generics

// function identity<T>(value: T): T {
//   return value;
// }

// let num = identity(10);     // num: number ✅
// let str = identity("Hi");   // str: string ✅

// num.toFixed(2);  // ✅ Works (TS knows num is number)
// str.toUpperCase(); // ✅ Works (TS knows str is string)

// You call identity(10).
// TS sees 10 is a number.
// It replaces T with number.
// → So identity<T>(value: T): T becomes identity<number>(value: number): number.
// You call identity("Hi").
// TS sees "Hi" is a string.
// It replaces T with string.
// → So identity<T>(value: T): T becomes identity<string>(value: string): string.

interface Rank<rankItem> {
  item: rankItem;
  rank: number;
}

function ranker<rankItem>(
  items: rankItem[],
  rank: (v: rankItem) => number
): rankItem[] {
  const ranks: Rank<rankItem>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => a.rank - b.rank);

  return ranks.map((rank) => rank.item);
}

interface Pokemon {
  name: string;
  hp: number;
}
const pokemon: Pokemon[] = [
  {
    name: "pappu",
    hp: 20,
  },
  { name: "appa", hp: 50 },
];

const ranks = ranker(pokemon, ({ hp }) => hp);
console.log(ranks);
