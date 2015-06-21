var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var csslint      = require('gulp-csslint');
var jshint       = require('gulp-jshint');
var concat       = require('gulp-concat');
var fontcustom   = require('gulp-fontcustom')
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "build",
            index: "index.html"
        }
    });
});

// sass compiler
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

gulp.task('csslint', function() {
  gulp.src('assets/css/*.css')
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter());
});

gulp.task('jslint', function() {
  gulp.src(['assets/js/main.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('concat', function() {
  gulp.src([
    'assets/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('build/assets/js'));
});

gulp.task('graphics', function() {
// svg to icon font
  gulp.src("assets/svg/*.svg")
  .pipe(fontcustom({
    font_name: 'icons'
  }))
  .pipe(gulp.dest("build/assets/icons"))

// image compression
  return gulp.src('assets/img/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('build/assets/img'));
});


gulp.task('default', [
  'sass',
  'csslint',
  'concat',
  'jslint',
  'graphics',
  'browser-sync'
]);
