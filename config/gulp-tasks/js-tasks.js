const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');
const path = require('path');
const jsonfile = require('jsonfile');
const glob = require('glob');
const concat = require('gulp-concat');

function jsTask(platform) {
  const isDevelopment = process.env.STATUS === 'development';
  let scriptFiles = './src/scripts/**/index.ts';
  let outputDir = './dist/scripts/';

  if (platform) {
    scriptFiles = `./src/scripts/pages/${platform}/**/index.ts`;
    outputDir = `./dist/scripts/pages/`;
  }

  const compileTypescript = async (filePath) => {
    const dependsPath = path.join(path.dirname(filePath), "depends.json");
    const depends = jsonfile.readFileSync(dependsPath);
    const filename = path.basename(filePath);
    let dirname = "";

    if (platform) {
      dirname = path.dirname(filePath).split("pages/")[1]
    } else {
      dirname = path.dirname(filePath).split("scripts/")[1]
    }

    if (depends.components.length > 0) {
      jsCompile([...depends.components, filePath], {
        base: filename,
        dir: dirname
      });
    } else {
      jsCompile(filePath, {
        base: filename,
        dir: dirname
      })
    }
  };

  const runCompiler = async (done) => {
    glob(scriptFiles, function (err, files) {
      if (err) {
        done(err);
        return;
      }
      const task = files.map(function (file) {
        compileTypescript(file);
      });
    });
  };

  const jsCompile = async (files, filename) => {
    return gulp
      .src(files, {
        allowEmpty: true
      })
      .pipe(concat(filename.base))
      .pipe(gulpIf(isDevelopment == true, sourcemaps.init()))
      .pipe(ts.createProject('tsconfig.json')())
      .pipe(
        babel({
          presets: [
            ['@babel/preset-env', {
              modules: false
            }],
            '@babel/preset-typescript',
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
      .pipe(gulpIf(isDevelopment == true, sourcemaps.write('.')))
      .pipe(gulp.dest(outputDir + filename.dir));

  }

  return gulp.parallel(runCompiler)();
}

module.exports = {
  jsTask,
};