const gulp = require("gulp");
const browserSync = require("browser-sync").create();

function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    middleware: function (req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", true);
      next();
    },
    port: 64208,
  });
  gulp.watch("./dist/**/*").on("change", browserSync.reload);
}

module.exports = {
  serve,
};
