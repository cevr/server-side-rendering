const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const externals = require('webpack-node-externals');

const config = {
    // Inform webpack that a bundle is being built
    // for nodeJS, rather than for the browser
    target: 'node',

    //inform webpack where the root file of our
    //server application is
    entry: './src/index.js',

    //inform webpack where to put bundle
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    //inform webpack on which exterals to exclude
    externals: externals()
};

module.exports = merge(baseConfig, config);
