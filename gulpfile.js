'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var copy = require('gulp-copy');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var autoprefixer = require('autoprefixer');

var srcDir = './src/';
var distDir = './dist/';

var srcFiles = {
  scss: [ srcDir + '**/*.scss'],
  js: [ srcDir + '**/*.js']
};

var distFiles = {
  css: [ distDir + '**/*.css'],
  js: [ distDir + '**/*.js']
};

var sassOptions = {
  outputStyle: 'expanded'
};

gulp.task('sass', function () {
  return gulp.src(srcFiles.scss)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest(distDir));
});

gulp.task('autoprefixer', function () {
  return gulp.src(distFiles.css)
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest(distDir));
});

gulp.task('clean', function() {
  return gulp.src(distDir, {read: false})
		.pipe(clean());
});

gulp.task('copy', function() {
  return gulp.src(srcFiles.js)
    .pipe(copy(distDir, { prefix: 1 }))
    .pipe(gulp.src(distFiles.js)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(distDir))
  );
});

gulp.task('compress', function() {
  return gulp.src(distFiles.css)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(distDir));
});

gulp.task('uglify', function() {
  return gulp.src(distFiles.js)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(distDir))
});

gulp.task('build', function(cb) {
  runSequence('clean', 'sass', ['autoprefixer', 'copy'], ['compress', 'uglify'], cb);
});

gulp.task('default', ['build']);

gulp.task('watch', function () {
  gulp.watch([srcFiles.scss, srcFiles.js], ['build']);
});
