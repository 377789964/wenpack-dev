## webpack安装(4.0版本)
- 安装本地的webpack
- webpack webpack-cli -D

## webpack可以进行零配置
- 打包工具 -> 输出后的结果（js模块）
- 直接运行npx webpack 生成dist目录（打包结果）
- npx webpack命令会读node_modules文件夹下的.bin文件夹下的webpack.cmd文件
- 执行文件后查找webpack-bin-webpack.js

## 手动配置webpack
- 默认配置文件的名字 webpack.config.js（手动新建）
- 重新打包 npx webpack
- 配置文件名可以自己命名，这样默认会找不到配置文件，可以指定执行配置文件
- 指定配置文件命令：npx webpack --config webpack.config.my.js（假设自定义文件名为webpack.config.my.js）
- 或者在package.jsonz中配置脚本script
- "scripts": {
    "build": "webpack --config webpack.config.js"
  },
- 当前webpack版本，执行npm run build命令会直接执行node_modules文件下的webpack，并指定配置文件是webpack.config.js(自己命名的配置文件也可以)

## 开发服务，可以localhost启动前端项目
- npm install webpack-dev-server -D（开发依赖 内部使用express插件启动前端项目）
- 命令行执行npx webpack-dev-server会启动前端项目
- 或者在package.json中配置脚本script
- "scripts": {
    "dev": "webpack-dev-server"
  }, // 生成的文件在项目目录下看不到

## 在静态服务文件夹生成html（访问服务默认打开生成的index.html）
- 引入插件 let HtmlWebpackPlugin = require("html-webpack-plugin")
- 配置插件
- plugins: [ // 数组 放着webpack的所有插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html' // 打包后的文件名 默认文件名也是index.html
    })
  ]

## webpack默认只支持js文件打包，配置打包css文件
- css-loader 负责解析@import这种语法 解析路径（将 CSS 转化成 CommonJS 模块）
- style-loader 负责把css插入到header标签中
- loader特点，功能单一组合使用，所以use属性是数组，loader有顺序，默认从右向左执行，从下到上执行
- test: /\.css$/, use: ['style-loader', 'css-loader']
- loader可以写成对象方式,从下往上执行，可以增加option属性
- module: { // 模块
    rules: [
      { 
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
- 上面的编译后将样式直接插入index.html文件的style标签，为了避免阻塞使用插件将样式抽离出来作为src进行引入
- npm install mini-css-extract-plugin -D
- 插件作用：将模块化的样式抽离成一个文件，写成一个link标签引入文件中
- module: { // 模块
    rules: [
      { 
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 把解析的模块化的样式抽离成一个文件，写成一个link标签引入文件中
          'css-loader'
        ]
      },
      { 
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader' // scss->css
        ]
      }
    ]
  }
- css样式自动添加浏览器前缀loader及使用
- npm install postcss-loader autoprefixer@8.0.0 -D（注意postcss-loader默认下载版本是4.0.3，对应的autoprefixer版本是8.0.0）
- postcss-loader解析需要使用浏览器前缀的样式，添加样式前缀使用的是autoprefixer插件
- postcss-loader使用需要配置文件：postcss.config.js 文件内容如下
- module.exports = {
  // 使用postcss-loader会执行这个文件，告诉执行autoprefixer插件
  plugins: [require('autoprefixer')]
}
- 压缩css插件
- npm install optimize-css-assets-webpack-plugin terser-webpack-plugin -D
- 使用optimize-css-assets-webpack-plugin插件优化css，则必须使用terser-webpack-plugin来压缩js
- 使用优化项
- optimization: { // 优化项
    // webpack成产环境默认会压缩js文件，使用该插件优化css则js就不优化压缩了，因此优化js/css插件同时使用
    // minimizer: [new OptimizeCSSAssetsPlugin({})],
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
