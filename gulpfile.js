var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var cssnano = require('cssnano')
var postcss = require('gulp-postcss')

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/main.scss',
  SCSS: './assets/scss/**/**',
  HTML: './*.html'
};

var postcssPlugins = [
  cssnano({
    core: true,
    zindex: false,
    autoprefixer: {
      add: true,
      browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
    }
  })
]


var sassConfig = {
  outputStyle: 'expanded',
}

gulp.task('compile-scss', function() {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass(sassConfig).on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write())
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
