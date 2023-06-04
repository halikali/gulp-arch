const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

const cleanCSS = require("gulp-clean-css");
const gulpIf = require("gulp-if");
const autoprefixer = require("gulp-autoprefixer");

function runCss(platform) {
  let cssFiles = "./src/styles/**/*.scss";
  let outputDir = "./dist/styles/";
  let isDevelopment = process.env.NODE_ENV == "production";
  
  if (platform) {
    cssFiles = `./src/styles/pages/${platform}/**/*.scss`;
    outputDir = `./dist/styles/pages/${platform}/`;
  }

  return gulp
    .src(cssFiles)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpIf(isDevelopment == false, cleanCSS()))
    .pipe(gulp.dest(outputDir));
}

module.exports = {
  runCss,
};
