const path = require("path");
const webpack = require("webpack");

module.exports = props => {
    if (!props) {
        props = {};
    }

    const env = props.mode || 'production';
    const isEnvDevelopment = env === 'development';

    return {
        mode: env,
        entry: {
            //multiple entries possible here
            "bootstrap": path.resolve(__dirname + "/js/index.js"),
        },

        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname + '/bundles'),
        },
        //loaders
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader' //multiple loaders possible here
                    }
                }
            ]
        },
        devtool: isEnvDevelopment ? 'inline-source-map' : 'source-map',
        watch: !!props.watch

    }
};

//last 2 Chrome versions












