const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

function jsTask(platform) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  let scriptFiles = './src/scripts/**/*.ts';
  let outputDir = './dist/scripts/';
  let exportableFiles = './src/exportable/**/*.ts';
  let exportableOutputDir = './dist/exportable/';

  const importPathRegex = /(import\s*{[^}]+}\s*from\s+["'])(.*)(["'];)/g;

  if (platform) {
    console.log("platform bilgisi bulundu " + platform);
    scriptFiles = `./src/scripts/pages/${platform}/**/*.ts`;
    exportableFiles = `./src/exportable/${platform}/**/*.ts`;
    outputDir = `./dist/scripts/pages/${platform}/`;
    exportableOutputDir = `./dist/exportable/${platform}/`;
  } 

  const tsProject = ts.createProject('tsconfig.json');

  const jsCompile = () =>
    gulp
      .src(scriptFiles)
      .pipe(gulpIf(isDevelopment == true, sourcemaps.init()))
      .pipe(tsProject())
      .pipe(
        babel({
          presets: [
            ['@babel/preset-env', { modules: false }],
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
      .pipe(rename({ suffix: '.min' }))
      .pipe(
        replace(importPathRegex, (match) => {
          return `${match.trim().slice(0, match.length - 2)}.min.js";`;
        })
      )

      .pipe(gulpIf(isDevelopment == true, sourcemaps.write('.')))
      .pipe(gulp.dest(outputDir));

  const exportableCompile = () =>
    gulp
      .src(exportableFiles)
      .pipe(gulpIf(isDevelopment == true, sourcemaps.init()))
      .pipe(
        ts.createProject({
          lib: ['ES2015', 'DOM'],
          target: 'ES5',
          module: 'ES6',
          noImplicitAny: true,
          removeComments: true,
          preserveConstEnums: true,
          outDir: 'dist',
          rootDir: 'src/exportable',
          sourceMap: true,
          moduleResolution: 'node',
          allowJs: true,
          esModuleInterop: true,
          strict: true,
        })()
      )
      .pipe(
        babel({
          presets: [
            ['@babel/preset-env', { modules: false }],
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
      .pipe(
        rename((path) => {
          path.basename = path.basename.replace('.d', '');
          path.extname = '.min.js';
        })
      )
      .pipe(gulpIf(isDevelopment == true, sourcemaps.write('.')))
      .pipe(gulp.dest(exportableOutputDir));

  return gulp.parallel(jsCompile, exportableCompile)();
}

module.exports = {
  jsTask,
};
