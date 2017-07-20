const gulp = require('gulp');
const closureCompiler = require('gulp-closure-compiler');
const sass = require('gulp-sass');
const multipipe = require('multipipe');
const del = require('del');

const path = {
    build: {
        js: 'bin/build/',
        style: 'bin/styles/'
    },
    src: {
        js: 'src/*.js',
        style: 'src/*.sass'
    },
    clean: 'bin/build/*'
};

gulp.task('js:closure', function() {
  return multipipe(
    gulp.src(path.src.js),
    closureCompiler({
      compilerPath: 'D:/reps/libs/compiler.jar',
      fileName: 'build_closure.js',
      compilerFlags: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS'
      }
    }),
    gulp.dest(path.build.js)
  );
});

gulp.task('sass', function () {
  return multipipe(
      gulp.src(path.src.style),
      sass({
        fileName: 'style.css'
      }),
      gulp.dest(path.build.style)
  );
});

gulp.task('clean', function() {
  return del(path.clean);
});