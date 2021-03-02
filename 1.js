// ts解决了很多常见的问题
// 1.静态类型检查
// 2.空对象属性不存在报错
// 3.拼写错误问题
// 4.! type-checker， typescript作为工具使用，这是最为常见的用法
// function greet(person: string, date: Date) {
//   console.log(`Hello ${person}, today is ${date.toDateString()}!`);
// }
// greet("Maddison", new Date());
// function greet(person, date) {
//   console.log(`Hello ${person}, today is ${date.toDateString()}!`);
// }
// greet("Maddison", new Date());

let obj;
console.log(obj.name);
