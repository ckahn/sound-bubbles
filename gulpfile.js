var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('dev', function() {
    browserSync.init({ server: 'app/.' });
    gulp.watch("app/**").on('change', browserSync.reload);
});
