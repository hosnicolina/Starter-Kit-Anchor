var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');
var browserSync = require('browser-sync').create();

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/main.scss',
  SCSS: './assets/scss/**/**',
  HTML: './*.html'
};

gulp.task('compile-scss', function() {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS))
    .pipe(browserSync.stream());
});

gulp.task('server', function() {
  browserSync.init({
    server: Paths.HERE
  });

  gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
  gulp.watch(Paths.HTML).on('change', browserSync.reload);

});

gulp.task('watch', function() {
  gulp.watch(Paths.SCSS, gulp.series('compile-scss'));  
});

gulp.task('open', function(fopen) {
  gulp.src('index.html')
    .pipe(open());
    fopen();
});

gulp.task('open-app', gulp.series('open', 'watch'));