const {src, dest, watch, series} = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const sass = require("gulp-sass");
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');
const autoprefixer = require('gulp-autoprefixer');

function minifyCSS(done) {
      src('assets/css/**.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(dest('dist/css'));
      done()
}

function minifyJS(done){
    src(['assets/js/*.js', '!assets/js/*.min.js'])
        .pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true,

        }))
        .pipe(dest('dist/js/'));
    src('assets/js/**.min.js')
        .pipe(dest('dist/js/'));
    done();
}

function minifyHTML(done) {
    src('assets/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'));
    done()
}
function php(done) {
    src('assets/**.php')
        .pipe(dest('dist'));
    src('assets/phpmailer/**/**')
        .pipe(dest('dist/phpmailer/'));
    done();
}
function fonts(done) {
    src('assets/fonts/**/**')
        .pipe(dest('dist/fonts/'));
    done();
}

function minifyIMG(done) {
    src('assets/img/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({key: 'yTqLWYR5pCByFslJMlH4zZXL09Yc6vYr',}))
        .pipe(dest('dist/img/'));
    src(['assets/img/**/*.ico', 'assets/img/**/*.svg'])
        .pipe(dest('dist/img/'))
    done();
}

function style() {
  return src('./assets/sass/**/*.sass', './assets/sass/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(dest('./assets/css'))
      .pipe(browserSync.stream())
}

function server() {
  style();
  browserSync.init({
    server: {
      baseDir: "./assets/"
    }
  })
  watch("./assets/sass/**/*.sass", style);
  watch("./assets/sass/**/*.scss", style);
  watch("./assets/js/**/*.js").on('change', browserSync.reload);
  watch("./assets/*.html").on('change', browserSync.reload);
}

exports.server = server;
exports.minifyCSS = minifyCSS;
exports.minifyJS = minifyJS;
exports.minifyHTML = minifyHTML;
exports.minifyIMG = minifyIMG;
exports.minifyAll = series(minifyCSS, minifyHTML, php, fonts, minifyJS, minifyIMG);

