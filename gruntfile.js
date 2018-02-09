module.exports = function(grunt) {
	grunt.initConfig({

		jshint: {
		    all: ['Gruntfile.js']
		 }, //jshint

		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			strict: {
				options: {
				import: 2
				},
				src: ['builds/development/css/*.css']
			},
			lax: {
				options: {
				import: false
			},
				src: ['path/to/**/*.css']
			}
		}, //csslint

		cssmin: {
			target: {
				files: [{
				expand: true,
				src: ['builds/css/*.css', '!*.min.css'],
				dest: 'builds/css',
				ext: '.min.css'
				}]
			}
		}, //cssmin

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: [{
					src: 'components/sass/style.scss',
					dest: 'builds/development/css/main.css'
				}]
			}
		}, //sass

		responsive_images: {
			myTask: {
				options: {
					sizes: [{
						width: 320,
						height: 240
					},{
						name: 'large',
						width: 640
					},{
						name: "large",
						width: 1024,
						suffix: "_x2",
						quality: 60
					}]
				},
				files: [{
					expand: true,
					src: ['components/img/**.{jpg,gif,png}'],
					dest: 'builds/development/img'
				}]
			}
		}, //responsive_images

		responsive_images_extender: {
			target: {
				options: {},
				files: [{
				expand: true,
				src: ['**/*.{html,htm,php}'],
				cwd: 'src/',
				dest: 'build/'
				}]
			}
		}, //responsive_images_extender

		concat: {
			options: {
				separator: '\n\n//========================================\n',
				banner: '\n\n//========================================\n'
			},
			dist: {
				src: ['components/scripts/*.js'],
				dest: 'builds/development/js/script.js'
			}
		}, //concat

		bower_concat: {
			all: {
				dest: 'builds/development/js/_bower.js',
				cssDest: 'builds/development/css/_bower.css'
			}
		},


		wiredep: {
			task: {
				src: 'builds/development/**/*.html'
			}
		}, //wiredep

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 3000,
					base: 'builds/development/',
					livereload: true
				}
			}
		}, //connect

		watch: {
			options: {
	      spawn: false,
	      livereload: true
	    },
		  scripts: {
		    files: ['builds/development/**/*.html',
		    				'components/scripts/**/*.js',
		    				'components/sass/**/*.scss'],
		    tasks: ['jshint', 'concat', 'sass']
		  },
		}

	}); //initConfig

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-responsive-images-extender');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');


	grunt.registerTask('default', ['wiredep', 'bower_concat', 'concat', 'sass', 'jshint', 'connect', 'watch']);

}; //wrapper function