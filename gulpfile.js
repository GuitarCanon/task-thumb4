var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', ['praise'],  () => {
    gulp.watch(['src/**/*.es6', '!src/public/*/*.es6'], ['praise'])
});

gulp.task('praise', () =>
    gulp.src(['src/**/*.es6', '!src/public/*/*.es6'])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('build'))
);
