/* global require, module */
'use strict';

var angularTemplates = require('broccoli-angular-templates-cache'),
    compileSass = require('broccoli-sass'),
    concatenate = require('broccoli-concat'),
    mergeTrees = require('broccoli-merge-trees'),
    pickFiles = require('broccoli-static-compiler'),
    uglifyJs = require('broccoli-uglify-js'),
    app = 'app',
    destDir = '/',
    sourceTrees = [
        app,
        'bower_components/angular',
        'bower_components/bootstrap-sass/assets/javascripts',
        'bower_components/jquery/dist'
    ],
    appCss,
    appHtml,
    appJs;

/**
 * move the index.html file from the project /app folder
 * into the build production folder
 */
appHtml = pickFiles(app, {
    srcDir: '/',
    files: ['index.html'],
    destDir: destDir
});

var templates = angularTemplates(app, {
    srcDir: 'templates',
    destDir: '/',
    prepend: 'partials/',
    strip: 'templates/',
    minify: {
        collapseWhitespace: true
    },
    fileName:'templates.js',
    moduleName:'reverse-polish-calculator'
});

sourceTrees.push(templates);

// merge array into tree
var appAndDependencies = new mergeTrees(sourceTrees, { overwrite: true })

/**
 * concatenate and compress all of our JavaScript files in
 * the project /app folder into a single app.js file in
 * the build production folder
 */
appJs = concatenate(appAndDependencies, {
    inputFiles: [
        'jquery.js',
        'bootstrap.js',
        'angular.js',
        'js/**/*.js',
        'templates.js'
    ],
    outputFile: '/app.js',
    header: '/** Copyright Brandon Schlueter 2015 **/'
});
appJs = uglifyJs(appJs, {
    compress: true
});

/**
 * compile all of the SASS in the project /resources folder into
 * a single app.css file in the build production/resources folder
 */
appCss = compileSass(
    ['app/style'],
    '/app.sass',
    destDir + 'app.css'
);

// merge HTML, JavaScript and CSS trees into a single tree and export it
module.exports = mergeTrees([appHtml, appJs, appCss]);