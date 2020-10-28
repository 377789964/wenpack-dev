// webpack是 node写的
let path = require('path') // node内置模块
let HtmlWebpackPlugin = require("html-webpack-plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
let TerserJSPlugin = require('terser-webpack-plugin')
let Webpack = require('webpack')

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
  mode: 'development', // 模式 默认两种production(压缩) development（不压缩）
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
    // new Webpack.ProvidePlugin({
    //   $: 'jquery'
    // }) // 在每个模块中注入$
  ],
  externals: { // 不打包的引入
    jquery: 'jQuery'
  },
  module: { // 模块
    rules: [
      // {
      //   test: require.resolve('jquery'),
      //   loader: 'expose-loader',
      //   options: {
      //     exposes: ['$', 'jQuery'],
      //   }
      // }, // 不使用这个方法可以使用webpack插件将$注入模块中(在plugins中配置)
      // {
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre', // js文件会强制先走pre的loader
      //   exclude: /node_modules/
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { // 将es6-es5
            presets: [
              '@babel/preset-env'
            ],
            sourceType: 'unambiguous',
            plugins: [
              ['@babel/plugin-proposal-decorators', {'legacy': true}], // 使用装饰器：是
              ['@babel/plugin-proposal-class-properties', {'loose': true}], // 宽松模式： 是
              ["@babel/plugin-transform-runtime"]
            ]
          }
        },
        include: path.resolve(__dirname, 'src'), // 只解析src目录下的js文件
        exclude: /node_modules/ // 不解析node_modules文件夹下的js文件
      },
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