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

        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['app/styles/css/*.css'],
                dest: 'built/style.css'
            }
        },

        clean: ['<%= app.built %>/*'],

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['*.html'],
                        dest: '<%= app.built %>'
                    }
                ]
            }
        },

        watch: {
            html: {
                files: ['<%= app.dir %>/*.html'],
                tasks: ['copy']
            },
            css: {
                files: ['<%= app.sass %>/*.{scss,sass}'],
                tasks: ['compass', 'concat']
            },
            js: {
                files: [],
                tasks: []
            }
        },

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

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'compass', 'concat', 'watch']);
};