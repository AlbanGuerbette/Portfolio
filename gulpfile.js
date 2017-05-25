const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: './',
    },
  });
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('styles', () => {
  const plugins = [autoprefixer({ browsers: ['last 2 versions'] }), cssnano()];
  gulp
    .src(['source/scss/**/*.scss'])
    .pipe(
      plumber({
        errorHandler(error) {
          console.log(error.message);
          this.emit('end');
        },
      })
    )
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/assets/css/'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', () =>
  gulp
    .src('source/js/**/*.js')
    .pipe(
      plumber({
        errorHandler(error) {
          console.log(error.message);
          this.emit('end');
        },
      })
    )
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/assets/js/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/js/'))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('images', () => {
  gulp
    .src('source/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/assets/img'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('default', ['browser-sync', 'styles', 'scripts', 'images'], () => {
  gulp.watch('source/scss/**/*.scss', ['styles']);
  gulp.watch('source/js/**/*.js', ['scripts']);
  gulp.watch('source/img/**/*', ['images']);
  gulp.watch('*.html', ['bs-reload']);
});
