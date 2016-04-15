module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    //require('time-grunt')(grunt);

    var appConfig = {
        dir: 'app',
        built: 'built',
        sass: 'app/sass',
        js: 'app/js',
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
                src: '<%= app.built %>/*.css'
            }
        },

        // Copy all files (html, css, js, images) into the built folder
        copy: {
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['*.html'],
                        dest: '<%= app.built %>'
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/styles',
                        src: ['style.css'],
                        dest: '<%= app.built %>'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
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
                tasks: ['sass', 'postcss', 'concat', 'copy:css']
            },
            ts: {
                files: ['<%= app.js %>/**/*.ts'],
                tasks: ['ts']
            },
            tslint: {
                files: [
                    "<%= app.js %>/**/*.ts",
                    "!<%= app.js %>/_all.ts",
                    "!<%= app.js %>/libs/**/*.ts"
                ],
                tasks: ['tslint']
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
                    '<%= app.built %>/{,*/}*.{html,css,js,png,jpg,jpeg,gif}'
                ]
            }
        },

        ts: {
            default: {
                src: ['<%= app.js %>/**/*.ts'],
                out: '<%= app.built %>/app.js',
                reference: '<%= app.js %>/_all.ts',
                options: {
                    fast: 'never',
                    target: 'es5'
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
                    "<%= app.js %>/**/*.ts",
                    "!<%= app.js %>/_all.ts",
                    "!<%= app.js %>/libs/**/*.ts"
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


        serve: {
            options: {
                port: 9000,
                output: 'stdout',
                serve: {
                    path: '<%= app.built %>'
                }
            }
        },

        exec: {
            updateModules: {
                cmd: 'npm install'
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

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks("grunt-tslint");
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-karma');

    grunt.loadNpmTasks('grunt-serve');

    grunt.loadNpmTasks('grunt-exec');

    // Update node_modules
    grunt.registerTask('update', 'exec:updateModules');

    // Default task(s).
    grunt.registerTask('default', [
        'build',
        'watch'
    ]);

    // Only build without watch task
    grunt.registerTask('build', [
        'update',
        'clean',
        'tslint',
        'sass',
        'postcss',
        'ts',
        'uglify',
        'copy'
    ]);

    // Run Jasmine Tests with Karma
    grunt.registerTask('test', 'karma');
};