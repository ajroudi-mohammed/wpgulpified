


//Gulpjs Configuration

'use strict';

const

	//sources and build folders
	dir = {
		src 	: 'src/',
		build 	: '/Applications/MAMP/htdocs/palme_beach/wp-content/themes/palm-beach/'
	},

	// image settings
	images = {
	  src         : dir.src + 'images/**/*',
	  build       : dir.build + 'images/'
	},

	js = {
	  src         : dir.src + 'js/**/*',
	  build       : dir.build + 'js/',
	  filename    : 'scripts.js'
	},


	//Gulp and plugins
	gulp 		  = require('gulp'),
	gutil         = require('gulp-util'),
	newer         = require('gulp-newer'),
	imagemin      = require('gulp-imagemin'),
	sass          = require('gulp-sass'),
	autoprefixer  = require('gulp-autoprefixer'),
    plumber       = require('gulp-plumber'),
	postcss       = require('gulp-postcss'),
	deporder      = require('gulp-deporder'),
	concat        = require('gulp-concat'),
	rename        = require('gulp-rename'),
	stripdebug    = require('gulp-strip-debug'),
	jshint        = require('gulp-jshint'),
	uglify        = require('gulp-uglify'),
	browserSync   = require('browser-sync').create(),
    reload        = browserSync.reload
	;

	// Browser-sync
	var browsersync = true;

	//Handle error
	var onError = function( err ) {
	  console.log('An error occurred:', gutil.colors.magenta(err.message));
	  gutil.beep();
	  this.emit('end');
	};

	// image processing
	gulp.task('images', () => {
	  return gulp.src(images.src)
	    .pipe(newer(images.build))
	    .pipe(imagemin())
	    .pipe(gulp.dest(images.build));
	});


	// Sass
	gulp.task('sass', () => {
	  return gulp.src(dir.src + 'sass/style.scss')
	  .pipe(plumber({ errorHandler: onError }))
	  .pipe(sass())
	  .pipe(autoprefixer())
	  .pipe(gulp.dest(dir.build));
	  //.pipe(browsersync ? reload : gutil.noop());
	});

	// JavaScript
	gulp.task('js', function() {
	  return gulp.src(js.src)
	  .pipe(jshint())
	  .pipe(jshint.reporter('default'))
	  .pipe(deporder())
	  .pipe(concat('app.js'))
	  .pipe(rename({suffix: '.min'}))
	  .pipe(uglify())
	  .pipe(gulp.dest(js.build));
	  //.pipe(browsersync ? reload : gutil.noop());
	});

	// Watch
	gulp.task('watch', function() {
	  browserSync.init({
	    files: ['./**/*.php'],
	    proxy: 'http://localhost:8888/palme_beach/',
	  });
	  gulp.watch(dir.src + 'sass/**/*.scss', gulp.series('sass', reload));
	  gulp.watch([dir.src + 'js/*.js', '!./js/app.min.js'], gulp.series('js', reload));
	  gulp.watch(dir.src + 'images/*', gulp.series('images', reload));
	});



