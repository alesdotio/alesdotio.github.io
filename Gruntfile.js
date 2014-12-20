module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			options: {
				ieCompat: true,
				compress: true
			},
			style: {
				src: 'less/style.less',
				dest: 'css/style.css'
			}
		},

		watch: {
			options: {
				spawn: false
			},
			less: {
				files: ['less/**/*.less'],
				tasks: ['less:style']
			},
			livereload: {
				files: ['css/*.css'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['less']);
};