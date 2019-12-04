"use strict";

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
var babel = require('gulp-babel');

var browserify = require('browserify');

var gulp = require('gulp');

var rename = require('gulp-rename');

var source = require('vinyl-source-stream');

var uglify = require('gulp-uglify');
/**
 * Prepares the files for browser usage
 *
 *  - Bundle with browserify
 *  - Transpile with Babel
 *  - Minify with uglify
 */


gulp.task('build', ['bundle'], function () {
  gulp.src('./dist/dijkstra.js').pipe(babel()).pipe(gulp.dest('./dist')).pipe(uglify()).pipe(rename({
    suffix: '.min'
  })).pipe(gulp.dest('./dist'));
});
gulp.task('bundle', function () {
  var b = browserify({
    entries: './libs/Graph.js'
  });
  return b.bundle().pipe(source('dijkstra.js')).pipe(gulp.dest('./dist'));
});
//# sourceMappingURL=gulpfile.js.map