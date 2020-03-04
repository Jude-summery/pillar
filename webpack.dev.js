const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    // 开启source-map
    devtool: 'inline-source-map',
    // 配置webpack-dev-server
    devServer: {
        contentBase: './dist'
    }
})
