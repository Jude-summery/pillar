const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.js',
        vendor: ['react', 'react-router-dom', 'react-dom']
    },
    plugins: [
        // 格式化html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './src/index.html')
        }),
        // 使用模块的路径而不是数字标识符，避免公共模块在打包时改变hash值影响缓存效果
        new webpack.HashedModuleIdsPlugin(),
    ],
    module: {
        rules: [
            {
                // src目录下面的以.js结尾的文件，要使用babel解析
                // cacheDirectory是用来缓存编译结果，下次编译加速
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, './src')
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192 // 小于8k的图片会被转成base64编码，插入到HTML中减少请求
                    }
                }]
            }
        ]
    },
    // 提取公共代码打包到单独的文件内
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    // 配置别名
    resolve: {
        alias: {
            Components: path.join(__dirname, './src/components')
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    }
}
