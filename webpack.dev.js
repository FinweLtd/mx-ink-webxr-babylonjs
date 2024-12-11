const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const fs = require('fs');

// App directory
const appDirectory = fs.realpathSync(process.cwd());
 
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(appDirectory, "public"),
        compress: true,
        hot: true,
        // publicPath: '/',
        open: false,
        // host: '0.0.0.0', // enable to access from other devices on the network
        /* Enable HTTPS when needed (like in WebXR) */
        // https: true, 
        https: {
            key: fs.readFileSync('certs/certificate.key'),
            cert: fs.readFileSync('certs/certificate.cert'),
            // ca: fs.readFileSync('/path/to/ca.pem'),
        },
        port: 8085,
    },
});