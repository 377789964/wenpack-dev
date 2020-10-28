// console.log('hello zfpx')
let str = require('./a/a.js')
require('./index.css')
require('./index.scss')
console.log(str, 'str')

// import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery' // 在页面中使用loader将$暴露给window
// import $ from 'jquery'
// console.log($, '-------', window.$, '-------')

// 使用webpack插件将$注入每个模块中（配置文件中配置plugins中配置new Webpack.ProvidePlugin()）
// console.log($, '--------')

// 这样写相当于多引入一个模块打包（不引入即可直接访问html已经script标签引入过了，只是代码习惯写引入变量）
// 为了打包的时候不打包该引入可在webpack中配置externals属性
import $ from 'jquery'
// html文件中使用script标签引入jquery，可直接在window上访问属性$
console.log($, '$===========window.$', window.$)

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

// 1）在js中创建图片来引入
import logo from './logo.png' // 把图片引入返回的是已给新的图片地址
console.log(logo, 'logo')
let image = new Image()
image.src = logo
document.body.appendChild(image)
