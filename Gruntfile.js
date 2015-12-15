module.exports = function(grunt) {

    var appConfig = {
        dir: 'app',
        built: 'built',
        sass: 'app/styles/sass',
        css: 'app/styles/css',
        js: 'app/scripts'
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
            dist: {
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

        // Copy all files (html, css) into the built folder
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['*.html'],
                        dest: '<%= app.built %>'
                    },
                    {
                        expand: true,
                        cwd: 'app/styles',
                        src: ['style.css'],
                        dest: '<%= app.built %>'
                    }
                ]
            }
        },

        // Filewatcher for html, css, js and livereload built files
        watch: {
            html: {
                files: ['<%= app.dir %>/*.html'],
                tasks: ['copy']
            },
            css: {
                files: ['<%= app.sass %>/*.{scss,sass}'],
                tasks: ['compass', 'postcss', 'concat', 'copy']
            },
            js: {
                files: [],
                tasks: []
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

        // Minifies js files
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    /*
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    */

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');

    // Default task(s).
    grunt.registerTask('default', [
        'clean',
        'copy',
        'compass',
        'postcss',
        'concat',
        'watch'
    ]);


};