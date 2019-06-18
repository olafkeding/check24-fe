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
            "bootstrap": path.resolve(__dirname + "/js/bootstrap.js"),
        },

        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname + '/bundles'),
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
        devtool: isEnvDevelopment ? 'inline-source-map' : 'source-map',

        watch: !!props.watch

    }
};

/*
*   "browserslist": [
    ">0.2%",
    "not dead",
    "not ie < 11",
    "not op_mini all"
  ],*/
//last 2 Chrome versions












