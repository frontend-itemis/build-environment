module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    //require('time-grunt')(grunt);

    var appConfig = {
        dir: 'app',
        built: 'built',
        sass: 'app/styles/sass',
        css: 'app/styles/css',
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

        // Compiles the sass files to normal css
        compass: {
            build: {
                options: {
                    sourcemap: true,
                    sassDir: '<%= app.sass %>',
                    cssDir: '<%= app.css %>',
                    environment: 'production'
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
                src: '<%= app.css %>/*.css'
            }
        },

        // Concatenates all css files -> style.css
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['<%= app.css %>/*.css'],
                dest: '<%= app.dir %>/styles/style.css'
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
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/js',
                        src: ['app.min.js'],
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
                mangle: false
            },
            build: {
                src: '<%= app.js %>/app.js',
                dest: '<%= app.js %>/app.min.js'
            }
        },

        // Filewatcher for html, css, js, images and livereload built files
        watch: {
            html: {
                files: ['<%= app.dir %>/*.html'],
                tasks: ['copy:html']
            },
            css: {
                files: ['<%= app.sass %>/*.{scss,sass}'],
                tasks: ['compass', 'postcss', 'concat', 'copy:css']
            },
            ts: {
                files: ['<%= app.js %>/**/*.ts'],
                tasks: ['typescript']
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
                files: ['<%= app.js %>/app.js'],
                tasks: ['uglify', 'copy:js']
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

        typescript: {
            base: {
                src: ['<%= app.js %>/**/*.ts'],
                dest: '<%= app.js %>/app.js',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    rootDir: '<%= app.js %>',
                    sourceMap: false,
                    declaration: false
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks("grunt-tslint");
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-karma');

    // Default task(s).
    grunt.registerTask('default', [
        'clean',
        'compass',
        'postcss',
        'concat',
        'copy',
        'watch'
    ]);

    // Only build without watch task
    grunt.registerTask('build', [
        'clean',
        'compass',
        'postcss',
        'concat',
        'copy'
    ]);

    // Run Jasmine Tests with Karma
    grunt.registerTask('test', 'karma');

    //grunt.registerTask('sprites', '');
};