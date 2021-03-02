import { action } from "commander";

export {};
// 通过typeof instance of 和 for in等来确保分支的类型正确

// typeof 可以用来识别基本类型
// instanceof 可以主要用来识别类的实例对象

// null保护 三种方式

function getName(name: string | null) {
  // 第一种
  if (name === null) {
    return "";
  }
  //   第二种
  name = name || "";
  //   第三种非空断言
  return name!.toString();
}

//链判断运算符
// 不建议使用

var a = { b: 2 };
var val = a?.b;

namespace 可辨识的联合类型 {
  interface WarningButton {
    type: "warning";
    text: "警告按钮";
  }
  interface DangerButton {
    type: "danger";
    text: "危险按钮";
  }
  type Button = WarningButton | DangerButton;
  function clickButton(button: Button) {
    if (button.type === "warning") {
    } else if (button.type === "danger") {
    }
  }

  type Action = { type: "add"; payload: string } | { type: "delete"; payload: number };
  function reducer(action: Action) {
    switch (action.type) {
      case "add":
        console.log(action.payload.charAt(0));
        break; //必须有break，否则两个case,在之后只能用公有属性
      case "delete":
        console.log(action.payload.toFixed());
    }
  }
}

namespace 联合类型和交叉类型 {
  // 联合类型和交叉类型

  // 联合类型描述的是一个值，可以是联合类型中包含的任意一种类型,这是一个compose操作
  type A = number | string; // 所有的数字和所有的字符串加起来
  type B = number | boolean; // 所有的数字和所有的布尔值加起来
  type C = A | B; //type C = string | number | boolean 所有的数字+所有的字符串+所有的布尔值

  type D = A & B; //type D = number 既能满足A也能满足B的交集

  //联合类型的值，只能拿到多种属性中的公有属性
  // ! c也只有 toString, toLocaleString 和 valueOf 他们是string number和boolean的共同属性
  interface Bird {
    fly(): void;
    layEggs(): void;
  }

  interface Fish {
    swim(): void;
    layEggs(): void;
  }

  let birdAndFish: Bird | Fish; //!这是所有的鸟和所有的鱼的集合
  let FlyFish: Bird & Fish; //!这是会飞的鱼的集合
  //null保护，非空断言
  //不确定具体类型，只能下蛋
  birdAndFish!.layEggs();

  // 会飞的鱼，既能飞，也能游泳，还能下蛋
  FlyFish!.fly();
  FlyFish!.swim();
  FlyFish!.layEggs();
}
