const webpack = require('webpack');
const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Manifest = require('webpack-manifest');

module.exports = {
    entry: {
        index: [
            path.join(__dirname, '../src/public/scripts/index.es6'),
            path.join(__dirname, '../src/public/scripts/indexadd.es6')
        ],
        tag: [
            path.join(__dirname, '../src/public/scripts/tag.es6'),
            path.join(__dirname, '../src/public/scripts/star.es6')
        ]
    },
    output: {
        path: path.join(__dirname, '../build/'),
        filename: 'public/scripts/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"dev"',
        }),
        new LiveReloadPlugin({ appendScriptTag: true }),
        new ExtractTextPlugin("public/css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'public/scripts/common/vendor.min.js',
        }),
        new HtmlWebpackPlugin({
            filename: 'views/layout.html',
            template: 'src/widget/layout.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'views/index.html',
            template: 'src/views/index.js',  // 点赞页面
            inject: false,
            chunks: ['vendor', 'index', 'tag']  // 点赞页面分发
        }),
        new HtmlWebpackPlugin({
            filename: 'widget/index.html',
            template: 'src/widget/index.html', // 点赞组件
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'views/star.html',
            template: 'src/views/star.js',  // 星星页面
            inject: false,
            chunks: ['vendor', 'index', 'tag'] // 星星页面分发
        }),
        new HtmlWebpackPlugin({
            filename: 'widget/star.html',
            template: 'src/widget/star.html', // 星星组件
            inject: false
        }),
        new Manifest({
            cache: [
              './public/css/vendor.css'
            ],
            //Add time in comments.
            timestamp: true,
            // 生成的文件名字，选填
            // The generated file name, optional.
            filename:'cache.manifest', 
            // 注意*星号前面用空格隔开
            network: [
              ' *',
            ],
            // 注意中间用空格隔开
            // manifest 文件中添加注释
            // Add notes to manifest file.
            headcomment:'task-thumb4', 
            master: ['views/layout.html']
        })
    ]
};