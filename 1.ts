// ts解决了很多常见的问题
// 1.静态类型检查
// 2.空对象属性不存在报错
// 3.拼写错误问题
// 4.! type-checker， typescript作为工具使用，这是最为常见的用法

// 对于一般的变量例如 number string  和 boolean, ts很多时候都能够自行推断出来

// function add(a: number, b: number): number {
//   return a + b;
// }

function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
  return 2020;
}

// 很多时候，函数的返回值类型和变量赋值一样，大部分是可以直接推断出来，书写函数返回值更多是为了避免意外的修改

const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUpperCase());
  // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});

// inference rules 和 contextual typing
// 推断规则和上下文类型一样 ，我们不必去有意学习他们是如何发生的，但是要明白什么时候类型注释什么时候是不需要的

// ! 除了基本类型, 对象类型  Object Types 这是最重要的类型
// 赋值的时候, 可以直接推断类型
let p = {
  name: "tony",
  age: 29,
};

type Person = typeof p;

// * 针对对象类型的可选属性，我们可以使用 ? 表示属性是否可选
// ! 针对函数的参数，我们没必要使用?来表示可选，因为兼容处理会帮忙处理这些
function printName(obj: { first: string; last?: string }) {}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

// * literal type 字面量类型
const obj = { counter: 0 };
if (true) {
  obj.counter = 1;
}
console.log("obj:", obj);

// 强烈建议开启 strictNullChecks
// 但是有一个方式可以跳过null check那就是非空类型声明 !
// x既不是 null也不是 undefined
function liveDangerously(x?: number | undefined) {
  // No error
  console.log(x!.toFixed());
}
