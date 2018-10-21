var gulp = require("gulp");
var ts = require("gulp-typescript");

gulp.task("ts", function() {
    return gulp.src("src/**/*.ts")
        .pipe(ts({
            noImplicitAny: true,
            module: "commonjs",
            sourceMap: true
        }))
        .js.pipe(gulp.dest("dist"));
});

gulp.task("default", function () {
    var tsResult = gulp.src("src/*.ts")
        .pipe(ts({
            noImplicitAny: true,
            out: "main.js"
        }));
    return tsResult.js.pipe(gulp.dest("dist"));
});

gulp.task("watch", function() {
    let watcher = gulp.watch("src/**/*.ts");
    watcher.on("all", gulp.series("ts"));
});
