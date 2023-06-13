const gulp = require("gulp");

function moveTask(folder) {
    return gulp.src(`./src/${folder}/**/*`).pipe(gulp.dest(`./dist/${folder}`))
}

module.exports = {
    moveTask
}