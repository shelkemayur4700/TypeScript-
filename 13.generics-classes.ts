// ------------------not getting anything 
interface Database<T, K> {
  get(id: K): T;
  set(id: K, value: T): void;
}
interface persisitable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

type DBkeyType = string | number | symbol;
class inMemoryDatabase<T, K extends DBkeyType> implements Database<T, K> {
  protected db: Record<K, T> = {} as Record<K, TextDecoder>;
  get(id: K): T {
    return this.db[id];
  }
  set(id: K, value: T): void {
    this.db[id] = value;
  }
}

class PresistentMemoryDB<T, K extends DBkeyType>
  extends inMemoryDatabase<T, K>
  implements persisitable
{
  saveToString(): string {
    return JSON.stringify(this.db);
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDB = new PresistentMemoryDB<number, string>();
myDB.set("foo", 20);
console.log(myDB.get("foo")); // bar

const saved = myDB.saveToString();

myDB.set("foo", 22);
console.log(myDB.get("foo")); // db3--bar

const myDB2 = new PresistentMemoryDB<number, string>();
myDB2.restoreFromString(saved);
console.log(myDB2.get("foo")); // bar
