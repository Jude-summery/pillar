const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',
    // 避免在生产环境中使用 inline-*** 和 eval-***，因为它们会增加bundle大小，并降低性能
    devtool: 'source-map',
    plugins: [
        // 清理输出文件目录
        new CleanWebpackPlugin(),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        // 定义一个环境变量
        // 任何位于 /src 的本地代码都可以取到 process.env.NODE_ENV 变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
})
