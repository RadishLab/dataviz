// init.js
var fs = require('fs')

var dirs = ['assets', 'build', 'data', 'fontcustom', 'scripts']
var subdir = ['css', 'fonts', 'img', 'js', 'svg', 'vendor']

// create the project skeleton
dirs.forEach(function(dir,i){
  fs.mkdir(dir);
  if (dir === 'assets') {
    subdir.forEach(function(dir, j) {
      fs.mkdir("assets/" + dir)
    })
  }
})
