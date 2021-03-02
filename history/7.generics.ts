// 开始讲解泛型

// 1. 实现类型的动态传入，函数调用之前，并不知道参数是什么类型
// 2. 实现参数之间类型的绑定
// 3. 泛型可以传入任意类型，但是我们也希望对这些类型有些限制，
// 比如有哪些属性例如 length，这时候需要extends关键字
// 4.如果我想要一个数据，这个数据有length属性，那么我们需要接口, 如果我们还想限制

namespace 泛型和类 {
  //  泛型和类
  // factory是一个支持泛型的函数
  // 参数类型是一个构造函数，返回类型T,同时这个类还有一个属性值是age，值只能是字符串字面量10
  function factory<T>(type: { new (): T; age: 10 }): T {
    return new type(); // This expression is not constructable.
  }

  class Person {
    static age: 10 = 10;
    constructor() {}
  }

  var p = factory<Person>(Person);
  console.log(p);
}

namespace 泛型和接口 {
  // 我们想要一个函数来处理相加的操作，给这样一个函数制定一个接口

  interface Calculate {
    <T>(a: T, b: T): T;
  }
  //   由于不是所有类型都能支持 相加的操作，所以就会报错
  //   !在定义接口，和使用接口的时候，都要一直添加T, 不像普通的类型一样，可以进行类型推导
  const add: Calculate = function <T>(a: T, b: T): T {
    return a;
  };
  add<number>(1, 2);
}

namespace 泛型接口 {
  interface Calculate<T> {
    <U>(a: T, b: T): U;
  }

  // 在定义函数的时候确定类型
  const add: Calculate<number> = function <U>(a: number, b: number): U {
    return a as any;
  };
  // 在调用函数的时候确定类型
  add<string>(1, 2);
}

namespace 泛型约束 {
  console.log("===============泛型约束 extends");
  //   !extends 在这里表示的是约束，并不表示继承关系，约束是约束的形状，只要你满足我的形状
  // 我不会计较你是如何变过来的，也不关心继承关系

  // 知识点：泛型接口和默认类型
  interface withLength<T = number> {
    length: T;
  }
  // 知识点 泛型约束
  function printLength<T extends withLength>(param: T) {
    console.log(param.length);
  }
  // 知识点 类型推论，如果不传入类型
  printLength("10");
  // 知识点 鸭子类型，只要有length就可以
  const obj = {
    length: 20,
  };
  type Obj = typeof obj;
  printLength<Obj>(obj);

  // ! 错误1 Type 'number' does not satisfy the constraint 'withLength<number>'.
  //   如果制定了泛型类型值，那么报错的话，会先报如何没有满足 反省约束
  //   printLength<number>(10);

  // ! 错误2 Argument of type 'number' is not assignable to parameter of type 'withLength<number>'
  //   如果使用了类型推论，T就成了number类型，所以number类型不能赋给一个反省接口类型
  //   printLength(10);
}

export {};
