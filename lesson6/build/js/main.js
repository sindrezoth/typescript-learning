"use strict";
// Classes!
class Coder {
    // public makes declaration too (do not apperaing above)
    // readonly makes property unchangeable
    constructor(name, music, age, lang, nativeOS = "linux") {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
    getAge() {
        return `I'm ${this.name} and my age is ${this.age}`;
    }
}
const Zoth = new Coder("sindrezoth", "rock", 30, "javascript");
console.log(Zoth.getAge());
// console.log(Zoth.age);
// console.log(Zoth.lang);
class WebDev extends Coder {
    constructor(computer, name, music, age, lang) {
        super(name, music, age, lang);
        this.computer = computer;
        this.computer = computer;
    }
    getLang() {
        return `I'm ${this.name} and I write ${this.lang}`;
    }
    getPrivateAge() {
        // return `I'm ${this.name} and my age is ${this.age}`;
    }
}
const Kabas = new WebDev("HP", "Kabas", "Lofi", 6, "javascript");
console.log(Kabas.getLang());
class Guitarast {
    constructor(name, instrument) {
        this.name = name;
        this.instrument = instrument;
    }
    play(action) {
        return `${this.name} plays ${action} on the ${this.instrument}`;
    }
}
const Lola = new Guitarast("Lola", "guitar");
console.log(Lola.play("Serduchka"));
class Peeps {
    static getCount() {
        return Peeps.count;
    }
    constructor(name) {
        this.name = name;
        this.name = name;
        this.id = ++Peeps.count;
    }
}
Peeps.count = 0;
const Meduz = new Peeps("Meduz");
const Kavun = new Peeps("Kavun");
const Loka = new Peeps("Loka");
console.log(`${Meduz.name} id is ${Meduz.id}`);
console.log(`${Kavun.name} id is ${Kavun.id}`);
console.log(`${Loka.name} id is ${Loka.id}`);
console.log(`Peeps.count is ${Peeps.count}`);
class Bands {
    constructor() {
        this.dataState = [];
    }
    get data() {
        return this.dataState;
    }
    set data(value) {
        if (Array.isArray(value) && value.every((e) => typeof e === "string")) {
            this.dataState = value;
            return;
        }
        else
            throw new Error("Param is not an array of strings");
    }
}
const bands = new Bands();
bands.data = ["Nirvana", "Radiohead"];
console.log(bands.data);
