function printIngredient(quantity: string, ingredient: string, extra?: string) {
  console.log(`${quantity}${ingredient}`);
}
// (quantity: string, ingredient: string, extra?: string , required:string)
//never put required field after optinal bcz TS not identify the passed param is optional or required
printIngredient("1c", "fLOUR");
printIngredient("1c", "fLOUR", "something more");

interface User {
  id: string;
  info?: {
    email?: string;
  };
}
// how to call callback function when some params are optioinal
function getEmail(user: User): string {
  if (user.info) {
    return user.info.email!; // "!" - tells that Trust me, email is definitely not null/undefined here
  }
  return "";
}

//same functionality as above bt simpler way to do same
function getEmailEasy(user: User): string {
  return user?.info?.email ?? "";
}

function addWithCallback(x: number, y: number, callback?: () => void) {
  console.log([x, y]);
  callback?.(); //always make sure function exists before calling it .
}
