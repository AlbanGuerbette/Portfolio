/* File: gulpfile.js */

// grab our gulp packages
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat');


var srcScss = 'source/scss/**/*.scss';
var destCss = 'public/assets/css';
var srcJs = 'source/js/**/*.js';
var destJs = 'public/assets/js';


// create a default task and just log a message
gulp.task('build-css', function () {
  return gulp.src(srcScss)
    .pipe(sourcemaps.init()) // Process the original sources
    .pipe(sass())
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(gulp.dest(destCss));
});

gulp.task('build-js', function () {
  return gulp.src(srcJs)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    //only uglify if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destJs));
});


gulp.task('watch', function () {
  gulp.watch(srcScss, ['build-css']);
  gulp.watch(srcJs, ['build-js']);
});
