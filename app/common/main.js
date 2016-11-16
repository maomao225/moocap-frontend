'use strict';

// Require.js allows us to configure shortcut alias
require.config({

    // The root path to use for all module lookups
    baseUrl: '/',

    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        
        jquery: {
            exports: '$'
        },

        underscore: {
            exports: '_'
        },

        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },

        'bootstrap/affix' : {deps: ['jquery'],exports: '$.fn.affix' },
        'bootstrap/alert': { deps: ['jquery'], exports: '$.fn.alert' },
        'bootstrap/button': { deps: ['jquery'], exports: '$.fn.button' },
        'bootstrap/carousel': { deps: ['jquery'], exports: '$.fn.carousel' },
        'bootstrap/collapse': { deps: ['jquery'], exports: '$.fn.collapse' },
        'bootstrap/dropdown': { deps: ['jquery'], exports: '$.fn.dropdown' },
        'bootstrap/modal': { deps: ['jquery'], exports: '$.fn.modal' },
        'bootstrap/popover': { deps: ['jquery'], exports: '$.fn.popover' },
        'bootstrap/scrollspy': { deps: ['jquery'], exports: '$.fn.scrollspy' },
        'bootstrap/tab': { deps: ['jquery'], exports: '$.fn.tab' },
        'bootstrap/tooltip': { deps: ['jquery'], exports: '$.fn.tooltip' },
        'bootstrap/transition': { deps: ['jquery'], exports: '$.support.transition' },

        'xeditable': {deps: ['jquery'], exports: '$.fn.editable'},
        'fileupload': {deps: ['iframe_transport']},
        'datetimepicker': {deps: ['jquery'], exports: '$.fn.datetimepicker'}
    },

    // Path mappings for module names not found directly under baseUrl
    paths: {
        jquery: 'bower_components/jquery/dist/jquery.min',
        underscore: 'bower_components/underscore/underscore-min',
        backbone: 'bower_components/backbone/backbone',
        bootstrap: 'bower_components/bootstrap-sass/assets/javascripts/bootstrap',
        xeditable: 'common/plugin/editable/bootstrap-editable',
        'fileupload': 'common/plugin/fileupload/jquery.fileupload',
        'jquery.ui.widget': 'common/plugin/fileupload/jquery.ui.widget',
        'iframe_transport': 'common/plugin/fileupload/jquery.iframe-transport',
        moment: 'common/plugin/moment/moment',
        datetimepicker: 'bower_components/smalot-bootstrap-datetimepicker/js/bootstrap-datetimepicker',
        text: 'bower_components/text/text',
        'bootstrapValidator' : 'bower_components/bootstrapvalidator/dist/js/bootstrapValidator.min'
    }
});

require(['jquery','common/app'], function($, app) {
        app.initialize();
});