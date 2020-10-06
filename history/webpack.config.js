// webpack是 node写的
let path = require('path') // node内置模块
// console.log(path.resolve('dist'), 'path-dist')
// 输出结果为d:\studymyself\webpack\wenpack-dev\dist path-dist
let HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  devServer: { // 开发服务器地址
    port: 3000, // 端口号
    progress: true, // 进度条
    contentBase: './build', // 指定静态服务默认文件夹
    compress: true // 是否压缩
  },
  mode: 'production', // 模式 默认两种production(压缩) development（不压缩）
  entry: './src/index.js', // 入口
  output: {
    // filename: 'bundle[hash:8].js', // 修改文件后打包后生成的文件名加hash戳，避免缓存问题 8:表示hash值为8位
    filename: 'bundle.js', // 打包后文件名
    path: path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径 resolve可以把一个相对路径解析为绝对路径(参数__dirname可写可不写，表示当前目录下的dist目录)
  },
  plugins: [ // 数组 放着webpack的所有插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html', // 打包后的文件名 默认文件名也是index.html
      minify: { // 最小化的配置信息
        removeAttributeQuotes: true, // 去掉属性的双引号
        collapseWhitespace: true // 折叠行
      },
      hash: true // hash戳，解决缓存问题
    })
  ]
}