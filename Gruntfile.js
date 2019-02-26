module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    babel: {
      options: {
        sourceMap: true,
        plugins: [
          "transform-react-jsx",
          "@babel/plugin-proposal-class-properties"
        ],
        presets: ["@babel/preset-env"]
      },
      dist: {
        files: {
          "assets/scripts/titlebar.js": "src/titlebar.js"
        }
      }
    },
    less: {
      production: {
        files: {
          "assets/titlebar.css": "src/titlebar.less"
        }
      }
    },
    uglify: {
      options: {
        banner:
          '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          "assets/scripts/titlebar.min.js": "assets/scripts/titlebar.js"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", ["babel", "uglify", "less"]);
};
