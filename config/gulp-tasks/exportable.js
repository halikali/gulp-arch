const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const jsonfile = require('jsonfile');
const glob = require('glob');
const path = require('path');
const autoPrefixer = require('gulp-autoprefixer');
const gulpIf = require('gulp-if');
const GulpCleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');

function exportableTasks() {
  const isDevelopment = process.env.STATUS === 'development';

  // TODO: TypeScript derleme fonksiyonu optimize edilecek
  // TypeScript derleme görevi
  const compileTypeScript = (filePath, filename = "") => {
    let distFolder = "";
    let willItMerge = filename?.base ? true : false

    if (typeof filePath == "string" ) {
      distFolder = path.dirname(filePath).split("components/")[1]
    } else {
      distFolder = filename?.dir;
    }

    if (willItMerge) {
      return gulp
      .src(filePath, {
        allowEmpty: true
      })
      .pipe(concat(filename.base))
      .pipe(gulpIf(isDevelopment, sourcemaps.init()))
      .pipe(ts.createProject('tsconfig.json')())
      .pipe(
        babel({
          presets: [
            ['@babel/preset-env', {
              modules: false,
            }],
            '@babel/preset-typescript',
          ],
        })
      )
      .pipe(
        gulpIf(
          !isDevelopment,
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
      .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
      .pipe(gulp.dest(`./dist/components/${distFolder}/`));
    } else {
      return gulp
      .src(filePath, {
        allowEmpty: true
      })
      .pipe(gulpIf(isDevelopment, sourcemaps.init()))
      .pipe(ts.createProject('tsconfig.json')())
      .pipe(
        babel({
          presets: [
            ['@babel/preset-env', {
              modules: false,
            }],
            '@babel/preset-typescript',
          ],
        })
      )
      .pipe(
        gulpIf(
          !isDevelopment,
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
      .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
      .pipe(gulp.dest(`./dist/components/${distFolder}/`));
    }
  };

  // SCSS derleme görevi
  const compileScss = (filePath) => {
    const distFolder = path.dirname(filePath).split("components/")[1];
    return gulp
      .src(filePath)
      .pipe(sass())
      .pipe(autoPrefixer())
      .pipe(gulpIf(!isDevelopment, GulpCleanCss()))
      .pipe(gulp.dest(`./dist/components/${distFolder}/`));
  };

  // Exportable seçeneğine göre derleme görevi
  const compileExportable = (filePath) => {
    const optionsPath = path.join(path.dirname(filePath), 'options.json');
    const options = jsonfile.readFileSync(optionsPath);
    const filename = path.basename(filePath);
    let dirname = path.dirname(filePath).split("components/")[1];

    if (options?.exportable === true) {
      if (path.extname(filePath) === '.ts') {
        if (options?.depends?.length > 0) {
          compileTypeScript([...options.depends, filePath], {
            base: filename,
            dir: dirname
          });
        } else {
          return compileTypeScript(filePath);
        }

      } else if (path.extname(filePath) === '.scss') {
        return compileScss(filePath);
      }
    }

    return Promise.resolve();
  };

  // Ana derleme görevi
  function runExportable(done) {
    glob('./src/components/**/*.{ts,scss}', function (err, files) {
      if (err) {
        done(err);
        return;
      }

      const tasks = files.map(function (file) {
        const ext = path.extname(file);
        switch (ext) {
          case '.ts':
            return compileExportable(file);
          case '.scss':
            return compileExportable(file);
          default:
            return Promise.resolve();
        }
      });

      Promise.all(tasks)
        .then(function () {
          done();
        })
        .catch(function (error) {
          done(error);
        });
    });
  }

  gulp.parallel(runExportable)();
}

module.exports = {
  exportableTasks,
};