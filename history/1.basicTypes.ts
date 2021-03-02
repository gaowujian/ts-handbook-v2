// 分清楚 Number是 js中的数据类型
// number是ts中的数据类型
const num: number = 10;
const name: string = "tony";
console.log(name);

// 数组类型
const numArr1: number[] = [1, 2, 3];
const numArr2: Array<number> = [1, 2, 3];

// 元组，固定长度，类型不需要一致的数组
const tuple: [number, string] = [1, "str"];

enum Gender {
  BOY,
  GIRL,
}
console.log(Gender.BOY);
console.log(Gender[0]);

// const a: HTMLElement | null = document.getElementById("a");
// // !. 非空断言  告诉ts他一定是不会为空的, 不用帮我操心
// a!.style.color = "red";
// console.log(a);

let b: undefined | number | null;
b = null;

// never 表示一个值是不可能会出现的

// function neverFn(): never {
//   throw new Error("绝对不会执行");
//   console.log("never function");
// }
// neverFn();

// 类型保护
function fn(obj: number | string) {
  console.log(obj.toString()); // 这里只能使用 公有的方法
  if (typeof obj === "number") {
    obj.toFixed(); //可以使用数字上的方法
  } else if (typeof obj === "string") {
    obj.toLocaleLowerCase(); //可以使用字符串上的方法
  } else {
    console.log(typeof obj); //这时候obj是 never类型，因为不可能到这里
  }
}

// void表示没有任何返回值
// void默认兼容undefined但是  strictNullChecks为true的时候 不能为null，为false的时候可以为null

// void和never的区别
// 1. void可以接受undefined和null  但是never什么都不能接受
// 2.返回void的函数可以正常执行，但是返回never的函数是不能正常执行的

function greeting(): void {}

// Symbol是一个唯一的值
const s1 = Symbol("key");
console.log(typeof s1);

export {};
