const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
    //inform webpack where the root file of our
    //server application is
    entry: './src/client/index.js',

    //inform webpack where to put bundle
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    }
};

module.exports = merge(baseConfig, config);
