module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8080,
          hostname: '*',
          keepalive: true
        }
      }
    },
    jshint: {
      all: ['src/webcomponents/*.html', 'demo/**/*.html'],
      options : {
        'extract': 'auto',
        'browser': true,
        'curly': true,
        'bitwise': true,
        'eqeqeq': true,
        'forin': true,
        'freeze': true,
        'funcscope': true,
        'futurehostile': true,
        'latedef': true,
        'nocomma': true,
        'nonbsp': true,
        'notypeof': true,
        'shadow': true,
        'undef': true,
        'singleGroups': true
        //'unused': true
        //'nonew': true,
        //'strict': true,
        //'varstmt': true
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['jshint', 'connect']);
};
