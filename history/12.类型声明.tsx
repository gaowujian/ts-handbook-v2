// 声明文件是为了提供声明，提供类型系统
// 一个由js编写的项目，在提供响应的 xx.d.ts声明文件之后也可以使用类型系统提供的便捷

import jQuery from "jquery";

jQuery.ajax("url");
namespace 添加自己的类型声明 {
  // ! 1. 首先需要在 tsconfig.json 中配置 baseUrl 和 paths
  // ! 2. 配置一个路径例如  "*": ["typings/*"] 在typings目录下 创建一个jquery目录
  // !  所以 import jQuery from "jquery"; 就具备了智能提示的功能
}

namespace 手动添加类型声明 {
  // declare var 声明全局变量
  // declare function 声明全局方法
  // declare class 声明全局类
  // declare enum 声明全局枚举类型
  // declare namespace 声明(含有子属性的)全局对象
  // interface 和 type 声明全局类型
}
namespace 添加第三方类型声明 {
  // 安装 @types/jquery 可以添加jquery的类型声明文件
}
