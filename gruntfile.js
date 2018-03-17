
module.exports = function(grunt) {

	grunt.initConfig({

		jshint: {
		    all: ['Gruntfile.js', 'src/scripts/*.js'],
		    options: {
		    	browser: true,
	        jshintrc: '.jshintrc'
	      }
		 }, //jshint

		uglify: {
			options: {
			  mangle: false
			},
			my_target: {
			  files: {
			    'builds/www/js/script.min.js': ['builds/www/js/*.js', '!builds/www/js/*.min.js', '!builds/www/js/_bower.js']
			  }
			}
		},	//uglify

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: [{
					src: 'src/sass/style.scss',
					dest: 'builds/www/css/style.css'
				}]
			}
		}, //sass

    	postcss: {
		  options: {
		    map: true,
		    processors: [
		      require('autoprefixer')({browsers: ['last 8 version', 'ie 8', 'ie 9']})
		    ]
		  },
		  dist: {
		    src: 'builds/www/css/style.css'
		  }
		}, //postcss

		autoprefixer: {
			options: {
				browsers: ['last 8 version', 'ie 8', 'ie 9']
			},
			single_file: {
			     src: 'builds/www/css/style.css',
			     dest: 'builds/www/css/style.css'
			}
		}, //autoprefixer

		cssmin: {
			target: {
				files: [{
				expand: true,
				cwd: 'builds/www/css',
				src: ['*.css', '!*.min.css'],
				dest: 'builds/www/css',
				ext: '.min.css'
				}]
			}
		}, //cssmin

		responsive_images: {
			myTask: {
				options: {
					newFilesOnly: true,
					sizes: [{
						name: 'small',
						width: 320,
					},{
						name: 'medium',
						width: 640,
						suffix: "_x1",
						quality: 60
					},{
						name: "large",
						width: 1024,
						suffix: "_x2",
						quality: 60
					},{
						name: "xlarge",
						width: 2048,
						suffix: "_x3",
						quality: 60
					}]
				},
				files: [{
					expand: true,
					src: ['**/*.{jpg,gif,png}'],
					cwd: 'src/img/',
					dest: 'src/tmp/'
				}]
			}
		}, //responsive_images

		imagemin: {
	    dist: {
        options: {
        	progressive: true,
        },
        files: [{
	        expand: true,
	        cwd: 'src/tmp/',
	        src: ['*.{png,jpg,gif}'],
	        dest: 'builds/www/img/'
        }]
	    }
		}, //imagemin

		clean: {
			contents: ['builds/www/img/*', 'src/tmp'],
			files: ['builds/www/test', 'src/tmp']
		}, //clean

		copy: {
		  main: {
		    expand: true,
		    cwd: 'src/img/',
		    src: '**',
		    dest: 'src/tmp/',
		  },
		}, //copy

		responsive_images_extender: {
			complete: {
		      options: {
		        baseDir: 'builds/www',
		        sizes: [{
		          selector: '[alt]',
		          sizeList: [{
		            cond: 'max-width: 30em',
		            size: '100vw'
		          },{
		            cond: 'max-width: 50em',
		            size: '80vw'
		          },{
		            cond: 'default',
		            size: 'calc(80vw - 100px)'
		          }]
		        }]
		      },
		      files: [{
		        expand: true,
		        src: ['index.html'],
		        cwd: 'builds/www/',
		        dest: 'builds/www/test/'
		      }]
		    }
		}, //responsive_images_extender

		concat: {
			options: {
				separator: '\n\n//========================================\n',
				banner: '\n\n//========================================\n'
			},
			dist: {
				src: ['src/scripts/*.js'],
				dest: 'builds/www/js/script.js'
			}
		}, //concat

		bower_concat: {
			all: {
				dest: 'builds/www/js/_bower.js',
				cssDest: 'builds/www/css/_bower.css'
			}
		}, //bower_concat

		wiredep: {
			task: {
				src: 'builds/www/*.html'
			}
		}, //wiredep

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 3000,
					base: 'builds/www/',
					livereload: true
				}
			}
		}, //connect

    htmlmin: {                                     // Task
	    dist: {                                    // Target
				options: {                                 // Target options
					removeComments: true,
					collapseWhitespace: true
				},
				files: {                                   // Dictionary of files
					'builds/www/index.html': 'builds/www/test/index.html',     // 'destination': 'source'
				}
			},
			dev: {
				options: {                                 // Target options
					removeComments: true,
					collapseWhitespace: true
				},
				files: {                                   // Dictionary of files
					'builds/www/index.html': 'src/index.html',     // 'destination': 'source'
				},
			}
		}, //htmlmin

		watch: {
			options: {
	    	spawn: false,
	    	livereload: true
	    },
			scripts: {
		    files: ['Gruntfile.js',
				'src/scripts/*.js',
				'src/sass/*.scss',
				'builds/www/css/*.css',
				'src/index.html'],
		    tasks: ['jshint', 'concat', 'sass', 'postcss', 'cssmin', 'htmlmin:dev']
		  },
		} //watch

	}); //initConfig

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-responsive-images-extender');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('build', ['clean:files', 'responsive_images_extender', 'htmlmin:dist']);
	grunt.registerTask('image', ['clean:contents', 'responsive_images', 'copy', 'imagemin']);
	grunt.registerTask('default', ['htmlmin:dev', 'concat', 'sass', 'cssmin', 'jshint', 'uglify', 'connect', 'watch']);

}; //wrapper function