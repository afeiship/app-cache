(function () {

  'use strict';

  const gulp = require('gulp');
  const saveLicense = require('uglify-save-license');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del', '@jswork/gulp-*']
  });

  const scriptFiles = [
    'src/core.js',
    'src/load-from-xhr.js',
    'src/load-from-cache.js',
    'src/load-text.js',
    'src/inject-script.js',
    'src/inject-style.js',
    'src/store.js',
    'src/manifest.js'
  ];


  gulp.task('scripts', function () {
    return gulp
      .src(scriptFiles)
      .pipe($.concat('index.js'))
      .pipe($.jswork.pkgHeader())
      .pipe(gulp.dest('dist'))
      .pipe($.size({ title: '[ default size ]:' }))
      .pipe($.uglify({ output: { comments: saveLicense } }))
      .pipe($.rename({ extname: '.min.js' }))
      .pipe(gulp.dest('dist'))
      .pipe(gulp.dest('__tests__/dist'))
      .pipe($.size({ title: '[ minimize size ]:' }));
  });

}());
