module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    //require('time-grunt')(grunt);

    var appConfig = {
        dir: 'app',
        built: 'built',
        sass: 'app/sass',
        js: 'app/js',
        ts: 'app/ts',
        images: 'app/images'
    };

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Project settings
        app: appConfig,

        // Empties built folder to start fresh
        clean: ['<%= app.built %>/*'],

        // Compiles the scss files to normal css
        sass: {
            build: {
                options: {
                    sourceMap: true
                },
                files: {
                    '<%= app.built %>/style.css': '<%= app.sass %>/style.scss'
                }
            }
        },

        sasslint: {
            /*
            options: {
                configFile: 'config/.sass-lint.yml',
            },
            */
            target: '<%= app.sass %>/**/*.scss'
        },

        // Post processing css incl. autoprefixer
        postcss: {
            options: {
                map: true, // inline sourcemaps

                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            build: {
                src: '<%= app.built %>/style.css'
            }
        },

        // Copy all files (html, css, js, images) into the built folder
        copy: {
            html: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= app.dir %>/',
                        src: ['*.html'],
                        dest: '<%= app.built %>'
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: './',
                        src: ['jspm_packages/**', 'jspm_packages/**/*', 'jspm.config.js'],
                        dest: '<%= app.built %>'
                    }
                ]
            },
            ts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= app.ts %>',
                        src: './**',
                        dest: '<%= app.built %>/ts'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= app.dir %>/',
                        src: ['images/*'],
                        dest: '<%= app.built %>'
                    }
                ]
            }
        },

        // Minifies js files
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false,
                sourceMap: true,
                sourceMapIn: '<%= app.built %>/app.js.map'
            },
            build: {
                src: '<%= app.built %>/app.js',
                dest: '<%= app.built %>/app.min.js'
            }
        },

        // Filewatcher for html, css, js, images and livereload built files
        watch: {
            html: {
                files: ['<%= app.dir %>/*.html'],
                tasks: ['copy:html']
            },
            css: {
                files: ['<%= app.sass %>/**/*.{scss,sass}'],
                tasks: ['sass', 'postcss', 'concat']
            },
            tslint: {
                files: [
                    "<%= app.ts %>/**/*.ts",
                    "!<%= app.ts %>/_all.ts",
                    "!<%= app.ts %>/libs/**/*.ts"
                ],
                tasks: ['tslint', 'copy:ts']
            },
            js: {
                files: ['<%= app.built %>/app.js'],
                tasks: ['uglify']
            },
            images: {
                files: ['<%= app.images %>/*.{png,jpg,jpeg,gif}'],
                tasks: ['copy:images']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= app.built %>/{,*/}*.{html,css,js,ts,png,jpg,jpeg,gif}'
                ]
            }
        },
        
        jspm: {
            monolithicBundle: {
                options: {
                    sfx: true,
                    minify: true,
                    mangle: true,
                    sourceMaps: false
                },
                files: {
                    "built/system.js": "jspm.config.js"
                }
            }
        },

        tslint: {
            options: {
                // can be a configuration object or a filepath to tslint.json
                configuration: "tslint.json"
            },
            files: {
                src: [
                    "<%= app.ts %>/**/*.ts",
                    "!<%= app.ts %>/_all.ts",
                    "!<%= app.ts %>/libs/**/*.ts"
                ]
            }
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },


        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '<%= app.built %>',
                    keepalive: true,
                    livereload: true,
                    open: true
                }
            }
        },

        concurrent: {
            liveTarget: {
                tasks: ['connect', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-sass-lint');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks("grunt-tslint");
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-jspm-builder');

    // Default task(s).
    grunt.registerTask('default', [
        'build',
        'concurrent:liveTarget'
    ]);

    // Only build without watch task
    grunt.registerTask('build', [
        'clean',
        'copy',
        'tslint',
        'sasslint',
        'sass',
        'postcss',
        'jspm',
        //'uglify',
    ]);

    // Run Jasmine Tests with Karma
    grunt.registerTask('test', 'karma');
};