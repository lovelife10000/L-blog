/**
 * Created by v_lljunli on 2017/5/10.
 */
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    concat: {
      // options: {
      //   separator: ';'
      // },
      dist: {
        src: ['public/js/services/admin/*.js','public/js/directives/admin/*.js','public/js/filters/admin/*.js','public/js/controllers/admin/*.js'],
        dest: 'public/js/common/L-blog.js'
      }
    },


    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/js/common/L-blog.min.js': ['public/js/common/L-blog.js']
        }
      }
    },


    // qunit: {
    //   files: ['test/**/*.html']
    // },
    //
    //
    // jshint: {
    //   files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
    //   options: {
    //     //这里是覆盖JSHint默认配置的选项
    //     globals: {
    //       jQuery: true,
    //       console: true,
    //       module: true,
    //       document: true
    //     }
    //   }
    // },


    watch: {
      files: ['public/js/services/admin/*.js','public/js/directives/admin/*.js','public/js/filters/admin/*.js','public/js/controllers/admin/*.js'],
      tasks: ['concat','uglify']
    }



  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // grunt.registerTask('test', ['jshint', 'qunit']);

  //默认的任务
  grunt.registerTask('default', ['concat','uglify','watch']);

};