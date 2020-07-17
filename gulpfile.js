var gulp = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync').create();

// BrowserSync Reload
function reload(done) {
    browserSync.reload();
    done();
}

function style() {
    return (
        gulp
            .src("src/assets/scss/*.scss")
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(gulp.dest("src/assets/css"))
    );
}

function watch(){
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        proxy: {
            target: "http://localhost:8080", // can be [virtual host, sub-directory, localhost with port]
            ws: true // enables websockets
        }
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        // proxy: "yourlocal.dev"
    });

    gulp.watch('src/assets/scss/*.scss', gulp.series(style,reload));
    gulp.watch('src/assets/scss/layout/*.scss', gulp.series(style,reload));
    gulp.watch('src/assets/scss/components/*.scss', gulp.series(style,reload));
    gulp.watch('src/assets/scss/config/_commons.scss', gulp.series(style,reload));
    gulp.watch('src/assets/scss/config/_fonts.scss', gulp.series(style,reload));
    gulp.watch('src/assets/scss/config/_plugin.scss', gulp.series(style,reload));
    gulp.watch('src/assets/scss/config/_grid.scss', gulp.series(style,reload));
}

exports.style = style;
exports.watch = watch
