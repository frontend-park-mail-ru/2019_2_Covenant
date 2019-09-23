const gulp         = require('gulp');
const concat       = require('gulp-concat');
const cleanCSS     = require('gulp-clean-css');
const del          = require('del');

const cssFiles = [
    'src/css/main.css'  
];

const styles = () => {
    return gulp.src(cssFiles)
    .pipe(concat('main.css'))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(gulp.dest('build/'));
};

const clean = () => del(['build/*']);

gulp.task('styles', styles);
gulp.task('build', gulp.series(clean, gulp.parallel(styles)));
