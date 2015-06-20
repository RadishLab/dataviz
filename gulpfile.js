var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "build",
            index: "index.html"
        }
    });
});

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

gulp.task('default', [
  'browser-sync',
  'sass'
]);
