export {};

namespace typeof关键字 {
  // typeof 关键字
  // 先定义类型，再出变量
  type Person = {
    name: string;
  };
  var p: Person = { name: "tony" };

  // 先有变量，再返回类型
  var p = { name: "tony" };
  type Person2 = typeof p;
}

// 索引就是key，获取索引就是可以拿到一个类型的key，并且可以通过key拿到value
namespace 索引类型查询操作符keyof {
  interface Person {
    name: string;
    age: number;
    phone: number;
  }

  //索引关键字
  var newPhone: Person["phone"] = 18701051843;
  //keyof关键字
  type PersonKey = keyof Person;
  type SamePerson = {
    [key in keyof Person]: Person[key];
  };

  function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map((n) => o[n]);
  }
  let user = { id: 1, name: "zhufeng" };
  type User = typeof user;
  const res = pick<User, keyof User>(user, ["id", "name"]);
  console.log(res);
}

namespace 映射类型 {
  // 使用in去处理定义类型中的属性
  interface Person {
    name: string;
    age: number;
    phone: number;
  }
  // 把原来的所有属性变成可选
  type PartialPerson = {
    [key in keyof Person]?: Person[key];
  };
  //关键字Partial的实现原理
  type PartialPerson2 = Partial<Person>;
}
namespace 条件类型 {
  // 条件类型，根据条件动态添加类型,使用了泛型
  interface Fish {
    name1: string;
  }
  interface Bird {
    name2: string;
  }
  interface Water {
    name3: string;
  }
  interface Sky {
    name4: string;
  }
  // 泛型就是一个函数中的变量，条件判断就是一个三元运算符
  type Condition<T> = T extends Fish ? Water : Sky;
  // 条件分发，fish肯定是拓展了fish返回 Water; bird是name2并没有拓展name1，所以返回 Sky
  // 最后的结果就是 Water | Sky
  let con1: Condition<Fish | Bird> = { name3: "water", name4: "sky" };
  // fish | bird的结果就是飞鱼，他肯定是有name1和name2的，所以只会走water
  let con2: Condition<Fish & Bird> = { name3: "water" };

  // ! 这个例子的条件判断是 Fish 和Bird分别传给了T再合并，这是因为内部的T 没有二次包装
  // ! 这就是条件分发特性
  // 如果T的使用形式是 {T} <T> T[] 或其他，那么 Fish|Bird 只能整体赋给T
  type Condition2<T> = { t: T } extends { t: Fish } ? Water : Sky;

  let con3: Condition2<Fish & Bird> = { name3: "sky" };
}

namespace 内置条件类型 {
  // ! 基于条件分发实现Diff和Filter
  type Diff<T, U> = T extends U ? never : T;
  type Filter<T, U> = T extends U ? never : T;

  // !内置条件类型
  // Exclude 从 U中获取 T 没有的属性，也就是找不同 Diff
  type T1 = Exclude<number, number | boolean>;
  // Extract 从U 中提取 T上也有的属性， 也就是找相同 Filter
  type T2 = Extract<number, number | boolean>; //等同于Extract
  // NonNullable 从传入的类型中，返回非空类型
  type T3 = NonNullable<number | null | undefined>;

  // ! 函数类型相关
  function add(x: number, y: number): number {
    return x + y;
  }
  // *ReturnType 获取函数的返回类型
  type ReturnADD = ReturnType<typeof add>;
  // *ParamsADD 获取函数的参数类型
  type ParamsADD = Parameters<typeof add>;

  // !类类型相关
  class Person {
    constructor(public name: string) {}
  }
  // 获取类的构造函数的参数类型
  type T5 = ConstructorParameters<typeof Person>;
  // 获取类的构造函数的返回值类型
  // ! 实例类型，有一些多余，其实就是他本身；因为当我们创建一个类的时候，就会自动有两个类型，

  // !当作类型来使用
  let p1: Person = {
    name: "tony",
  };

  // ! 当作值来使用
  let p2: typeof Person = Person;

  // 一个是类的类型，一个是实例的类型
  type T6 = InstanceType<typeof Person>;

  // 区分函数类型和类类型
  // * 他们唯一的不同就在与 ConstructorParameters的 T 需要是一个构造函数类型的子类型
  // * 使用了 T extends new (...args: any) => any
  type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
  type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
}

namespace 内置工具类型 {
  // 全部属性，非可选变可选
  type A = {
    name: string;
    age: number;
    loveStudy: boolean;
  };

  type Partial<T> = {
    [key in keyof T]?: T[key];
  };

  type PartialA = Partial<A>;

  // Require可选变必选
  type B = {
    name?: string;
    age?: number;
    loveStudy: boolean;
  };

  type Required<T> = {
    [key in keyof T]-?: T[key];
  };

  // !必须要使用 -?的语法，否则只能保持原样
  type PartialB = Required<B>;

  // 只读
  type ReadOnly<T> = {
    readonly [K in keyof T]: T[K];
  };

  type C = {
    name: string;
    age: number;
  };
  type ReadOnlyC = Readonly<C>;

  // ! 可选，必选和可读都是针对属性的全批量操作，如果针对单个属性有特殊要求，需要在执行工具函数前设置好

  // PICK 从传入属性中，拿到某一项返回
  // Extract 传入T 和 K, 拿到 T有的 但是K没有的

  type Person = {
    name?: string;
    age: number;
    address: string;
  };
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  // 把属性提取出来
  type PickPerson = Pick<Person, "name" | "age">;
  // 提取属性还可以做required等其他操作
  type RequiredPickPerson = Required<PickPerson>;

  // !Record 记录类型，把所有属性的值，都映射到另一个类型上并创建值
  // 表示创建了一个类型R,他的key值是string或者number，他的value值是string
  type R = Record<string | number, string>;
  var a: R = {
    name: "tony",
    age: "10",
  };
}

export {};
