// 复杂类型，类型推导

var name = "tony";

// name = 10;

// 包装类型,  调用基础类型的方法，会被包装成一个对象类型再去调用，自动装箱
var name = "tony";
name.toString();
// 等价于 new String("tony").toString()

var bool1: boolean = true;
var bool2: boolean = Boolean(1); //返回了一个基础类型，自动拆箱
// var bool3: boolean = new Boolean(true); //返回了一个对象类型，不会拆箱

// 联合类型 使用 | 操作符号
let obj: number | string;

// Variable 'obj' is used before being assigned
// 使用 !.非空断言可以来解决这个问题
// 只能使用number和string的公有方法
console.log(obj!.toString());
obj = 2;
console.log(obj.toFixed(1)); //赋值之后，推断为数字，可以使用toFixed
obj = "string";
console.log(obj.toLowerCase()); //赋值之后，推断为字符串，可以使用 toLowerCase()

// 类型断言
// 可以在使用联合类型之后更方便的使用方法，而不用先赋值进行类型的推导
let obj1: number | string;

// 非空断言配合as
console.log((obj1! as number).toFixed());
console.log((obj1! as string).toLocaleUpperCase());

// 双重断言，可以让对象支持boolean
// ! 一般不会这么做
console.log(((obj1! as any) as boolean).valueOf());

// 字面量类型和类型字面量

const up = "up"; //字面量类型 up就是 "up"类型的，const支持

// *字面量类型和联合类型搭配,可以实现一个枚举的效果
type Direction = "UP" | "DOWN";
var a: Direction = "UP";

enum DirectionEnum {
  UP,
  DOWN,
}
var b = DirectionEnum.DOWN;

// 类型字面量，看起来就像js中的对象
type Person = {
  name: string;
  age: number;
};

var p: Person = {
  name: "tony",
  age: 29,
};
console.log(p);

// 基本类型和字面量类型 与 联合类型的组合使用
// t1类型的值 只能是1 2 或者是3  t2类型的值可以是字符串也是数字
type t1 = 1 | 2 | 3;
type t2 = string | number;

// 函数
// 在js中，定义一个函数的方式主要有两种 函数声明式和函数表达式 以及箭头函数，同样ts中主要是这三种
// 1. 函数定义方式 声明参数和返回值的类型
function defineFn1(name: string): void {
  console.log(name);
}

// 2. 函数表达式，右侧的函数中，可以给参数返回值制定类型，不指定的话会进行类型推导
type DefineFn = (name?: string) => void;
var defineFn2: DefineFn = function (name) {
  console.log(name);
};
defineFn2("xx");
// 3. 箭头函数 和函数表达式基本一致
var add = (n1: number, n2: number): number => {
  return n1 + n2;
};

// ! 可以添加默认参数，但是不能放在函数类型的表达式定义上，需要放在实现上
// A parameter initializer is only allowed in a function or constructor implementation.ts(2371)
// ! 如果参数类型是必须传的，不传入参数就会报错。第一种解决方式是设置初始值，第二种是函数类型定义的时候修改参数为可选

// *函数重载和联合类型
// 我们希望一个函数支持传入两个参数，都是number或者string的类型

// 函数重载就是基于参数的类型，返回不同的数据
function fn(a: any, b: any): any {
  if (typeof a === "string") {
    console.log(`${a}是string类型`);
  } else if (typeof a === "number") {
    console.log(`${a}number`);
  }
}

// ! 为了表达上述的行为，ts提供了函数重载的特性，提前告知，应该有那些

// 给原来的函数添加了类型系统，提前定义好了两种情况，必须同时string或者同时number
function fnOverload(a: string, b: string): void; //重载情况1
function fnOverload(a: number, b: number): void; //重载情况2
function fnOverload(a: any, b: any): any {
  // ! 这一行不属于重载
  if (typeof a === "string") {
    console.log(`${a}是string类型`);
  } else if (typeof a === "number") {
    console.log(`${a}number`);
  }
}
// fnOverload("11", 22);  // 只能支持同数字或者同number
fnOverload(11, 22);
fnOverload("str1", "str2");

// *如果情况简单 的话，两个参数之间的类型没有关联，可以使用联合类型
function fnUnion(a: number | string, b: number | string) {
  if (typeof a === "string") {
    console.log(`${a}是string类型`);
  } else if (typeof a === "number") {
    console.log(`${a}number`);
  }
}
fnUnion("11", 22); // 参数之间的类型，没有关联，只需要满足自己的定义即可

export {};
