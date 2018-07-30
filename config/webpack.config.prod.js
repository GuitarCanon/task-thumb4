const webpack = require('webpack');
const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        publicPath: 'http://192.168.0.107:3000/',
        filename: 'public/scripts/[name]-[hash:5].js'
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
            'process.env.NODE_ENV': '"prod"',
        }),
        new LiveReloadPlugin({ appendScriptTag: true }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        new ExtractTextPlugin("public/css/[name]-[hash:5].css"),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            canPrint: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'public/scripts/common/vendor-[hash:5].min.js',
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
        })
    ]
}