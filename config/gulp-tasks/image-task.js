const gulp = require("gulp");
const imagemin = require("gulp-imagemin");

function imageTask() {
  return gulp
    .src("src/images/**/*.{jpg,png,gif,svg}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.gifsicle({ interlaced: true }),
        imagemin.svgo({ plugins: [{ removeViewBox: true }] }),
      ])
    )
    .pipe(gulp.dest("dist/images"));
}

module.exports = {
  imageTask,
};
