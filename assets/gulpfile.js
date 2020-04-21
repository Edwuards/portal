const gulp = require('gulp');
const sass = require('gulp-sass');
const concat_css = require('gulp-concat-css');
const paths = {
  styles: { src: './src/css/index.scss', dest: './src/css/' }
}

sass.compiler = require('node-sass')


function sassBuild(){
  return gulp.src(paths.styles.src)
  .pipe(sass().on('error',sass.logError))
  .pipe(gulp.dest(paths.styles.dest,{overwrite:true}));
}

function cssBuild(){
  return gulp.src('src/css/bundle.css')
        .pipe(concat_css(
          'index.css',
          {
            includePaths:['node_modules']
          }
        )).pipe(gulp.dest('public/css/'));
}

function styles(){
  sassBuild();
  return cssBuild();
}

exports.css = styles;
exports.sass = sassBuild;
