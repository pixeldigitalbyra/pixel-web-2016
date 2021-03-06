/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  filter = require('gulp-filter'),
  project = require("./project.json"),
  sass = require('gulp-sass'),
  livereload = require('gulp-livereload');

var paths = {
  webroot: "./wwwroot/",
  bowerComponents: "./bower_components/",
  cshtml: "./Views/**/*.cshtml"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.scss = "./scss/**/*.scss";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";


// === LIB ===
gulp.task('lib:jquery', function () {
   gulp.src(paths.bowerComponents + "jquery/dist/*.js")
    .pipe(gulp.dest(paths.webroot + "lib/jquery"));
});

gulp.task("lib", ["lib:jquery"]);



// === MIN ===
gulp.task("clean:js", function(cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function(cb) {
  rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function() {
  gulp.src([paths.js, "!" + paths.minJs], {
      base: "."
    })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

gulp.task("min:css", function() {
  gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);


// === SASS ===
gulp.task("sass:site", function () {
  gulp.src("./scss/site.scss")
    .pipe(sass({includePaths: "bower_components/foundation-sites/scss"}).on("error", sass.logError))
    .pipe(gulp.dest(paths.webroot + "css"))
    .pipe(livereload());
});
gulp.task("sass:foundation", function () {
  gulp.src("./scss/foundation-sites-custom.scss")
    .pipe(sass({includePaths: "bower_components/foundation-sites/scss"}).on("error", sass.logError))
    .pipe(gulp.dest(paths.webroot + "css"))
    .pipe(livereload());
});
 
gulp.task("watch", function () {
  livereload.listen({quiet: true});
  gulp.watch(paths.scss, ["sass:site"]);
  gulp.watch(["./scss/foundation-sites-custom.scss", "./scss/partials/_foundation-sites-settings.scss"], ["sass:foundation"]);
  gulp.watch(paths.cshtml, function () { 
      gulp.src(paths.cshtml)
        .pipe(livereload());
  });
});