var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');

browserSync.init({ server: '.' });

gulp.task('browserify', function() {
    return browserify('./app/js/index.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('browser-sync', function () {
    browserSync.reload();
});

gulp.task('watch', ['browserify', 'browser-sync'], function () {
    gulp.watch('./app/**', ['browserify', 'browser-sync']);
});

gulp.task('default', ['watch']);