/**
 * Created by zyg on 15/11/10.
 */
var tinyPng = require('gulp-tinypng');
var path = require('path');
var apiKey = '_U9AFU6XG2QpeMT3__2pWl5pOW10NvfL';

var pngDir = path.resolve(__dirname,'../images/*/*.png');

var dest = path.resolve(__dirname,'../compress/');

var compress = path.resolve(__dirname,'../compress/*/*.png');

var originDir = path.resolve(__dirname,'../images/');

module.exports = function(gulp){

  gulp.task('tiny',function(){
    gulp.src(pngDir)
      .pipe(tinyPng(apiKey))
      .pipe(gulp.dest(dest));
  });

  gulp.task('move', function () {
    gulp.src(compress)
        .pipe(gulp.dest(originDir));
  })
};
