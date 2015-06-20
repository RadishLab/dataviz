var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "public",
            directory: true
        }
    });
});

gulp.task('default', ['browser-sync']);
