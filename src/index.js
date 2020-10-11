// console.log('hello zfpx')
let str = require('./a/a.js')
require('./index.css')
require('./index.scss')
console.log(str, 'str')

let fn = () => {
  console.log('se6')
}
fn()

// 装饰器的写法也并不支持，需要插件 decorators-legacy
// 这种写法babel本身不支持，需要使用插件 @babel/plugin-proposal-class-properties
@log // 装饰器是个函数，装饰的是类A，则函数log的第一个参数就是该类A
class A{ // 这种写法相当于： new A() a = 1（new一个A的实例，实例创建一个a属性）
  a = 1
}
let a = new A()
console.log(a.a, 'a')

function log(target) {
  console.log(target, 'target')
}
