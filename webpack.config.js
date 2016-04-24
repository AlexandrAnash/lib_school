'use strict';
var webpack = require('webpack');

var servicePath = './client/school/services/';
var apiPath = './client/school/api/';
var modelsPath = './client/school/models/';
module.exports = {
    entry: {

        'service/mentorService':        servicePath + 'mentorService',
        'service/studentMentorService': servicePath + 'studentMentorService',
        'service/studentService':       servicePath + 'studentService',
        'service/studentTaskService':   servicePath + 'studentTaskService',
        'service/taskService':          servicePath + 'taskService',

        'api/mentorRest':          apiPath + 'mentorRest',
        'api/studentMentorRest':   apiPath + 'studentMentorRest',
        'api/studentRest':         apiPath + 'studentRest',
        'api/studentTaskRest':     apiPath + 'studentTaskRest',
        'api/taskRest':            apiPath + 'taskRest'
    },
    output: {
        //path: './dist',
        path: '../webClient/client/vendor',
        filename: 'school.[name].js',
        library: ['school', '[name]'],
        libraryTarget: "umd"
    },
    devServer: {
        contentBase: '.',
        host: 'localhost',
        port: 9000
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    //devtool: 'source-map'
};