module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*!\n' + 
					' * <%= pkg.name %> v<%= pkg.version %>, Dashboard for <%= pkg.name %> v<%= pkg.dashboard.version %>\n' +
					' * <%= pkg.name %> GitHub page (source code and links): (<%= pkg.homepage %>)\n' +
					' * <%= pkg.name %> website: (<%= pkg.website %>)\n' +
					' * Dashboard for <%= pkg.name %>: (<%= pkg.dashboard.homepage %>)\n' +
					' * Author website: (<%= pkg.author.url %>)\n' +
					' *\n' +
					' * Copyright (c) 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
					' * Licensed under the <%= pkg.license.type %>: (<%= pkg.license.url %>)\n' + 
					' */\n'
			},
			build: {
				src: 'render.js',
				dest: 'render.min.js'
			}
		},
		jshint: {
			all: ['Gruntfile.js', 'render.js', 'dashboard/main.js']
		},
		watch: {
			scripts: {
				files: ['render.js'],
				tasks: ['uglify', 'jshint']
			},
		}
	});
	
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	// Default task(s).
	grunt.registerTask('default', ['uglify', 'jshint']);
};
