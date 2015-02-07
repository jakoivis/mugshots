
// run 'gulp build' first. makes a release build
// then 'gulp watch' to start editing
// after 'gulp clean' you need to update the build dir again by calling 'gulp build'

var gulp = require('gulp');
var glob = require('glob');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var util = require('gulp-util');
var clean = require('gulp-clean');

var mainSourceFile = './src/index.js';
var sourceFiles = './src/**/*.js';
var htmlFiles = './src/**/*.html';
var imageFiles = './assets/**/*.png';

var buildFolder = './build/';
var coverageFolder = './coverage/';

var isLiveReloading = false;

function getBundleFileName() {
    return getPackageName() + '.js';
}

function getPackageName() {
    return require('./package.json').name;
}

function getPackageVersion() {
    return require('./package.json').version;
}

gulp.task('startLiveServer', function() {
    isLiveReloading = true;
    connect.server({port: 8080, livereload: true});
});

gulp.task('startSingleRunServer', function() {
    if(!isLiveReloading) {
        connect.server({port: 8080, livereload: false});
    }
});

function serverStop() {
    if(!isLiveReloading) {
        connect.serverClose();
    }
}

gulp.task('clean', function() {
    var allBuildFiles = buildFolder + '*';
    return gulp.src(allBuildFiles, {read:false})
        .pipe(clean());
});

gulp.task('build', ['copy-images','copy-3rd-party','copy-html'], function() {
    browserify(mainSourceFile)
        .bundle()
        .pipe(source(getBundleFileName()))
        .pipe(buffer())
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest(buildFolder));
});

gulp.task('debug-build', ['copy-html'], function() {

    browserify(mainSourceFile)
        .bundle()
        .pipe(source(getBundleFileName()))
        .pipe(buffer())
        .pipe(gulp.dest(buildFolder))
        .pipe(connect.reload());
});

gulp.task('copy-html', function() {
    gulp.src([htmlFiles], {base: '' })
        .pipe(gulp.dest(buildFolder));
});

gulp.task('copy-images', function() {
    gulp.src(imageFiles, {base: './' })
        .pipe(gulp.dest(buildFolder));
});

gulp.task('copy-3rd-party', function() {
    var filesToMove = [
        './bower_components/imageLoader/build/imageLoader.min.js',
        './bower_components/easeljs/lib/easeljs-0.8.0.min.js'
    ];
    gulp.src(filesToMove, {base: '' })
        .pipe(gulp.dest(buildFolder));
});


gulp.task('watch', ['startLiveServer'], function() {

    gulp.watch([sourceFiles, htmlFiles], ['debug-build'], function(event) {
        return gulp.src(event.path)
            .pipe(connect.reload());
    });
});