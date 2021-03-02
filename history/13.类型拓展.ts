// 相同类型名的interface会合并
// JS可以直接添加，但是ts需要先去拓展interface

export {};

declare global {
  interface Window {
    myName: string;
  }
  interface String {
    double(): string;
  }
}

String.prototype.double = function () {
  return this + " " + this;
};

let result = new String("hello").double();
console.log(result);

console.log(window.myName);
