// 一个文件内，有多个相同的类型，可以使用namespace进行分割，本质就是js的闭包
namespace a {
  const name = "title";
}
namespace b {
  const name = "name";
}

// * 编译为 js的结果

// var a;
// (function (a) {
//     var name = "title";
// })(a || (a = {}));
// var b;
// (function (b) {
//     var name = "name";
// })(b || (b = {}));
