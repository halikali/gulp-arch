const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function runCss(platform) {
  let cssFiles = "./src/styles/**/*.scss";

  if (platform) {
    cssFiles = `./src/styles/pages/${platform}/**/*.scss`;
  }

  return gulp.src(cssFiles).pipe(sass()).pipe(gulp.dest("./dist/styles/"));
}

module.exports = {
  runCss,
};
