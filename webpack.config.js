const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取绝对路径
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  mode: 'development',
  // webpack 入口文件
  entry: './src/pages/index/index.js',

  // Webpack 输出路径
  output: {
    // 输出的目录
    path: resolve('dist'),
    // 输出的文件名
    filename: 'js/[name].js'
  },
  // source-map，调试用的，出错的时候，将直接定位到原始代码，而不是转换后的代码
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    //路径自动补全
    extensions: ['.js'],
    //路径别名
    alias: {
      api: resolve('src/api'),
      fonts: resolve('src/assets/fonts'),
      images: resolve('src/assets/images'),
      styles: resolve('src/assets/styles'),
      components: resolve('src/components'),
      pages: resolve('src/pages')
    }
  },

  // 不同类型模块的处理规则
  module: {
    rules: [
      //css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      // 模板文件
      {
        test: /\.art$/,
        loader: 'art-template-loader'
      },
      //图片
      {
        // 问题:默认处理不了html中img图片
        // 处理图片资源
        test: /\.(jpe?g|png|gif|svg)$/,
        // 使用一个loader时,直接写就行了
        loader: 'url-loader',
        options: {
          // 图片大小小于10KB,就会被base64处理
          // 优点:减少请求数量(减轻服务器压力)
          // 缺点:图片体积会增大, 就会导致文件请求速度更慢
          limit: 10000,
          // 问题: 因为url-loader默认使用es6模块化解析, 
          // 而html-loader引入图片commonjs
          // 解析时会出问题: [object Module]
          // 解决: 关闭url-loader的es6模块化, 使用commonjs解析
          esModule: false,
          // 给图片进行重命名
          // [ext]去文件原来扩展名
          name: 'images/[name].[ext]'
        }
      },
      //字体
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    // 自动将依赖注入 html 模板，并输出最终的 html 文件到目标文件夹
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/index/index.art',
    }),
  ]
}