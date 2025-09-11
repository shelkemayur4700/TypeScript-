// --------------------------------enums
// const beforeLoad = "beforeLoad";
// const loading = "loading";
// const loaded = "loaded";

enum loadingState {
  beforeLoad = "beforeLoad",
  loading = "loading",
  loaded = "loaded",
}

const isLoading = (state: loadingState) => state === loadingState.loaded;

console.log(isLoading(loadingState.loaded));
//  -----------------enums inside map use like a key in map

const englishState = {
  [loadingState.loaded]: "data is Loaded",
};

// --------------Literal Types
// This variable can only be this exact value
// like below - dice can accept any number
function rollDice1(dice: number) {}
//by using literal type we can only accept exact values
// below using literal
function rollDice(dice: 1 | 2 | 3): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5) + 1;
  }
  return pip;
}

// console.log(rollDice(4)); //this will throw error

// ----------String literal type

function sendEvent(name: "addToCart", data: { productId: number }): void;
function sendEvent(name: "checkout", data: { cartCount: number }): void;
function sendEvent(name: string, data: unknown): void {
  console.log(`${name} ${JSON.stringify(data)}`);
}
sendEvent("addToCart", { productId: 12121 });
