const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const { series } = require('gulp');
//compile scss into css
function style() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/**/*.scss'])
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
}
function watch() {
    browserSync.init({
        server: {
           baseDir: "./src",
           index: "/index.html"
        }
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/**/*.scss'], style)
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

function movejs() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream())
}
function movejq() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream())
}

function movete() {
    return gulp.src(['node_modules/tether/dist/js/tether.min.js'])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream())
}

exports.style = style;
exports.watch = watch;
exports.watch = movejs;
exports.watch = movejq;
exports.watch = movete;
exports.build = series(style,movejs,movete, movejq, watch);