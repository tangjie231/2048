var webpack = require('webpack');
var baseDir="./src/main/webapp/js/redux";
var outputDir="./src/main/webapp/js/redux";

module.exports = {
    entry: {
        app: outputDir+'/index.js'
    },
    output: {
        path: outputDir,
        filename: 'build.js'
    },
    resolve: {
        extensions: ['','.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
                //query:{presets:['es2015','react']}
            }
        ]
    },
    watch: true
};