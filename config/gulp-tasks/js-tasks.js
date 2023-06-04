const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("gulp-typescript");
const terser = require("gulp-terser");
const babel = require("gulp-babel");
const gulpIf = require("gulp-if");
const rename = require("gulp-rename");

function jsTask(platform) {
  let scriptFiles = "./src/scripts/**/*.page.ts";
  let outputDir = "./dist/scripts/";
  const tsProject = ts.createProject("tsconfig.json");
  const isDevelopment = process.env.NODE_ENV === "development";

  if (platform) {
    scriptFiles = `./src/scripts/pages/${platform}/**/*.page.ts`;
    outputDir = `./dist/scripts/pages/${platform}/`;
  }

  return gulp
    .src(scriptFiles)
    .pipe(gulpIf(isDevelopment == true, sourcemaps.init()))
    .pipe(tsProject())
    .pipe(
      babel({
        presets: [
          ["@babel/preset-env", { modules: false }],
          "@babel/preset-typescript",
        ],
      })
    )
    .pipe(
      gulpIf(
        isDevelopment == false,
        terser({
          ecma: 6,
          compress: {
            drop_console: true,
            passes: 2,
          },
          output: {
            comments: false,
          },
        })
      )
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulpIf(isDevelopment == true, sourcemaps.write(".")))
    .pipe(gulp.dest(outputDir));
}

module.exports = {
  jsTask,
};
