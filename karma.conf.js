module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        //browsers: ['Chrome'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            "node_modules/jasmine-es6-promise-matchers/jasmine-es6-promise-matchers.js",
            { pattern: 'test/**/*Test.js', watched: false }
        ],
        frameworks: ['jasmine'],
        basePath: '.',
        preprocessors: {
            'client/**/*.js': ['webpack', 'sourcemap'],
            'test/**/*.js': ['webpack', 'sourcemap'],
        },
        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.js/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            devtool: 'inline-source-map',

            watch: true
        },

        webpackServer: {
            noInfo: true
        }
    });
};