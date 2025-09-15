// ---------function which return function
function myLogFunction() {
  return (str: string) => {
    console.log(str);
  };
}

const logger = myLogFunction();
logger("your string");

// -----------function creates and returns a class

function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = "";
    log(str: string) {
      this.completeLog += str + "\n";
    }
    dumpLog() {
      return this.completeLog;
    }
  };
}

const myLogger = createLoggerClass();

const data = new myLogger();

data.log("foo");
console.log(data.dumpLog());

// -------in memory database
function createSimpleMemoryDatabase<T>() {
  return class simpleMemoryDatabase {
    private db: Record<string, T> = {};

    set(id: string, value: T) {
      this.db[id] = value;
    }
    get(id: string): T {
      return this.db[id];
    }
    getObject(): object {
      return this.db;
    }
  };
}

// --------string type => <string> if use <number> then use number
const stringDB = createSimpleMemoryDatabase<string>();

const inMemoryDB = new stringDB();

inMemoryDB.set("ms", "hello");
console.log(inMemoryDB.get("ms"));
console.log(inMemoryDB.getObject());

// ---------------------more advance stuff
type Constructor<T> = new (...args: any[]) => T;

function Dumpable<T extends Constructor<{ getObject(): object }>>(base: T) {
  return class Dumpable extends base {
    dump() {
      console.log(this.getObject());
    }
  };
}

const DumpableStringDB = Dumpable(stringDB);
const inMemoryDB2 = new DumpableStringDB();

inMemoryDB2.set("jack", "hello jack");
inMemoryDB2.dump();
