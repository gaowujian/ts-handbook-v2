export {};

// 兼容性指的是，两个值所属的类型是否兼容。判断是否兼容就是看后一个类型有的属性是不是能够全部覆盖第一个
// 如果说接口兼容性，那就是两个不同接口的数据，看是否能来回赋值
// 如果说是函数兼容性，那就看两个函数类型的数据，看是否能来会赋值
// ! 口诀：参选父，返选子。父指的是父类型，子指的是子类型。父类型特性少，子类型特性多

// a = b 能兼容的根本在于 a有的东西，b必须可以给，只能多不能少
// 基础数据类型
// a 是联合类型 可以是 10 或者20
// b 是数字字面量 只能是20
// 所以b满足a的条件就可以成功，反之不可以

// let a: string | number;
// let b: number = 20;

namespace 接口兼容性 {
  interface Data {
    name: string;
    age: number;
  }
  let data: Data;

  //  !  Object literal may only specify known properties,
  // !  and 'detail' does not exist in type 'Data
  // 对象字面量只能表示已有的属性，不能多也不能少

  interface DetailData {
    name: string;
    age: number;
    detail: string;
  }
  let detailData: DetailData = {
    name: "tony",
    age: 18,
    detail: "xx",
  };
  //可多不可少
  data = detailData;
  //   detailData = data;

  // 可多不可少
  function getData(data: DetailData): void {}
  // getData(data);
}

namespace 类的兼容性 {
  class Animal {
    name: string | number;
  }
  class Pig {
    name: number;
    age: number;
  }
  var a = new Animal();
  var b = new Pig();
  a = b; // b可以赋值给a，因为a有一个属性，b有两个属性, 和继承没有关系
  //   b = a; // a不能赋给b，因为b的类型是Pig需要两个属性，但是a是Animal类型只有一个属性
}

namespace 函数兼容性 {
  function add(a: number, b: number): void {}
  type Func = typeof add;
  // ! 函数来回赋值的兼容性包括 参数和返回值, 分析参数的时候还要考虑个数和继承关系
  // * 参数，只能少不能多，因为我定义好了函数，你多给了我参数我处理不了，但是少给了 我还能处理
  // * 返回值 和接口兼容性一样， 只能多不能少，
  let fn1: Func = function () {};
  let fn2: Func = function (a: number) {};
  let fn3: Func = function (a: number, b: number) {};
  //   无法处理，失败
  //   let fn4: Func = function (a: number, b: number, c: number) {};
  function minus(): { data: string } {
    return { data: "str" };
  }
  type Func2 = typeof minus;
  let fn5: Func2 = function () {
    return { data: "xxx" };
  };
  let fn6: Func2 = function () {
    return { data: "xxx", xxx: "yyy" };
  };
  // 规定的细节，没有返回，失败
  //   let fn7: Func2 = function () {
  //     return {};
  //   };

  // ! 函数的参数可以传参数的父类或者本身，返回值可以返回本身或者子类
  // * 理解 我可以处理 nb的，不nb的也能处理，但是比我还nb的子类，我不能处理
  // * 在返回值的时候，我可以传递自己，但是我也可以丰富自己的细节，返回更多，
  // * 如果我返回的比较少，别人用的时候可能会缺少信息，不安全
}

namespace 泛型兼容性 {
  interface Empty<T> {}
  let a: Empty<string>;
  let b!: Empty<number>; //非空断言
  a = b; //{} 和 {} 兼容

  interface NotEmpty<T> {
    data: T;
  }
  let x: NotEmpty<string>;
  let y!: NotEmpty<number>; //非空断言
  //   x = y; // {data:string} 和 {data:number} 不兼容
}

namespace 基本类型兼容性 {
  //对于基本类型，父类型就是 多个union，更加大度。子类型就是 union较少，更加明确
  type Callback = (a: number | string) => number | string;
  // *理解当有人想使用Callback类型的函数的时候，我希望传入的数更宽泛，你不能比你说的处理的还少，你还说
  // 你只能返回number|string，那我使用你的时候，我就只能期待更小的范围，而不能出圈
  var fn: Callback = function (a: number | string | undefined): number {
    return 10;
  };
}
