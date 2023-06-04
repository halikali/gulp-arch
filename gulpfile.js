const gulp = require("gulp");
const { moveHtml } = require("./config/gulp-tasks/html-task");
const { runCss } = require("./config/gulp-tasks/css-tak");
const { jsTask } = require("./config/gulp-tasks/js-tasks");
const { fontTask } = require("./config/gulp-tasks/font-task");

let platform = null;
const platformArg = process.argv[2];

if (platformArg === "--platform") {
  platform = process.argv[3];
}

gulp.task("move-html", moveHtml);
gulp.task("css", runCss);
gulp.task("scripts", jsTask);
gulp.task("font", fontTask);

gulp.task("default", function () {
  return runCss(platform), jsTask(platform);
});

exports.build = gulp.parallel("move-html", "css", "scripts", "font");
