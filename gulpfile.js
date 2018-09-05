var gulp = require('gulp'); 
var pug = require('gulp-pug');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-server-livereload');
var plumberNotifier = require('gulp-plumber-notifier');
var babel = require('gulp-babel');
// var concat = require('gulp-concat');
var rename = require('gulp-rename');
var changed = require('gulp-changed'); 
var cleancss = require('gulp-cleancss');
gulp.task('fonts', function(){
  gulp.src(['./src/fonts/*.woff','./src/fonts/*.woff2'])
  .pipe(gulp.dest('./dist/fonts'))
  gulp.src('./src/fonts/*.css')
  .pipe(concat('fonts.css'))
  .pipe(cleancss({keepBreaks: false}))
  .pipe(gulp.dest('./dist/fonts'))
}) 
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: false,
      port: 8080
    }));
});
gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(plumberNotifier())
    .pipe(changed('./dist/css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 20 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('js',()=>{
  gulp.src('./src/js/*.js')
  .pipe(changed('./dist/js'))
  .pipe(plumberNotifier())
  .pipe(babel())
  .pipe(gulp.dest('./dist/js/'))
})
gulp.task('img',()=>{
  gulp.src('./src/img/*')
  .pipe(changed('./dist/img'))
  .pipe(plumberNotifier())
  .pipe(gulp.dest('./dist/img/'))
})
gulp.task('views', function buildHTML() {
  return gulp.src('./src/*.pug')
  .pipe(changed('./dist'))
  .pipe(plumberNotifier())
  .pipe(pug({
    // Your options in here.
    pretty: true
  }))
  .pipe(gulp.dest('./dist/'))
});
gulp.task('watch', function(){
  gulp.watch('./src/*.pug', ['views'])
  gulp.watch('./src/partials/*.pug', ['views'])
  gulp.watch('./src/sass/*.scss', ['sass'])
  gulp.watch('./src/js/*.js', ['js'])
})
gulp.task('default', ['views','watch','webserver','sass','js','img'])