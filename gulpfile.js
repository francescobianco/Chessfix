
var gulp = require("gulp");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var concatCss = require("gulp-concat-css");
var modifyCssUrls = require("gulp-modify-css-urls");
var templateCache = require("gulp-angular-templatecache");
var runSequence = require("run-sequence");
var basename = require("path").basename;

gulp.task("style", function() {
    var style = [
        "./bower_components/**/*.css",
        "./style/**/*.css"
    ];
    return gulp.src(style)
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest("./public/css"));
});

gulp.task("fonts", function() {
    return gulp.src("./bower_components/**/fonts/*.{ttf,woff,eof,eot,svg,htc}")
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest("./public/fonts"));
});

gulp.task("tpl", function() {
    return gulp.src("./app/**/*.html")
        .pipe(templateCache({root: "app/", module: "app"}))
        .pipe(gulp.dest("app"));
});

gulp.task("js", function() {
    var js = [
        "./bower_components/jquery/dist/jquery.min.js",
        "./bower_components/angular/angular.min.js",
        "./bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "./app/chessboard-0.3.0.js",
        "./app/app.js",
        "./app/templates.js",
        "./app/**/*.js"
    ];
    return gulp.src(js)
        .pipe(concat("app.js"))
        .pipe(gulp.dest("./public/js"));
});

gulp.task("default", function(done) {
    runSequence("style", "fonts", "tpl", "js", done);
});
