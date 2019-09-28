const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');
const del = require('del');

const path = {
    build: {
        js: 'public/build/js',
        css: 'public/build/css',
        img: 'public/build/img'
    },
    src: {
        js: 'src/js/*.js',
        css: 'src/css/*.css',
        img: 'src/img/*.png'
    },
    clean: 'public/build/'
};

const styles = () => {
    return gulp.src(path.src.css)
        .pipe(concat('main.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest(path.build.css));
};

const images = () => {
    return gulp.src(path.src.img)
        .pipe(imageMin())
        .pipe(gulp.dest(path.build.img));
};

const scripts = () => {
    return gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js));
};

const clean = () => del([path.clean]);

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('images', images);
gulp.task('build', gulp.series(clean, gulp.parallel(
        styles,
        scripts,
        images
)));
