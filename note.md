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
