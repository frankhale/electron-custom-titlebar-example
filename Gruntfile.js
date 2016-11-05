module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    "babel": {
      options: {
        sourceMap: true,
        plugins: ["transform-react-jsx"],
        presets: ["babel-preset-es2015"]
      },
      dist: {
        files: {
          "assets/scripts/titlebar.js": "src/titlebar.js"
        }
      }
    },
    "uglify": {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          "assets/scripts/titlebar.min.js": "assets/scripts/titlebar.js"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", ["babel", "uglify"]);
};
