module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'client/components/**/*.js', 'client/app.js', 'server/models/*.js', 'server/*.js', 'server/routes/*.js'],
            options: {
                globals: {
                    jQuery: true
                },
                esversion: 6
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            loose: "all"
                        }]
                    ]
                },
                files: {
                    'client/dist/source.js': ['client/app.js', 'client/components/**/*.js']
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['browserify', 'concat', 'jshint']
        },
        concat: {
            dist: {
                src: [
                    'client/bower_components/angular/angular.min.js',
                    'client/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'client/bower_components/angular-material/angular-material.min.js',
                    'client/bower_components/angular-animate/angular-animate.min.js',
                    'client/bower_components/angular-aria/angular-aria.min.js',
                    'client/bower_components/angular-toastr/dist/angular-toastr.tpls.js',
                    'client/bower_components/angular-utils-ui-breadcrumbs/uiBreadcrumbs.js',
                    'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'client/bower_components/jquery/dist/jquery.min.js',
                    'client/bower_components/bootstrap/dist/js/bootstrap.tpls.min.js',
                    'client/dist/source.js'],
                dest: 'client/dist/bundle.js'
            }
        },
        uglify: {
            build: {
                src: 'client/dist/bundle.js',
                dest: 'client/dist/bundle.min.js'
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt'
                },
                src: ['server/tests/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('minify', ['browserify', 'concat']);
    grunt.registerTask('test', ['mochaTest']);
};