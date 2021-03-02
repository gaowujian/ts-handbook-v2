// 形状和行为的抽象
interface Speakable {
  name: string; //形状
  speak(): void; //行为
}

// !重名接口会合并，不会冲突
interface Speakable {
  eat(): void;
}

console.log("===============手动创建满足接口的字面量值");

var speakMan: Speakable = {
  name: "speakMan",
  speak: function () {
    console.log(`${this.name} can speak`);
  },
  eat: function () {
    console.log(`${this.name} can eat`);
  },
};
speakMan.speak();
speakMan.eat();

console.log("================类实现接口");

class Person implements Speakable {
  constructor(public name: string) {}
  speak(): void {
    console.log(`${this.name} can speak`);
  }
  eat(): void {
    console.log(`${this.name} can eat`);
  }
}

var p = new Person("tony");
p.speak();
p.eat();

console.log("================接口中的属性");
interface Data {
  readonly prop: number; //只读属性
  name: string;
  [key: string]: any; // !任意属性 注意这里使用的是any，如果用number或者string会和其他属性冲突
}

var data: Data = {
  prop: 333,
  name: "tony",
  age: 20,
};

namespace 函数类型接口 {
  console.log("================函数类型接口");

  // 接口是用来描述形状和行为的

  interface Discount {
    (price: number): number;
  }
  var discount1: Discount = function (price: number): number {
    return price;
  };

  // ! 这里也可以用type来定义函数
  // !一般来说，能用interface实现，就用interface，如果不能就用type
  type Discount2 = (price: number) => number;
  var discount2: Discount2 = function (price) {
    return price;
  };

  //   *如果有new说明是描述类的构造函数，没有new说明是描述一个普通函数
  //   !用来描述一个类的类型
  interface WithNameClass {
    new (name: string): void;
  }

  //   Animal作为一个类也有自己的类型，那就是构造函数

  function createAnimal(Animal: WithNameClass, name: string) {
    return new Animal(name);
  }

  class Animal {
    constructor(public name: string) {}
  }
  var animal = createAnimal(Animal, "animal");
  console.log(animal);

  //   ! 区分函数类型接口和属性值是函数的接口

  interface Type1 {
    (name: string): void; //中间是冒号
    prop: string; //函数属性
  }
  interface Type2 {
    read: (name: string) => void; //中间是箭头
    prop: string; //对象属性
  }
  function AnFn(name: string) {}
  AnFn.prop = "string";
  var t1: Type1 = AnFn;
  console.log("t1:", t1);

  var t2: Type2 = {
    read: function (name: string) {},
    prop: "string",
  };
  console.log("t2:", t2);
}

namespace 类默认有两种类型 {
  console.log("================类默认有两种类型");

  // ! 当声明一个类之后 我们一共有两种类型
  //   1. 实例的类型
  //   2. 实例类型的类型
  class Person {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  //   冒号后面的都是类型， 等号后面的都是值
  //   第一种
  var p: Person = new Person("tony");
  //   第二种
  //  ! 注意ts中的typeof 和 js中的typeof 不是一回事
  var p2: typeof Person = Person;
  console.log("p2:", p2);
}
