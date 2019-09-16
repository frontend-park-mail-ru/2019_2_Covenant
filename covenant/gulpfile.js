const gulp         = require('gulp');
const browserSync  = require('browser-sync');
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const uglify       = require('gulp-uglify');
const del          = require('del');

const cssFiles = [
    'src/css/main.css'  
];

const jsFiles = [
    'src/js/main.js'
];

const styles = () => {
    return gulp.src(cssFiles)
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream());
};

const scripts = () => {
    return gulp.src(jsFiles)
    .pipe(concat('main.js'))
    .pipe(uglify({
        toplevel: true
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
};

const watch = () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });

    gulp.watch('src/css/**/*.css', styles);
    gulp.watch('src/js/**/*.js', scripts);
    gulp.watch('./*.html').on('change', browserSync.reload)
};

const clean = () => del(['build/*']);

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));
