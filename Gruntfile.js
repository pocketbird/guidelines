// Generated on 2013-10-25 using generator-jekyllrb 0.4.0
'use strict';

// Directory reference:
//   sass: styles
//   javascript: scripts
//   images: images
//   fonts: fonts

module.exports = function (grunt) {
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Configurable paths
    // yeoman: {
    //   app: 'app'
    // },
    marked: {
      server: {
        files: {
          'public/bmi.html': 'app/bmi.md',
          'public/itcss.html': 'app/itcss.md'
        }
      }
    }
    watch: {
      jekyll: {
        files: [
          '<%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}',
          '_config.yml',
          '!./vendor'
        ],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.jekyll/**/*.html',
          '{.tmp,<%= yeoman.app %>}/styles/**/*.css',
          '{.tmp,<%= yeoman.app %>}/<%= js %>/**/*.js',
          '<%= yeoman.app %>/images/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change hostname to '0.0.0.0' to access the server
        // from another device on the same network (e.g. – iPhone)
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('.jekyll'),
              // connect().use('/vendor', connect.static('./vendor')),
              connect.static('./app'),
              connect.directory('./app')
            ];
          }
        }
      }
    },
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config.build.yml',
        src: '<%= yeoman.app %>'
      },
      dist: {
        options: {
          dest: '<%= yeoman.dist %>'
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    concurrent: {
      server: [
        'jekyll:server'
      ]
    }
  });

  grunt.registerTask('serve', [
      'marked:server',
      'connect:livereload',
      'watch'
  ]);
};
