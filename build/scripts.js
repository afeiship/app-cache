(function () {

  'use strict';

  var gulp = require('gulp');
  var config = require('./config');
  var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  var scriptFiles = [
    'src/app-cache.js',
    'src/load-from-xhr.js',
    'src/load-from-cache.js',
    'src/load-text.js',
    'src/inject-script.js',
    'src/inject-style.js',
    'src/store.js',
    'src/manifest.js'
  ];


  var pkg = require('../package.json');
  var comment = '/*\n' +
    ' * <%= pkg.name %> <%= pkg.version %>\n' +
    ' * <%= pkg.description %>\n' +
    ' * <%= pkg.homepage %>\n' +
    ' *\n' +
    ' * Copyright 2018, <%= pkg.author.name %> - <%= pkg.author.email %>\n' +
    ' * Released under the <%= pkg.license %> license.\n' +
    '*/\n\n';


  gulp.task('scripts', function () {
    return gulp.src(scriptFiles)
      .pipe($.concat('app-cache.js'))
      .pipe($.banner(comment, {pkg: pkg}))
      .pipe(gulp.dest('dist'))
      .pipe($.size({title: '[ default size ]:'}))
      .pipe($.uglify())
      .pipe($.rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest('dist'))
      .pipe(gulp.dest('test/dist'))
      .pipe($.size({title: '[ minimize size ]:'}));
  });

}());
