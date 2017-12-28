
var gulp = require("gulp");
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var concatCss = require("gulp-concat-css");
var modifyCssUrls = require("gulp-modify-css-urls");
var templateCache = require("gulp-angular-templatecache");
var runSequence = require("run-sequence");
var basename = require("path").basename;

gulp.task("sass", function() {
    return gulp.src('./style/bulma.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./style'));
});

gulp.task("style", function() {
    var style = [
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

gulp.task("watch", function(){
    return watch([
        'app/**',
        'style/bulma.sass',
        'style/**/*.css',
    ], function() {
        gulp.run(["default"]);
    });
});

gulp.task("default", function(done) {
    runSequence("sass", "style", "fonts", "tpl", "js", done);
});

