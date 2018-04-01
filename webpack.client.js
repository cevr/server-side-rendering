const path = require('path');

module.exports = {
    //inform webpack where the root file of our
    //server application is
    entry: './src/client/index.js',

    //inform webpack where to put bundle
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },

    //inform webpack to run babel through every file
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        'react',
                        'stage-0',
                        [
                            'env',
                            {
                                targets: {
                                    browsers: ['last 2 versions']
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    }
};
