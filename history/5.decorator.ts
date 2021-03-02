// 装饰器
// 有类装饰器，属性装饰器
// A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter.

import { name } from "commander";

//  装饰器是一种特殊的声明，可以绑定在类的声明，属性，方法，存取器，或参数上

// Decorators use the form @expression, where expression must evaluate to a function that will be called
// at runtime with information about the decorated declaration.

// 装饰器使用 @表达式 的语法，表达式会指向一个将要在运行时被调用的方法，同时传入有关装饰声明的信息
// ! 简单来说 @后应该跟一个函数声明

// 类装饰器可以给修改传入的类

namespace 类装饰器 {
  console.log("===============类装饰器");

  // *案例一 对原有类添加属性
  const addNameEat = function (fn: Function) {
    fn.prototype.name = "珠峰";
    fn.prototype.eat = function (): void {
      console.log("正在吃");
    };
  };

  // 添加了类装饰器
  @addNameEat
  class Person {
    name: string;
    eat: Function;
    constructor() {}
  }

  var p = new Person();

  // !如果不使用装饰器，那么就 name就是undefined 而且eat不能被调用
  console.log(p.name);
  p.eat();

  //   *案例二 返回新类
  // 这里直接返回了一个新的类，这个类的功能只能多不能少，原来有name现在必须还有name，同时在类上添加了一个新属性age，
  // 这种方式可以直接通过后面的类装饰工厂进行实现
  const replaceClass = function (fn: Function) {
    return class {
      name: string = "new name";
      age: number = 20;
      constructor() {}
    };
  };
  @replaceClass
  class PersonNew {
    name: string = "name";
    constructor() {}
  }

  var newP = new PersonNew();
  console.log(newP.name);
}

namespace 类装饰工厂 {
  // 装饰器工厂，就是一个react中的高阶函数
  // 因为@ 后跟一个函数，参数是被包裹的类， 我们可以使用AOP的思想
  // 同时可以添加多个装饰器 或者装饰器工厂
  console.log("===============类装饰工厂");

  function withTitle(title: string) {
    return function (C: Function) {
      C.prototype.title = title;
    };
  }
  function withGender(gender: string) {
    return function (C: Function) {
      C.prototype.gender = gender;
    };
  }
  @withTitle("学生")
  @withGender("男")
  class Student {
    title: string;
    gender: string;
    constructor(public name: string) {}
  }
  var s = new Student("tony");

  console.log(s.name);
  //! 能感知到title，是因为我们给了一个public状态的title，而不是因为添加了装饰器
  // 而且这个title不能在constructor上用修饰符进行添加，这样的话，在使用title的时候，
  // 会直接找实例上，而不是找原型链上的title了
  console.log(s.title);
  console.log(s.gender);
}

// 属性装饰器，可以用于属性或者方法
// 作用类似于 vue中的 filter 或者 computed的
// ! 注意属性的装饰器函数，有两个参数传入； 方法的装饰器函数,有三个参数传入
// target针对实例属性和方法 返回的是 构造函数的原型对象
// 针对静态属性和方法，返回的是 构造函数本身
namespace 属性装饰器 {
  console.log("===============属性装饰器");

  // 接受两个个参数
  function uppercase(target: any, propertyKey: string) {
    // ! 先把值保存下来
    let value = target[propertyKey];

    if (delete target[propertyKey]) {
      Object.defineProperty(target, propertyKey, {
        get: function () {
          return value;
        },
        set: function (val: string) {
          value = val.toUpperCase();
        },
      });
    }
  }
  // 把传入的数据，进行处理后再交给实例方法
  function toNumber(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // *改写原来的方法,先拿到原来的方法,两种获取值的方式相同

    // console.log("target[propertyKey]:", target[propertyKey]);
    // console.log("descriptor.value:", descriptor.value);
    // console.log(target[propertyKey] === descriptor.value);

    let oldMethod = descriptor.value;
    descriptor.value = function (...args) {
      args = args.map((item: string) => parseInt(item));
      return oldMethod.apply(this, args);
    };
  }
  class Person {
    @uppercase
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    @toNumber
    sum(...args: any[]) {
      return args.reduce((memo: number, cur: number) => memo + cur, 0);
    }
  }
  const p = new Person("tony");
  console.log(p.name); //name之后是大写的
  console.log(p.sum("1", "2", "3")); //支持传入字符串进行数学计算
}
namespace 参数装饰器 {
  console.log("===============参数装饰器");
  // target针对实例属性和方法 返回的是 构造函数的原型对象
  // 针对静态属性和方法，返回的是 构造函数本身
  // 参数装饰器，主要用在了IOC容器中，在nestjs中应用很多

  function propDes(target: any, methodName: string, paramIndex: number) {
    console.log("target:", target);
    console.log("methodName:", methodName);
    console.log("paramIndex从0开始:", paramIndex);
  }
  class Person {
    constructor(name: string, @propDes age: number) {}
    login(@propDes xx?: number) {}
  }
  const p = new Person("tony", 29);
  p.login();
}

namespace 装饰器的执行顺序 {
  console.log("===============装饰器的执行顺序");
  // 1.类装饰器最后执行，先写的装饰器后执行, 2会在1前面执行
  // @ClassDecorator1()
  // @ClassDecorator2()
  // class Person(){}
  // 2.参数装饰器先执行，然后是属性方法的装饰器再执行
  // 3.方法装饰器和属性装饰器的执行顺序，是定义的时候，谁在前谁先执行。一般是属性在前，所以优先执行

  // ! 执行顺序就是先上后下，先内后外
  // propDecorator1
  // propDecorator2
  // paramsDecorator
  // methodDecorator
  // classDecorator2
  // classDecorator1
}
