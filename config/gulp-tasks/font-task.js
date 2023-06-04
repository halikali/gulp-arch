const gulp = require("gulp");

function fontTask() {
  return gulp.src("./src/fonts/**/*.*").pipe(gulp.dest("./dist/fonts"));
}

module.exports = { fontTask };
