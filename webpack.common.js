const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.js',
        vendor: [
            'loadsh'
        ]
    },
    plugins: [
        // 清理输出文件目录
        new CleanWebpackPlugin(),
        // 格式化html
        new HtmlWebpackPlugin({
            title: 'Production'
        }),
        // 使用模块的路径而不是数字标识符，避免公共模块在打包时改变hash值影响缓存效果
        new webpack.HashedModuleIdsPlugin(),
        // 提取公共的依赖打包到单独的vendor js文件内
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // 提取manifest打包到单独的文件内
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ],
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    }
}
