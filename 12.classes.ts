// public db so we can able to modify it outside of class
interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

class inMemoryDatabase implements Database {
  db: Record<string, string> = {};
  get(id: string): string {
    return this.db[id];
  }
  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

const myDB = new inMemoryDatabase();
myDB.set("foo", "bar");
myDB.db["foo"] = "baz"; //modified database value outside of class
console.log(myDB.get("foo"));

// private database so we only modify/update db inside class.
interface Database2 {
  get(id: string): string;
  set(id: string, value: string): void;
}

class inMemoryDatabase2 implements Database2 {
  private db2: Record<string, string> = {};
  get(id: string): string {
    return this.db2[id];
  }
  set(id: string, value: string): void {
    this.db2[id] = value;
  }
}

const myDB2 = new inMemoryDatabase2();
myDB.set("foo", "bar");
//myDB2.db2["foo"] = "baz"; // this will throw error as db is private
console.log(myDB.get("foo"));

// ------------------------extended class with priate propertes

interface Database3 {
  get(id: string): string;
  set(id: string, value: string): void;
}
interface persisitable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

class inMemoryDatabase3 implements Database3 {
  protected db3: Record<string, string> = {};
  get(id: string): string {
    return this.db3[id];
  }
  set(id: string, value: string): void {
    this.db3[id] = value;
  }
}

class PresistentMemoryDB extends inMemoryDatabase3 implements persisitable {
  saveToString(): string {
    return JSON.stringify(this.db3);
  }
  restoreFromString(storedState: string): void {
    this.db3 = JSON.parse(storedState);
  }
}
const myDB3 = new PresistentMemoryDB();
myDB3.set("foo", "bar");
console.log(myDB3.get("foo"));
const saved = myDB3.saveToString();
myDB3.set("foo", "db3--bar");
console.log(myDB3.get("foo"));

const myDB4 = new PresistentMemoryDB();
myDB4.restoreFromString(saved);
console.log(myDB3.get("foo"));
