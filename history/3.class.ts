// ts中类的知识点
// 1. 属性修饰符 public private protected readonly
// 2. setter和getter方法
// 3. 继承（要结合不同的属性修饰符使用）
// 4. 静态属性和方法, 子类可以获取到父类public或者projected的static，和实例属性一样
class Person {
  myName: string;
  constructor(name: string = "tony") {
    this.myName = name;
  }
  // getter的名字不能和属性名冲突
  get name() {
    return this.myName;
  }

  set name(value) {
    this.myName = value;
  }
  getName() {
    return this.myName;
  }
}

const p = new Person();
p.getName();

class Father {
  protected static fathername = "father";
  toString() {
    console.log("你爹");
  }
}
class Child extends Father {
  constructor() {
    super();
    console.log(Child.fathername);
  }
  toString() {
    super.toString();
    console.log("你儿子");
  }
}

const c = new Child();
c.toString();
export {};
