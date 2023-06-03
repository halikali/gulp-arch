const gulp = require("gulp");

function moveHtml() {
  return gulp.src("./src/views/*.html").pipe(gulp.dest("./dist"));
}

module.exports = {
  moveHtml,
};
