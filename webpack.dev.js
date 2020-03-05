const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    // 开启source-map
    devtool: 'inline-source-map',
    // 配置webpack-dev-server
    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: true, // 解决启动后刷新404
        port: 8000,
        proxy: { // 配置服务代理
            '/api': {
                 target: 'http://localhost:3000',
                 pathRewrite: {'^/api' : ''},  //可转换
                 changeOrigin:true
            }
        },
    }
})
