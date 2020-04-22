const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const concat_css = require('gulp-concat-css');
const tailwindcss = require('tailwindcss');

const paths = {
  styles: {
    frameworks: {src:'./src/css/base.css',dest:'./src/css/bundle/'},
    bundle: {src:'./src/css/bundle.css',dest:'./public/css/'},
    index: {src:'./src/css/index.scss',dest:'./public/css/'},
   }
}

sass.compiler = require('node-sass')


function css(){
  return gulp.src(paths.styles.frameworks.src)
  .pipe(postcss([
    tailwindcss
  ]))
  .pipe(gulp.dest(paths.styles.frameworks.dest))
}

function bundle(){
  return gulp.src(paths.styles.bundle.src)
  .pipe(concat_css('base.css',{includePaths:['node_modules']}))
  .pipe(gulp.dest(paths.styles.bundle.dest))
}

function styles(){
  return gulp.src(paths.styles.index.src)
  .pipe(sass().on('error',sass.logError))
  .pipe(gulp.dest(paths.styles.index.dest))
}

exports.css = css;
exports.styles = styles;
exports.bundle = bundle;
