var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('styles', function () {
  var plugins = [
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano()
    ];
  gulp
    .src(['source/scss/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/assets/css/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
  return gulp
    .src('source/js/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/assets/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/js/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('images', function () {
    gulp.src('source/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/assets/img'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('default', ['browser-sync','styles','scripts','images'], function () {
  gulp.watch("source/scss/**/*.scss", ['styles']);
  gulp.watch("source/js/**/*.js", ['scripts']);
  gulp.watch("source/img/**/*", ['images']);
  gulp.watch("*.html", ['bs-reload']);
});
