const {merge} = require('webpack-merge')
const path = require("path");
const commonConfiguration = require('./webpack.common.js')

module.exports = merge(
    commonConfiguration,
    
    {
        mode: 'development',
        devServer:
        {
            // host: '0.0.0.0',
            // contentBase: '../dist',
            // open: true,
            // https: false,
            // useLocalIp: true
            host: '0.0.0.0',
            static: {directory: path.resolve(__dirname, '../dist'),},
            open: true,
            // https: false,
            allowedHosts: 'all',
        }
    }
)
