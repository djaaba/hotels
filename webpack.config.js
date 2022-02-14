const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniSssExtractPlugin = require('mini-css-extract-plugin')


let mode = 'development'

if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

console.log(mode + " mode")

module.exports = {
    mode: mode,
    output: {
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },
    plugins: [
        new MiniSssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            // template: "./src/index.html",
            template: "./src/index.pug",
            inject: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    (mode == 'development')? "style-loader" : MiniSssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {

                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }
        ],
    }
}