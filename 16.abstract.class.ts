abstract class StreetFighter {
  constructor() {}
  move() {}
  fight() {
    console.log(`attack ${this.name} with ${this.getSpecialAttack()}`);
  }

  abstract getSpecialAttack(): string;
  abstract get name(): string;
}

class Ryu extends StreetFighter {
  getSpecialAttack(): string {
    return "Hadoken";
  }
  get name(): string {
    return "ryu";
  }
}

const ryu = new Ryu();
// console.log(ryu.getSpecialAttack());
ryu.fight();

class kingmaker extends StreetFighter {
  getSpecialAttack(): string {
    return "group";
  }
  get name(): string {
    return "kingmaker";
  }
}


const king = new kingmaker();
// console.log(ryu.getSpecialAttack());
king.fight();