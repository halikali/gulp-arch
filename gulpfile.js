const gulp = require("gulp");
const { moveHtml } = require("./config/gulp-tasks/html-tasks");
const { runCss } = require("./config/gulp-tasks/css-taks");

let platform = null;
const platformArg = process.argv[2];

if (platformArg === "--platform") {
  platform = process.argv[3];
}

gulp.task("move-html", moveHtml);

gulp.task("default", function () {
  return runCss(platform);
});

exports.build = gulp.parallel("move-html");
