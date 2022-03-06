
const gulp = require('gulp')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const srcmaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync').create()

function sassCompiler(next) {
    gulp.src('./lib/scss/main.scss')
        .pipe(srcmaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename((path) => {
            path.extname = '.css'
        }))
        .pipe(srcmaps.write('./'))
        .pipe(gulp.dest('./lib/css/'))
        .pipe(browserSync.stream())
    next()
}

function browUpdater(next) {
    browserSync.init({
        server: {
            baseDir: './lib'
        },
        port: 3300
    })
    next()
}

function browReload(next) {
    browserSync.reload()
    next()
}

function watchSass() {
    gulp.watch("./lib/scss/**/*.scss", sassCompiler)
}

function wathBrow() {
    gulp.watch('./lib/**/*', browReload)
}

gulp.task('default', gulp.series(browUpdater, gulp.parallel(watchSass,wathBrow)))