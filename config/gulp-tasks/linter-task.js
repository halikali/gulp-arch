const gulp = require('gulp');
const eslint = require('gulp-eslint-new');
const prettier = require('gulp-prettier');

function linter() {
  const lint = () =>
    gulp
      .src(['**/*.ts', '!node_modules/**'])
      .pipe(eslint({ fix: true }))
      .pipe(eslint.format())
      .pipe(
        gulp.dest(function (file) {
          return file.base;
        })
      );

  const beautify = () =>
    gulp
      .src(['**/*.ts', '!node_modules/**'])
      .pipe(prettier())
      .pipe(
        gulp.dest(function (file) {
          return file.base;
        })
      );

  return gulp.parallel(lint, beautify)();
}

module.exports = {
  linter,
};
