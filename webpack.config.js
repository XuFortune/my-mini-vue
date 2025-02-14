const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: false, // 或者您可以取消注释下一行来启用 source map
  // devtool: 'inline-cheap-source-map',
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'mini-vue.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出目录
    clean: true,
    publicPath: '/dist/', // 将 publicPath 放在 output 下
    // 如果需要，可以取消注释以下两行来设置库的目标格式
    // library: 'MiniVue',
    // libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/examples/index.html', // 模板HTML文件路径
      publicPath: '/dist/' // 确保 HTML 中引用资源的路径正确
    }),
  ],
  devServer: {
    static: './src/examples', // 提供静态文件的服务目录
    liveReload: true, // 启用自动刷新
    hot: true, // 启用热模块替换(HMR)
  },
};