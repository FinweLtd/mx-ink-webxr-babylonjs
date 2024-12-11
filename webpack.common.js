const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    entry: path.resolve(appDirectory, "src/index.ts"),
    output: {
        filename: "js/babylonBundle.js",
        path: path.resolve("./dist/"),
    },
    resolve: {
        extensions: [".ts", ".js"],
        fallback: {
            fs: false,
            path: false, // require.resolve("path-browserify")
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
            },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                loader: "source-map-loader",
                enforce: "pre",
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                // sideEffects: true
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ],
            },
            {
                test: /\.(glb|gltf|babylon|manifest|png|jpg|csv|env|wav|mp3|dds|ply|splat)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            // FIXME: would be better to have regural hashed file names and then somehow get manifest also included and have the same names
                            // To make caching work by having manifest files the assets need to have original names instead of hashed ones
                            // name: '[path][name].[ext]',
                            name: '[name].[ext]',
                        },
                    },
                ],
                // When using the old assets loaders (i.e. file-loader/url-loader/raw-loader) along with Asset Module in webpack 5, you might want to stop Asset Module from processing your assets again as that would result in asset duplication. This can be done by setting asset's module type to 'javascript/auto'.
                // type: 'javascript/auto'
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(appDirectory, "public/index.html"),
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(appDirectory, "public/favicon.ico"), to: path.resolve("./dist/") }
            ]
        }),
    ],
};
