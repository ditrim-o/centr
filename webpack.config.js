const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

let conf = {
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name]bundle.js",
        publicPath: "dist/"
    },
    devServer: {
        overlay:true
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader:"babel-loader",
            },
            {
                test:/\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: { 
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        }, 
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                      ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "build/index.html",
            hash: true,
            chunks: ["index"]
        }),

        new webpack.ProvidePlugin({
            '$': "jquery",
            'jQuery': "jquery",
            'Popper': 'popper.js',
            "Bootstrap": "bootstrap.js"
        })
    ]
};

module.exports = (env, options) => {

    let production = options.mode === "production";

    conf.devtool = production ? false : "eval-sourcemap";

    return conf;
} 