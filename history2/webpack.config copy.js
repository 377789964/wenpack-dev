// webpack是 node写的
let path = require('path') // node内置模块
let HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  devServer: { // 开发服务器地址
    port: 3000, // 端口号
    progress: true, // 进度条
    contentBase: './build', // 指定静态服务默认文件夹
    compress: true // 是否压缩
  },
  mode: 'development', // 模式 默认两种production(压缩) development（不压缩）
  entry: './src/index.js', // 入口
  output: {
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
  ],
  module: { // 模块
    rules: [
      { 
        // css-loader 负责解析@import这种语法 解析路径（将 CSS 转化成 CommonJS 模块）
        // style-loader 负责把css插入到header标签中
        // loader特点，功能单一组合使用，所以use属性是数组，loader有顺序，默认从右向左执行，从下到上执行
        // test: /\.css$/, use: ['style-loader', 'css-loader']
        // loader可以写成对象方式,从下往上执行，可以增加option属性
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'head'
            }
          },
          'css-loader'
        ]
      },
      { 
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'head'
            }
          },
          'css-loader',
          'sass-loader' // scss->css
        ]
      }
    ]
  }
}