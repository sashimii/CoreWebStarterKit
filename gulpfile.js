var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var concat = require('gulp-concat')
var source = require('vinyl-source-stream');
var bundle = require('gulp-bundle-assets');
var bulk = require('bulk-require');
var sass = require('gulp-sass');

var files = {
  css: {
    src: 'src/scss/*.scss',
    dist: 'dist/css/'
  },
  js: {
    src: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/what-input/dist/what-input.js',
      'node_modules/foundation-sites/dist/js/foundation.min.js',
      'src/js/*.js'
    ],
    dist: 'dist/js/'
  }
}

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'scripts'], () => {

    browserSync.init({
        server: './'
    });

    gulp.watch(files.css.src, ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
  return gulp.src(files.css.src)
    .pipe(sass())
    .pipe(gulp.dest(files.css.dist))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp.src(files.js.src)
    .pipe(concat('site.js'))
    .pipe(gulp.dest(files.js.dist));
});


gulp.task('default', ['serve']);
