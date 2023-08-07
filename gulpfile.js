const gulp = require('gulp');
const dotenv = require('dotenv');

const {
  moveHtml
} = require('./config/gulp-tasks/html-task');
const {
  runCss
} = require('./config/gulp-tasks/css-task');
const {
  jsTask
} = require('./config/gulp-tasks/js-tasks');
const {
  fontTask
} = require('./config/gulp-tasks/font-task');
const {
  imageTask
} = require('./config/gulp-tasks/image-task');
const {
  watcher
} = require('./config/gulp-tasks/watcher-task');
const {
  serve
} = require('./config/gulp-tasks/serve-task');
const {
  exportableTasks
} = require('./config/gulp-tasks/exportable');
const { moveTask } = require('./config/gulp-tasks/move-task');

// Developement ve Prod ortamları için env dosyalarını etkinleştiren kod bloğu
if (process.env.NODE_ENV === 'production') {
  dotenv.config({
    path: '.env.prod'
  });
} else {
  dotenv.config({
    path: '.env.dev'
  });
}

// Gulp --platform <folder_name> şeklinde bir komut girilirse dosya adını okuyacak kod bloğu
let platform = null;
const platformArg = process.argv[2];

// Gulp tasklarının tanımlandığı kod bloğu başlangıcı
if (platformArg === '--only') {
  platform = process.argv[3];
}

// Platform bilgisine ihtiyaç duymayan taskların tanımlandığı kod bloğu
gulp.task('move-html', moveHtml);
gulp.task('font', fontTask);
gulp.task('image', imageTask);
gulp.task('serve', serve);
gulp.task("exportable", async function () {
  exportableTasks();
});
gulp.task("move-vendors", async function(){
  moveTask("vendors");
})

/*
CSS ve JS tasklarını çalışırken platform bilgisine ihtiyaç duyduğu için bu şekilde tanımlandı.
Daha hızlı çalışmaları için async eklendi
*/
gulp.task('css', async function () {
  return runCss(platform);
});

gulp.task('scripts', async function () {
  jsTask(platform);
});

// Gulp tasklarının tanımlandığı kod bloğu bitişi

// Watcher tanımlamaları
gulp.task('watchFiles', async function () {
  return (
    watcher('./src/assets/**/**', 'image'),
    watcher('./src/fonts/**/**', 'font'),
    watcher('./src/scripts/**/**', 'scripts'),
    watcher('./src/styles/**/**', 'css'),
    watcher('./src/views/**/**', 'move-html'),
    watcher('./src/vendors/**/*', "move-vendors"),
    watcher('./src/components/**/*', "exportable")
  );
});

// Gulp komutunda çalışacak kod bloğu
gulp.task('default', async function () {
  return runCss(platform), jsTask(platform), watcher('./src/scripts/**/**', 'scripts'), watcher('./src/styles/**/**', 'css'), serve();
});

// Gulp build komutunda çalışacak kod bloğu
exports.build = gulp.parallel('move-html', 'css', 'scripts', 'font', 'image', "exportable", "move-vendors");

// Gulp dev komutunda çalışacak kod bloğu
exports.dev = gulp.parallel(
  'move-html',
  'css',
  'scripts',
  'font',
  'image',
  "exportable",
  "move-vendors",
  'watchFiles',
  'serve'
);

exports.webserver = gulp.parallel("serve");