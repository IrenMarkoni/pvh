const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const chalk = require("chalk");
const browserSync = require("browser-sync");
const uglify = require("gulp-uglify-es").default;

const jsPlugins = [
  "node_modules/swiper/swiper-bundle.min.js",
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/inputmask/dist/jquery.inputmask.min.js",
  "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js",
  "node_modules/perfect-scrollbar/dist/perfect-scrollbar.js",
  "node_modules/jquery-ui/dist/jquery-ui.min.js",
];

// * Задача для js плагинов
module.exports = function jsPluginsFunc(done) {
  if (jsPlugins.length > 0)
    return gulp
      .src(jsPlugins)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat("libs.min.js"))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("./build/assets/js"))
      .pipe(browserSync.stream());
  else {
    return done(console.log(chalk.redBright("No added JS plugins")));
  }
};
