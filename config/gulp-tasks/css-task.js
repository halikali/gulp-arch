const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const gulpIf = require("gulp-if");
const autoprefixer = require("gulp-autoprefixer");


function runCss(platform) {
  const isDevelopment = process.env.NODE_ENV === "development";
  let cssFiles = "./src/styles/**/*.scss";
  let outputDir = "./dist/styles/";
  let exportableFiles = "./src/exportable/**/*.scss";
  let exportableOutputDir = "./dist/exportable/";

  if (platform) {
    cssFiles = `./src/styles/pages/${platform}/**/*.scss`;
    exportableFiles = `./src/exportable/${platform}/**/*.scss`;
    outputDir = `./dist/styles/pages/${platform}/`;
    exportableOutputDir = `./dist/exportable/${platform}/`;
  }

  const sassCompile = () =>
    gulp
      .src(cssFiles)
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulpIf(isDevelopment == false, cleanCSS()))
      .pipe(gulp.dest(outputDir));

  const exportableSassCompile = () =>
    gulp
      .src(exportableFiles)
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulpIf(isDevelopment == false, cleanCSS()))
      .pipe(gulp.dest(exportableOutputDir));

  return gulp.parallel(sassCompile, exportableSassCompile)();
}

module.exports = {
  runCss,
};
