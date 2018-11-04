(function() {
  'use strict';

  var gulp = require('gulp');
  var config = require('./config');
  var argv = require('yargs').argv;
  var path = require('path');
  var gulpSequence = require('gulp-sequence');
  var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  /**
   * @thanks to:
   * http://www.jianshu.com/p/d616d3bf391f
   */

  gulp.task('bump-json', function() {
    gulp
      .src(['./package.json'])
      .pipe($.bump())
      .pipe(gulp.dest('./'));
  });

  gulp.task('bump-js', function() {
    var pkgJSON = require(path.resolve(__dirname, '../package.json'));
    gulp
      .src(['dist/*.js'])
      .pipe($.replace('__VERSION__', pkgJSON.version))
      .pipe(gulp.dest('./dist'));
  });
})();
