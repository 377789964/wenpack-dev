// webpack是 node写的
let path = require('path') // node内置模块
let HtmlWebpackPlugin = require("html-webpack-plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
let TerserJSPlugin = require('terser-webpack-plugin')

module.exports = {
  optimization: { // 优化项
    // webpack成产环境默认会压缩js文件，使用该插件优化css则js就不优化压缩了，因此优化js/css插件同时使用
    // minimizer: [new OptimizeCSSAssetsPlugin({})],
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  devServer: { // 开发服务器地址
    port: 3000, // 端口号
    progress: true, // 进度条
    contentBase: './build', // 指定静态服务默认文件夹
    compress: true // 是否压缩
  },
  mode: 'production', // 模式 默认两种production(压缩) development（不压缩）
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.js', // 打包后文件名
    path: path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径 resolve可以把一个相对路径解析为绝对路径(参数__dirname可写可不写，表示当前目录下的dist目录)
  },
  plugins: [ // 数组 放着webpack的所有插件（书写顺序无要求）
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html', // 打包后的文件名 默认文件名也是index.html
      hash: true // hash戳，解决缓存问题
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css' // 将样式抽离成文件的文件名
    })
  ],
  module: { // 模块
    rules: [
      { 
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 把解析的模块化的样式抽离成一个文件，写成一个link标签引入文件中
          'css-loader',
          'postcss-loader'
        ]
      },
      { 
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader' // scss->css
        ]
      }
    ]
  }
}