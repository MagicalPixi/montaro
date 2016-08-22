var path = require('path');
var fs = require('fs');
// 引入 gulp
var gulp = require('gulp');

var tasksPath = path.resolve(__dirname,'./tasks/');
var taskList = fs.readdirSync(tasksPath).map(function (taskName) {
  return path.resolve(tasksPath,taskName)
}).filter(function (p) {
  return !fs.lstatSync(p).isDirectory();
}).forEach(function(p){
  console.log(p);
  var taskFn = require(p);
  if(typeof taskFn === 'function'){
    taskFn(gulp);
  }
});

module.exports = gulp;
