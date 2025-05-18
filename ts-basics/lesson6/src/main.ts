// Classes!
class Coder {
  // ! makes initialization unnecessary.
  secondLang!: string;
  protected nativeOS!: string;
  // public makes declaration too (do not apperaing above)
  // readonly makes property unchangeable
  constructor(
    public readonly name: string,
    public music: string,
    private age: number,
    protected lang: string,
    nativeOS: string = "linux", // default value
  ) {
    this.name = name;
    this.music = music;
    this.age = age;
    this.lang = lang;
  }

  public getAge() {
    return `I'm ${this.name} and my age is ${this.age}`;
  }
}

const Zoth = new Coder("sindrezoth", "rock", 30, "javascript");

console.log(Zoth.getAge());
// console.log(Zoth.age);
// console.log(Zoth.lang);

class WebDev extends Coder {
  constructor(
    public computer: string,
    name: string,
    music: string,
    age: number,
    lang: string,
  ) {
    super(name, music, age, lang);
    this.computer = computer;
  }

  public getLang() {
    return `I'm ${this.name} and I write ${this.lang}`;
  }

  public getPrivateAge() {
    // return `I'm ${this.name} and my age is ${this.age}`;
  }
}

const Kabas = new WebDev("HP", "Kabas", "Lofi", 6, "javascript");

console.log(Kabas.getLang());
// console.log(Kabas.getPrivateAge());

// Interfaces!
interface Musician {
  name: string;
  instrument: string;
  play(action: string): string;
}

class Guitarast implements Musician {
  name: string;
  instrument: string;

  constructor(name: string, instrument: string) {
    this.name = name;
    this.instrument = instrument;
  }

  play(action: string) {
    return `${this.name} plays ${action} on the ${this.instrument}`;
  }
}

const Lola = new Guitarast("Lola", "guitar");
console.log(Lola.play("Serduchka"));

class Peeps {
  static count: number = 0;

  static getCount(): number {
    return Peeps.count;
  }

  public id: number;
  constructor(public name: string) {
    this.name = name;
    this.id = ++Peeps.count;
  }
}

const Meduz = new Peeps("Meduz");
const Kavun = new Peeps("Kavun");
const Loka = new Peeps("Loka");

console.log(`${Meduz.name} id is ${Meduz.id}`);
console.log(`${Kavun.name} id is ${Kavun.id}`);
console.log(`${Loka.name} id is ${Loka.id}`);
console.log(`Peeps.count is ${Peeps.count}`);

class Bands {
  private dataState: string[];

  constructor() {
    this.dataState = [];
  }

  public get data(): string[] {
    return this.dataState;
  }

  public set data(value: string[]) {
    if (Array.isArray(value) && value.every((e) => typeof e === "string")) {
      this.dataState = value;
      return;
    } else throw new Error("Param is not an array of strings");
  }
}

const bands = new Bands();
bands.data = ["Nirvana", "Radiohead"];
console.log(bands.data);
