const gulp = require("gulp"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename");

gulp.task("concatScripts", ()=>{
	gulp.src([
		"app.js"
	])
		.pipe(concat("one_app.js"))
		.pipe(gulp.dest("./js/"));
});

gulp.task("minifyScripts", () => {
	gulp.src("./app.js") 
		.pipe(uglify())
		.pipe(rename("app.min.js"))
		.pipe(gulp.dest("./js/"));
});

gulp.task("default", ["concatScripts", "minifyScripts"], () => {
	console.log("finished default task");
});