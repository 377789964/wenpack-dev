module.exports = 'zfpx'

// 类会在打包后的文件中重复校验，（当前项目下A和B都会被校验，校验的方法function _classCallCheck应当公用而不是写两遍）
class B{

}
// 高级语法会报错：Uncaught ReferenceError: regeneratorRuntime is not defined
// promise语法也会报错
function * gen(params) {
  yield 11
}
console.log(gen().next(), 'gen-1')
// 上面两个问题解决方案使用插件@ babel / plugin-transform-runtime
// 配置该插件后会继续报错Cannot assign to read only property 'exports' of object '#<Object>'
// 解决办法是webpack.config.js中增加sourceType: 'unambiguous'配置
