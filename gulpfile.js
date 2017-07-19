'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const runSeq = require('run-sequence');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');


gulp.task('sass', function(){
  console.log('\nSassing...\n');
  return gulp.src('src/app.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename('slim.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  console.log('\nCleaning...\n');
  return del.sync('dist');
});


gulp.task('build', function(callback){
  console.log('\nBuilding...\n');
  runSeq('clean',
    ['sass'],
    callback
  );
});


gulp.task('watch', ['build'], function(){
  console.log('\nWatching... \n');
  gulp.watch(['src/app.scss', 'src/base.scss', 'src/button.scss', 'src/classes.scss', 'src/form.scss', 'src/navbar.scss', 'src/typography.scss', 'src/util.scss'], ['sass']);
});


gulp.task('default', function (callback) {
  runSeq(['watch'],
    callback
  );
});


/**
* Run `gulp build:prefixed` to get slim compressed with autoprefixer
* Weighs 3.5Kb prefixed
* Weighs 3Kb not prefixed
*/
gulp.task('sass:prefixed', function(){
  console.log('\nSassing with auto prefixer...\n');
  return gulp.src('src/app.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(rename('slim.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:prefixed', function(callback){
  console.log('\nBuilding with autoprefixer...\n');
  runSeq('clean',
    ['sass:prefixed'],
    callback
  );
});
