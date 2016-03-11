module.exports = function(grunt) {

    grunt.initConfig({
        /**
         * Get package meta data
         */
        pkg: grunt.file.readJSON('package.json'),
        /**
         * Set path
         */
        paths: {
            src: 'src',
            public: 'public',
            css: {
                src: '<%= paths.src %>/css',
                dest: '<%= paths.public %>/css',
            },
            sass: {
                src: '<%= paths.src %>/sass',
                dest: '<%= paths.src %>/css',
            }
        },
        /**
         * Project banner
         */
        tag: {
            banner: '/*!\n' +
                    ' * <%= pkg.name %>\n' +
                    ' * <%= pkg.url %>\n' +
                    ' * @author <%= pkg.author %>\n' +
                    ' * @version <%= pkg.version %>\n' +
                    ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
                    ' */\n'
        },

        sass: {
            dist: {
                files: {
                    '<%= paths.sass.dest %>/style.css': '<%= paths.sass.src %>/style.scss'
                }
            }
        },

        cssmin: {
            options: {
                keepBreaks: true
            },
            target: {
                files: {
                    '<%= paths.css.dest %>/app.css': [
                        '<%= paths.css.src %>/bootstrap.css',
                        '<%= paths.css.src %>/style.css'
                    ]
                }
            } 
        },

        /**
         * Watch
         */
        watch: {
            sass: {
                files: '<%= paths.sass.src %>/{,*/}*.{scss,sass}',
                tasks: ['sass', 'cssmin']
            }
        }
    });

    // load npm task
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'cssmin', 'watch']);
};
