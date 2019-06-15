var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');
var browserSync = require('browser-sync').create();
var notify = require('gulp-notify');

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
    .pipe(sass().on('error',
    //sass.logError
    notify.onError("Error: <%= error.message %>")
  ))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS))
    .pipe(browserSync.stream({ match: "**/*.css" }))
    .pipe(notify({title:"Tarea Sass", message: "Finalizada"}));
});

gulp.task('server', function() {
  browserSync.init({
    server: Paths.HERE
  });

  gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
  gulp.watch(Paths.HTML, gulp.series(browserSyncReload));

});

// BrowserSync Reload
function browserSyncReload(done) {
  browserSync.reload();
  done();
}


gulp.task('open', function(fopen) {
  gulp.src('index.html')
    .pipe(open());
    fopen();
});

gulp.task('dev', gulp.series('server'));
