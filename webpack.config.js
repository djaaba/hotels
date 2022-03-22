const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniSssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');
const globule = require('globule');
const paths = globule.find(['src/pages/**/*.pug']);

let mode = 'development'

if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

console.log(mode + " mode")

module.exports = {
    mode: mode,
    output: {
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
    },
    plugins: [
        new MiniSssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        ...paths.map((path) => {
            return new HtmlWebpackPlugin({
                template: path,
                filename: `${path.split(/\/|.pug/).splice(-2, 1)}.html`,
            })
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
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
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    }
}