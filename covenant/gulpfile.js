const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

const styles = () => {
    return gulp.src('src/css/*.css')
        .pipe(concat('main.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('public/build/'));
};

const scripts = () => {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('public/build/'));
};

const clean = () => del(['public/build/*']);

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
