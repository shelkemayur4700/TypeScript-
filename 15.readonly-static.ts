class doggy {
  constructor(public name: string, public age: number) {}
}

const lgg = new doggy("LG", 12);
lgg.name = "Tushar";
console.log(lgg.name);

// -----------readonly

class catty {
  constructor(public readonly name: string, public readonly age: number) {}
}

const bfoo = new catty("LG", 12);
// bfoo.name = "Tushar";   // throw error it is readonly property.
console.log(bfoo.name);

// -------------static 

// pending this 
