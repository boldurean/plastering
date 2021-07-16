const {src, dest, watch, series} = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const sass = require("gulp-sass");
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');
const autoprefixer = require('gulp-autoprefixer');

function minifyCSS(done) {
      src('./css/**.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(dest('dist/css'));
      done()
}

function minifyJS(done){
    src(['./js/*.js', '!./js/*.min.js'])
        .pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true,

        }))
        .pipe(dest('dist/js/'));
    src('./js/**.min.js')
        .pipe(dest('dist/js/'));
    done();
}

function minifyHTML(done) {
    src('./*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'));
    done()
}
function php(done) {
    src('./**.php')
        .pipe(dest('dist'));
    src('./phpmailer/**/**')
        .pipe(dest('dist/phpmailer/'));
    done();
}
function fonts(done) {
    src('./fonts/**/**')
        .pipe(dest('dist/fonts/'));
    done();
}

function minifyIMG(done) {
    src('./img/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({key: 'yTqLWYR5pCByFslJMlH4zZXL09Yc6vYr',}))
        .pipe(dest('dist/img/'));
    src(['./img/**/*.ico', './img/**/*.svg'])
        .pipe(dest('dist/img/'))
    done();
}

function style() {
  return src('./sass/**/*.sass', './sass/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(dest('./css'))
      .pipe(browserSync.stream())
}

function server() {
  style();
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
  watch("./sass/**/*.sass", style);
  watch("./sass/**/*.scss", style);
  watch("./js/**/*.js").on('change', browserSync.reload);
  watch("./*.html").on('change', browserSync.reload);
}

exports.server = server;
exports.minifyCSS = minifyCSS;
exports.minifyJS = minifyJS;
exports.minifyHTML = minifyHTML;
exports.minifyIMG = minifyIMG;
exports.minifyAll = series(minifyCSS, minifyHTML, php, fonts, minifyJS, minifyIMG);

