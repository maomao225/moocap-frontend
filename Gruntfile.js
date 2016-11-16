// Generated on 2014-06-04 using generator-webapp 0.4.9
'use strict';


// LiveReload的默认端口号，你也可以改成你想要的端口号
var lrPort = 35731;

// 初始化livereload
var lrSnippet = require('connect-livereload')({port: lrPort});


var mountFolder = function(connect, dir ) {
    return connect.static(require('path').resolve(dir));
};



/**公用模块**/
var mainIncludedModules = [
    'jquery',
    'underscore',
    'backbone',
    'text',
    'bootstrap',
    'xeditable',
    'datetimepicker',
    'common/util/util',
    'common/models/userModel',
    'common/plugin/pagination/jquery.twbsPagination',
    'common/ui/listBaseView',
    'common/ui/listItemBaseView',
    'common/models/itemBaseModel',
    'common/models/listCollectionBase',
    'bootstrap/tooltip',
    'bootstrap/popover',
    'common/plugin/button/jquery.button',
    'bootstrapValidator'
];


// 所有模块名称列表
var moduleNames = [
    'information',
    'course',
    'exam',
    'order',
    'school',
    'student',
    'sysadmin',
    'user'
];

// 静态文件CDN域名的根目录
// 编译发布时替换require.config.baseUrl
//发布到远程，js和html 不在一个域下
var cdnRoot;
var SERVER_LIST = {
    dev: 'http://www.moocap.org.cn/cms/',
    beta: 'http://www.moocap.org.cn/cms/',
    prod: 'http://www.moocap.org.cn/cms/'
};

//联调时rewrite的地址
//--dev-type=coupling
var coupling_rewrite_url = {
    'get!^/api/cms/(.*)' : 'http://www.moocap.org.cn/api/cms/$1',
    'post!^/api/cms/(.*)' : 'http://www.moocap.org.cn/api/cms/$1',
    'put!^/api/cms/(.*)' : 'http://www.moocap.org.cn/api/cms/$1',
    'patch!^/api/cms/(.*)' : 'http://www.moocap.org.cn/api/cms/$1',
    'delete!^/api/cms/(.*)' : 'http://www.moocap.org.cn/api/cms/$1'
};


// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    //发布类型 dev、beta、prod、 prepare
    //使用 --deploy-type 
    switch (grunt.option('deploy-type')) {
        case 'dev':
            cdnRoot = SERVER_LIST.dev;
            break;
        case 'beta':
            cdnRoot = SERVER_LIST.beta;
            break;
        case 'prepare':
        case 'prod':
            cdnRoot = SERVER_LIST.prod;
            break;
        default:
            cdnRoot = '/';
            break;
    }

    //node module目录
    var nodeModulesDir = grunt.option('node-modules');

    // grunt-connect-route， ajax跨域会使用到
    var routeUtils = './build/lib/utils';
    var rewriteRulesSnippet = require(routeUtils).rewriteRequest;

    //加载mock配置文件
    var mockfile = require('./mockfile.json');


    require('matchdep').filterDev('grunt-*').forEach(function(nodeModule) {
        if (nodeModulesDir) {
            var cwd = process.cwd();
            process.chdir(nodeModulesDir);
            grunt.loadNpmTasks(nodeModule);
            process.chdir(cwd);
        } else {
            grunt.loadNpmTasks(nodeModule);
        }
    });

    // Define the configuration for all the tasks
    var initConfig = {

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/**/{,*/}*.{scss,sass}'],
                tasks: ['sass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%= config.app %>/**/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: lrPort
                },
                files: [
                    '<%= config.app %>/*.html',
                    '<%= config.app %>/**/{,*/}*.js',
                    '<%= config.app %>/**/{,*/}*.scss',
                    '<%= config.app %>/{,*/}*.html',
                    '<%= config.app %>/**/{,*/}*.tpl',
                    '.tmp/{,*/}*.css',
                    '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,ttf,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: false, //由open插件打开浏览器
                // Change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0',
                localhost: '127.0.0.1'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, config.app),
                            rewriteRulesSnippet
                        ];
                    }
                }
            },
            test: {
                options: {
                    open: false,
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware:function(connect){
                        return [
                            mountFolder(connect, config.dist),
                            rewriteRulesSnippet
                        ];
                    },
                    livereload: false
                }
            },

            mock: {
                 options: {
                    open: false,
                    port: 8080,
                    middleware: function(connect, options, middlewares) {
                        return [
                            mountFolder(connect, config.app),
                            function(req, res, next){
                                var url = require("url");
                                var pathname = url.parse(req.url).pathname;
                                var path = require('path').resolve('') + pathname;
                                console.log('mock path:' + path);
                                var content = grunt.file.read(path);

                                res.end(content);
                            }
                        ];
                    }
                }
            },

            rules: grunt.option('dev-type') === 'coupling' ? coupling_rewrite_url : mockfile
        },

        // 启动本地web服务器
        open: {
            server: {
                path: 'http://<%=connect.options.localhost%>:<%=connect.options.port%>'
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp',

            prod: [
                '<%=config.dist%>/css/{,*/}*.{scss,map}',
                // '<%=config.dist%>/css/{images,bootstrap}',
                '<%=config.dist%>/refs/index.html',
                '<%=config.dist%>/build.txt',
                '<%=config.dist%>/versions.mapping',
                '<%=config.dist%>/**/*.js.map',
                '!<%=config.dist%>/sourcemap/*.js.map'
            ]
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '!Gruntfile.js',
                '<%= config.app %>/**/{,*/}*.js',
                '!<%= config.app %>/bower_components/**/*.js',
                'test/spec/{,*/}*.js'
            ]
        },

        // Mocha testing framework configuration options
        /*
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        */

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            /*
            options: {
                loadPath: [
                    './'
                ]
            },
            */
            dist: {
                options: {
                    outputStyle: 'expanded',
                    precision: 10,
                    sourceMap: true,
                    includePaths: ['<%= config.app %>/css/']
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/css/',
                    src: ['{,*/}*.scss'],
                    dest: '<%=config.dist%>/css',
                    ext: '.css',
                    styles: 'compressed'
                }]
            },
            server: {
                options: {
                    outputStyle: 'expanded',
                    precision: 10,
                    sourceMap: true,
                    includePaths: ['<%= config.app %>/css/']
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/css',
                    src: ['{,*/}*.scss'],
                    dest: '.tmp/css',
                    ext: '.css'
                }]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: '.tmp/',
                    src: '{,*/}*.css',
                    dest: '.tmp/css/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%=config.dist%>/css/',
                    src: '{,*/}*.css',
                    dest: '<%=config.dist%>/css/'
                }]
            }
        },

        requirejs: {
            dist: {
                // Options:	https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out`	is set by grunt-usemin
                    baseUrl: config.app, // + '/js',
                    dir: config.dist,
                    optimize: 'uglify2',
                    // TODO: Figure	out	how	to make	sourcemaps work	with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    generateSourceMaps: true,
                    // required	to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    //useStrict: true,
                    //wrap:	true,
                    inlineText: true,
                    findNestedDependencies: true,
                    optimizeAllPluginResources: true,
                    skipDirOptimize: true,
                    //移除已经打包的资源
                    removeCombined: true,
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                    /*
                    uglify2: {
                        //Example of a specialized config. If you are fine
                        //with the default options, no need to specify
                        //any of these properties.
                        output: {
                            beautify: true,
                            bracketize : true,
                            semicolons: true,
                        },
                        compress: {
                            negate_iife : false,
                            dead_code: false,
                            properties: false,
                            if_return: false,
                            comparisons: false,
                            keep_fargs: true,
                            evaluate: false,
                            cascade: false,
                            conditionals: false,
                            booleans: false,
                            hoist_vars: true,
                            join_vars : false,
                            sequences: false,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: true,
                        mangle: false
                    },*/

                    mainConfigFile: '<%=config.app%>/common/main.js',

                    modules: [],

                    onModuleBundleComplete: function(data){

                    }
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    '<%=config.dist%>/common/basket/basket.js': ['<%=config.dist%>/common/basket/basket.js']
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [

                        //'<%= config.dist %>/scripts/{,*/}*.js',
                        //'<%= config.dist %>/styles/{,*/}*.css',
                        //'<%= config.dist %>/images/{,*/}*.*',
                        //'<%= config.dist %>/styles/fonts/{,*/}*.*',
                        //'<%= config.dist %>/*.{ico,png}',

                        '<%=config.dist%>/bower_components/requirejs/require.js',
                        '<%=config.dist%>/common/basket/basket.js',
                        //'<%=config.dist%>/{' + moduleNames.join(',') + '}/*.js',

                        //'<%=config.dist%>/common/main.js',
                        '<%=config.dist%>/**/*.js.map',
                        '<%=config.dist%>/css/{,*/}*.css',
                        '<%=config.dist%>/common/**/*.{png,jpg,jpeg,gif,ttf}'
                    ]
                }
            },

            main: {
                files: {
                    src: [
                        '<%=config.dist%>/common/main.js'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: ['<%= config.app %>/*.html']
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                /*js，css等的所在位置*/
                assetsDirs: ['<%= config.dist%>', '<%= config.dist%>/common'].concat(
                    moduleNames.map(function(moduleName) {
                        return '<%= config.dist%>/modules/' + moduleName;
                    })
                ),
                patterns: {
                    jade: [
                        [
                          /(common\/main)/gm,
                          'Update the HTML with requirejs',
                          function (m) {
                            console.log('+++++++++++++++++++++++++++++++');
                            console.log(m);
                            console.log('+++++++++++++++++++++++++++++++');
                            return m.match(/\.js$/) ? m : m + '.js';
                          },
                          function (m) {
                            console.log('----------------------------------');
                            console.log(m);
                            console.log('----------------------------------');
                            return m.replace('.js', '');
                          }
                        ],

                        [
                            /(css\/main\.css)/gm,
                            'update html file with basket require'
                        ]
                    ],
                    js: [],
                    sourcemap: [
                        [
                            /sourceMappingURL=(\w+\.js\.map)/,
                            'Update the JavaScript with the new source maps filenames'
                        ]
                    ],
                }
            },
            jade: ['<%= config.dist %>/{,*/}*.html'],
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/css/{,*/}*.css'],
            js: [
                '<%=config.dist%>/{common,' + moduleNames.map(function(moduleName) {return 'modules/' + moduleName;}).join(',') + '}/*.js',
                '<%=config.dist%>/common/basket/*.js'
            ],
            sourcemap: ['<%= config.dist%>/{common,' + moduleNames.map(function(moduleName) {return 'modules/' + moduleName;}).join(',') + '}/*.js'],
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },



        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%=config.app%>',
                    dest: '<%=config.dist%>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                    ]
                },{
                    expand: true,
                    dot: true,
                    cwd: '<%=config.app%>/bower_components/bootstrap-sass/assets/fonts',
                    dest: '<%=config.dist%>/css/fonts',
                    src: '{,*/}*.{eot,svg,ttf,woff,woff2}'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%=config.app%>/css',
                    dest: '.tmp/css/',
                    src: '{,*/}*.css'
                },{
                    expand: true,
                    dot: true,
                    cwd: '<%=config.app%>/bower_components/bootstrap-sass/assets/fonts',
                    dest: '.tmp/css/fonts',
                    src: '{,*/}*.{eot,svg,ttf,woff,woff2}'
                }]
            },
            sourcemap: {
                expand: true,
                flatten: true,
                cwd: '<%=config.dist%>',
                dest: '<%=config.dist%>/sourcemap',
                src: [
                    '**/*.js.map'
                ]
            },
            prod: {
                expand: true,
                dot: true,
                cwd: '<%=config.dist%>',
                dest: '<%=config.dist%>/refs',
                src: ['*.html', 'versions.mapping']
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'sass:server',
                'copy:css'
            ],
            test: [
                'copy:css'
            ],
            dist: [
                'sass:dist',
                'copy:dist',
                'imagemin',
                'svgmin'
            ]
        },

        /**
         * Embedding images as base64 data URIs inside your stylesheets
         *
         * homepage:
         *   https://npmjs.org/package/grunt-image-embed
         */
        imageEmbed: {
            dist: {
                expand: true,
                cwd: '<%=config.dist%>/css',
                dest: '<%=config.dist%>/css',
                src: '*.css'
            }
        },

        // css压缩功能配置
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) css/main.css -->
            //
            dist: {
                files:  {
                    '<%=config.dist%>/css/main.css': [
                        '<%=config.dist%>/css/main.css'
                    ],
                    '<%=config.dist%>/css/bootstrap.css': [
                        '<%=config.dist%>/css/bootstrap.css'
                    ]
                }
            }
        },

        /**
         * search and replace text content of files based on regular expression patterns
         * 替换index.html、xxxxxxxx.main.js中相关地址为CDN地址
         */
        'regex-replace': {
            html: {
                src: [
                    '<%=config.dist%>/index.html'
                ],
                actions: [
                    // 替换index.html中css文件地址
                    {
                        name: 'Replace css src in index.html',
                        search: /(css\/[a-zA-Z0-9.\/]+?\.css)/g,
                        replace: cdnRoot + '$1'
                    },

                    // 替换index.html中app入口js地址
                    {
                        name: 'Replace data-main attribute in index.html',
                        search: 'data-main="',
                        replace: 'data-main="' + cdnRoot
                    },

                    // 替换index.html中requirejs文件地址
                    {
                        name: 'Replace requirejs src in index.html',
                        search: 'src="bower_components/requirejs/',
                        replace: 'src="' + cdnRoot + 'bower_components/requirejs/'
                    }
                ]
            },
            htmldev: {
                src: [
                    '<%=config.dist%>/index.dev.html'
                ],
                actions: [
                    // 替换index.html中css文件地址
                    {
                        name: 'Replace css src in index.html',
                        search: /(css\/[a-zA-Z0-9.\/]+?\.css)/g,
                        replace: SERVER_LIST.dev + '$1'
                    },

                    // 替换index.html中app入口js地址
                    {
                        name: 'Replace data-main attribute in index.html',
                        search: 'data-main="',
                        replace: 'data-main="' + SERVER_LIST.dev
                    },

                    // 替换index.html中requirejs文件地址
                    {
                        name: 'Replace requirejs src in index.html',
                        search: 'src="bower_components/requirejs/',
                        replace: 'src="' + SERVER_LIST.dev + 'bower_components/requirejs/'
                    }
                ]
            },
            htmlbeta: {
                src: [
                    '<%=config.dist%>/index.beta.html'
                ],
                actions: [
                    // 替换index.html中css文件地址
                    {
                        name: 'Replace css src in index.html',
                        search: /(css\/[a-zA-Z0-9.\/]+?\.css)/g,
                        replace: SERVER_LIST.beta + '$1'
                    },

                    // 替换index.html中app入口js地址
                    {
                        name: 'Replace data-main attribute in index.html',
                        search: 'data-main="',
                        replace: 'data-main="' + SERVER_LIST.beta
                    },

                    // 替换index.html中requirejs文件地址
                    {
                        name: 'Replace requirejs src in index.html',
                        search: 'src="bower_components/requirejs/',
                        replace: 'src="' + SERVER_LIST.beta + 'bower_components/requirejs/'
                    }
                ]
            },
            htmlprod: {
                src: [
                    '<%=config.dist%>/index.prod.html'
                ],
                actions: [
                    // 替换index.html中css文件地址
                    {
                        name: 'Replace css src in index.html',
                        search: /(css\/[a-zA-Z0-9.\/]+?\.css)/,
                        replace: SERVER_LIST.prod + '$1'
                    },

                    // 替换index.html中app入口js地址
                    {
                        name: 'Replace data-main attribute in index.html',
                        search: 'data-main="',
                        replace: 'data-main="' + SERVER_LIST.prod
                    },

                    // 替换index.html中requirejs文件地址
                    {
                        name: 'Replace requirejs src in index.html',
                        search: 'src="bower_components/requirejs/',
                        replace: 'src="' + SERVER_LIST.prod + 'bower_components/requirejs/'
                    }
                ]
            },
            js: {
                src: [
                    '<%=config.dist%>/common/*.main.js'
                ],
                actions: [
                    // 替换xxxxxxxx.main.js中requirejs配置地址
                    {
                        name: 'Replace baseUrl in main.js',
                        search: 'baseUrl:"/"',
                        replace: 'baseUrl:"' + cdnRoot + '"'
                    }
                ]
            },
            printFont: {
                src: [
                    '<%=config.dist%>/modules/exam/*.examAction.js'
                ],
                actions: [
                    // 替换JS中字体地址
                    {
                        name: 'Replace font url in examAction.js',
                        search: /(url\()(\/fonts\/[^)]+\))/ig,
                        replace: '$1' + cdnRoot + '/' +'$2'
                    },
                ]
            },
            css: {
                src: [
                    '<%=config.dist%>/css/*.main.css'
                ],
                actions: [
                    // 替换CSS文件中图片、字体地址
                    {
                        name: 'Replace background url in main.css',
                        search: /(url\()((?!(http:)?\/\/|data:).+?)(\))/ig,
                        replace: '$1' + cdnRoot + 'css/' +'$2$3'
                    },
                ]
            }
        },


        manifest: {
            generate: {
              options: {
                basePath: 'dist',
                cache: [
                    // 'http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css'
                ],
                //network: ['http://*', 'https://*'],
                network: ['*'],
                fallback: [],
                exclude: [],
                preferOnline: true,
                verbose: true,
                timestamp: true,
                hash: true,
                master: ['index.html'],
                process: function(path) {
                  //return path.substring('dist/'.length);
                  return path;
                }
              },
              src: [
                '*.html',
                //'common/**/*.js',
                //'library/**/*.js',
                //'css/{,*/}*.css',
                'images/**/*.*'
            ],
              dest: '<%=config.dist%>/manifest.appcache'
            }
        }


    };

    /*** 部分和模块名称相关的配置参数通过编程来控制  ***/

    // usemin支持传入前置/后置函数，处理匹配中的文件名
    var filterIn = function(m) {
        return m + '.js';
    };
    var filterOut = function(m) {
        return m.replace('.js', '');
    };

    // 遍历模块名称，设置各模块特有配置
    moduleNames.forEach(function(moduleName) {
        // rev后，更新requirejs对模块引用
        // 需要更新main.js和{$module}/{$module}Action.js
        initConfig.usemin.options.patterns.js.push([
            new RegExp('"(modules\/' + moduleName + '\/' + moduleName + 'Action)"', 'g'),
            'Update the JavaScript with RequireJS reference ' + moduleName + '/' + moduleName + 'Action',
            filterIn,
            filterOut
        ]);

        // 各模块Action.js打包配置项
        // 排除main.js已经打包的模块
        initConfig.requirejs.dist.options.modules.push({
            name: 'modules/' + moduleName + '/' + moduleName + 'Action',
            exclude: mainIncludedModules
        });


        initConfig.rev.dist.files.src.push(config.dist + '/modules/' + moduleName + '/' + moduleName + 'Action.js');

        //html5 缓存配置, 不缓存tpl
        //initConfig.manifest.generate.src.push(moduleName + '/**/*.{js,css,jpg,png,gif}');
        initConfig.manifest.generate.src.push(moduleName + '/**/*.{jpg,png,gif}');
    });

    // main.js打包配置项
    // main的配置必须是modules对象的最后一项
    initConfig.requirejs.dist.options.modules.push({
        name: 'common/main',
        insertRequire: ['jquery', 'text'],
        include: mainIncludedModules,
        exclude: moduleNames.map(function(moduleName) {
            return 'modules/' + moduleName + '/' + moduleName + 'Action';
        }),
        override: {
            findNestedDependencies: false
        }
    });

        // 生成需要jenkins校验URL的versions.mapping文件
    grunt.registerTask('versionsMapping', function() {
        var content = grunt.file.read(config.dist + '/index.html').toString();
        var cssReg = new RegExp('(css/.*?.main.css)');
        var jsReg = new RegExp('data-main="(.*?common/[0-9a-z]*.main)"');
        var ulrList = [];
        var matches = content.match(cssReg);
        if (matches && matches[1]) {
            ulrList.push(matches[1]);
        }
        matches = content.match(jsReg);
        if (matches && matches[1]) {
            ulrList.push(matches[1] + '.js');
        }
        grunt.file.write('/' + config.dist + '/versions.mapping', ulrList.join('\n'));
    });

    grunt.registerTask('cdn', function() {
        // 为每种环境生成index
        ['dev', 'beta', 'prod'].forEach(function(type) {
            grunt.file.copy(config.dist + '/index.html', config.dist + '/index.' + type + '.html');
            grunt.task.run('regex-replace:html' + type);
        });

        grunt.task.run(['regex-replace:js', 'regex-replace:css', 'regex-replace:printFont']);
    });


    grunt.initConfig(initConfig);

    //加载任务
    grunt.loadTasks( 'build/tasks' );

    // 注册启动本地web服务器任务
    grunt.registerTask('server', function ()    {
        var args = Array.prototype.slice.call(arguments, 0);
        var tasks = [];

        // 编译并预览编译后的结果
        if (args.indexOf('dist') !== -1) {
            // 直接预览dist目录，不重新编译
            if (args.indexOf('nobuild') === -1) {
                tasks.push('build');
            }
            // 不使用url转发功能
            if (args.indexOf('norewrite') === -1) {
                tasks.push('configureRewriteRules');
            }
            // webserver启动后不自动打开浏览器
            if (args.indexOf('noopen') === -1) {
                tasks.push('open');
            }
            tasks.push(
                'connect:dist:keepalive'
            );
        } else {
            tasks = [
                'clean:server',
                'concurrent:server',
                'autoprefixer:dev'
            ];
            if (args.indexOf('norewrite') === -1) {
                tasks.push('configureRewriteRules');
            }
            tasks.push('connect:livereload');
            if(args.indexOf('mock') !== -1){
                tasks.push('connect:mock');
            }
            if (args.indexOf('noopen') === -1) {
                tasks.push('open');
            }
            tasks.push('watch');
        }

        //console.log(tasks);
        grunt.task.run(tasks);
    });

    // 注册运行测试用例任务
    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test'//,
        //'mocha'
    ]);

    // 注册代码编译任务
    grunt.registerTask('build', function(){
        var args = Array.prototype.slice.call(arguments, 0);
        var tasks = [];

        tasks = [
            'clean:dist',
            'useminPrepare',
            'requirejs',
            'concurrent:dist',
            'autoprefixer:dist',
            'cssmin',
            //'imageEmbed',
            'uglify:dist',
            'rev:dist',
            'usemin',
            'rev:main',
            'usemin:html',
            'usemin:jade',
            'cdn',
            'copy:sourcemap',
            'versionsMapping',
            'copy:prod',
            'clean:prod',
            'manifest:generate'
        ];

        grunt.task.run(tasks);
    });

    // 注册Grunt默认任务
    grunt.registerTask('default', [
        'jshint',
        //'test',
        'build'
    ]);
};
