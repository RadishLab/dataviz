var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var autoprefixer= require('gulp-autoprefixer');
var fontcustom  = require('gulp-fontcustom')
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "build",
            index: "index.html"
        }
    });
});

// Sass compiler
gulp.task('sass', function() {
  gulp.src('assets/sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      indentedSyntax: true,
      errLogToConsole: true
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/assets/css'))
    .pipe(reload({ stream: true }));
});

// SVG to icon font
gulp.task('images', function() {
  gulp.src("assets/svg/*.svg")
  .pipe(fontcustom({
    font_name: 'icons'
  }))
  .pipe(gulp.dest("build/assets/icons"))
});

gulp.task('default', [
  'browser-sync',
  'sass',
  'images'
]);
