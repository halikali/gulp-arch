const gulp = require("gulp");

function watcher(filesToWatch, task) {
  gulp.watch(filesToWatch, gulp.series(task));
}

module.exports = {
  watcher,
};
