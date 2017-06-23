/* global requirejs, define */
/* jshint camelcase: false */
/* jshint unused: false */

'use strict';
/**
* This file sets up the basic module libraries you'll need
* for your application.
*/
requirejs.onError = function(err) {
    //console.log(err.requireType);
    if (err.requireType === 'timeout') {
        //console.error('modules: ' + err.requireModules);
    }
    throw err;
};
/**
* RequireJS Config
* This is configuration for the entire application.
*/
require.config({
    enforceDefine: false,
    xhtml: false,
    //Cache buster
    //urlArgs : '_=' + Date.now(),
    waitSeconds: 15,
    config: {
        text: {
            env: 'xhr'
        }
    },
    paths: {
        'bower_components': '../bower_components',
        'px-datasource': '../bower_components/px-datasource/dist/px-datasource.min',

        'ng-bind-polymer': '../bower_components/ng-bind-polymer/ng-bind-polymer',

        // Named References
        config: './config',

        app: './app',

        // angularjs + modules
        angular: '../bower_components/angular/angular',
        'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'angular-route': '../bower_components/angular-route/angular-route',

        // angular ui router
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',

        // Require JS Plugins
        text: '../bower_components/requirejs-plugins/lib/text',
        order: '../bower_components/requirejs-plugins/src/order',
        async: '../bower_components/requirejs-plugins/src/async',
        depend: '../bower_components/requirejs-plugins/src/depend',
        font: '../bower_components/requirejs-plugins/src/font',
        goog: '../bower_components/requirejs-plugins/src/goog',
        image: '../bower_components/requirejs-plugins/src/image',
        json: '../bower_components/requirejs-plugins/src/json',
        mdown: '../bower_components/requirejs-plugins/src/mdown',
        noext: '../bower_components/requirejs-plugins/src/noext',
        propertyParser: '../bower_components/requirejs-plugins/src/propertyParser',
        Markdown: '../bower_components/requirejs-plugins/lib/Markdown.Converter',
        css: '../bower_components/require-css/css',
        'css-builder': '../bower_components/require-css/css-builder',
        'normalize': '../bower_components/require-css/normalize',

        lodash: '../bower_components/lodash/dist/lodash.min',
        jquery: '../bower_components/jquery/dist/jquery.min',
        jqueryLoad: '../components/jquery/dist/jquery.showLoading',
        wangEditor:'../components/wangEditor/js/wangEditor',
        // vudio:'../components/vudio.js-master/vudio',
        recorder:'../components/recorder/HZRecord',
        jqueryMd5: '../components/jquery/dist/jQuery.md5',
        jqueryChart: '../components/jquery/dist/jquery.circliful.min',
        angularTranslate:'../bower_components/angular-translate/angular-translate',
        angularTranslateStatic:'../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
        // md5Tool: '../bower_components/md5/md5Tool',

    },
    priority: [

        'jquery',

        'recorder',
        'jqueryMd5',
        'jqueryChart',
        'jqueryLoad',
        'angular',
        // 'angularTranslate',
        // 'angularTranslateStatic',
        'angular-resource',
        'angular-route'

    ],
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'wangEditor': {
            deps: ['jquery'],
            exports: 'wangEditor'
        },
        'angular-route': ['angular'],
        'angular-resource': ['angular', 'angular-route', 'angular-ui-router'],
        'angular-sanitize': ['angular'],
        'angular-mocks': {
            deps: ['angular', 'angular-route', 'angular-resource', 'angular-ui-router'],
            exports: 'mock'
        },
        'angular-ui-router': ['angular'],
        underscore: {
            exports: '_'
        },
        'px-datasource': {
            deps: ['angular', 'lodash']
        },
        'app': {
            deps: ['angular']
        },
        'angularTranslate': {
            deps: ['angular']
        },
        'angularTranslateStatic': {
            deps: ['angular', 'angularTranslate']
        }

    }
});

