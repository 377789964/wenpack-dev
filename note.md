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

## webpack配置js（es6-es5）
- npm install babel-loader @babel/core @babel/preset-env -D
- loader配置内容
- {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: { // 将es6-es5
        presets: [
          '@babel/preset-env'
        ]
      }
    }
  }
- // 这种写法babel本身不支持，需要使用插件 @babel/plugin-proposal-class-properties
  class A{ // 这种写法相当于： new A() a = 1（new一个A的实例，实例创建一个a属性）
    a = 1
  }
- npm i @babel/plugin-proposal-class-properties -D 配置如下：
- {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: { // 将es6-es5
        presets: [
          '@babel/preset-env'
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties'
        ]
      }
    }
  },
- @log装饰器的写法也不支持，需要使用插件
- npm i @babel/plugin-proposal-decorators -D 配置如下：
- {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: { // 将es6-es5
        presets: [
          '@babel/preset-env'
        ],
        plugins: [
          ['@babel/plugin-proposal-decorators', {'legacy': true}], // 使用装饰器：是
          ['@babel/plugin-proposal-class-properties', {'loose': true}] // 宽松模式： 是
        ]
      }
    }
  },
- 解决打包时类的校验函数复用和，高级语法报错的问题（generate/promise等语法） 
- 报错信息： Uncaught ReferenceError: regeneratorRuntime is not defined
- 使用插件@ babel / plugin-transform-runtime（开发依赖）  @babel/runtime（生产依赖）
- npm install --save-dev @babel/plugin-transform-runtime
- npm install --save @babel/runtime
- {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: { // 将es6-es5
        presets: [
          '@babel/preset-env'
        ],
        plugins: [
          ['@babel/plugin-proposal-decorators', {'legacy': true}], // 使用装饰器：是
          ['@babel/plugin-proposal-class-properties', {'loose': true}], // 宽松模式： 是
          ["@babel/plugin-transform-runtime"] // 解决高级语法generate/promise等报错问题
        ]
      }
    }
  }
- 解决高级语法报错问题后，重更启动项目会继续报错：Cannot assign to read only property 'exports' of object '#<Object>'
- 报错的原因一：commonJS和ES6的语法是不太一样的前者是require和module.exports后者则是import和exports,当你混用这两个语法的时候，webpack就会报错
- 报错原因二： @babel/plugin-transform-runtime这个插件的时候，同时你又在某个commonJS写的文件里使用这个插件时，babel会默认你这个文件是ES6的文件，然后就使用import导入了这个插件，从而产生了和第一种情况一样的混用错误
- 解决方法：babel.config.js里配置sourceType: 'unambiguous'设置，让babel和webpack一样严格区分commonJS文件和ES6文件
- {
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
    }
  },
- js增加eslint校验功能
- npm install eslint eslint-loader -D
- https://eslint.org/demo下载.eslintrc.json文件放在根目录下
- 配置内容
- {
    test: /\.js$/,
    loader: 'eslint-loader',
    enforce: 'pre', // js文件会强制先走pre的loader
    exclude: /node_modules/
  }
- 会校验js文件，报错则项目启动失败，暂时先不使用

## webpack配置第三方插件（eg: jquery）
- 方法一
- npm i jquery
- npm i expose-loader -D // 暴露全局loader（将变量扩展在window上，作为全局变量）
- 可以在.vue文件中使用loader： import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery'
- 可以在webpack.config.js文件中使用
- {
    test: require.resolve('jquery'),
    loader: 'expose-loader',
    options: {
      exposes: ['$', 'jQuery'],
    }
  },
- 方法二
- 不使用这种方式也可以使用webpack插件将$注入
- 在配置文件中：
- let Webpack = require('webpack')
- plugins: [
    new Webpack.ProvidePlugin({
      jquery: '$'
    }) // 在每个模块中注入$
  ]
- 方法三
- 使用标签方式引入
- index.html文件中：<script src="https://lib.baomitu.com/jquery/3.1.1/jquery.js"></script>
- .js文件中使用：
- import $ from 'jquery' // 重复引入的不需要被打包需要配置文件配置externals属性
  console.log($, '$===========window.$', window.$)
- webpack.config.js文件中：
- externals: { // 不打包的引入（bundle.js由353kb变为35.4kb）
    jquery: 'jQuery'
  },

# 打包图片
- (1) 在js中创建图片来引入
- import logo from './logo.png' // 把图片引入返回的是已给新的图片地址
  let image = new Image()
  image.src = logo
  document.body.appendChild(image
- 使用loader：npm install file-loader -D // 默认会在内部生成图片在build目录下，返回生成图片的名字
- 配置信息 {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          // file-loaderb版本5以上和html-withimg-loader冲突，需要配置esModule: false即可html-withimg-loader正常使用
          options:{
            esModule: false
          }
        }]
      },
- (2) css中引入url背景图
- background: url('./flower.jpg'); // css-loader会解析为require('./logo.png')不需要安装loader
- (3) 在html中使用img标签<img src="./flower1.jpg" alt="">
- 使用loader: npm install html-withimg-loader -D
- 配置信息 {
        test:/\.(html|htm)$/i,
         use:'html-withimg-loader', // 解析 html中的图片资源
      },
