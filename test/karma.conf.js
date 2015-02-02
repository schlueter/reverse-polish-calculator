// Karma configuration
// Generated on Tue Jan 27 2015 11:01:00 GMT-0500 (EST)

module.exports = function(config) {
    config.set({

        frameworks: ['jasmine'],

        files: [
            '../bower_components/angular/angular.js',
            '../bower_components/angular-mocks/angular-mocks.js',
            '../src/app/**/module.js',
            '../src/app/**/*.js',
            '**/*.js'
        ],

        reporters: ['progress'],

        logLevel: config.LOG_INFO,

        singleRun: true,

        browsers: ['Chrome']
    });
};
