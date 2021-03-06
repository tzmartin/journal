function parse(cur, b) {
  
  var config = this.options.pluginsConfig.customtheme || {js:[], css:[]};
  var updateElements;
  updateElements = '';
  
  var getPathHierarchy = function() {
    var temp = '';
    if (!cur._input) {
      return temp;
    }
    var depth = cur._input.split('/');
    for (var i = 0; i < depth.length - 1; i++) {
      temp += '../';
    }
    return temp;
  };
  var resolvePath = function(fileName) {
    var temp = fileName.replace('../', '');
    return  getPathHierarchy() + temp;
  };
  if (config.js && config.js.length > 0) {
    for (var i in config.js) {
      updateElements += '<script type="text/javascript" src="' + resolvePath(config.js[i]) + '"></script>';
    }
  }
  if (config.css && config.css.length > 0) {
    var temp;
    for (var i in config.css) {
      temp = config.css[i].replace('../', '');
      updateElements += '<link rel="stylesheet" type="text/css" href="' + resolvePath(temp) +'">';
    }
  }
  
  return updateElements;
}

module.exports = {
  book: {
    assets: ".",
    js: [],
    css: [
      "main.css"
    ],
    html: {
      'body:end' : parse
    }
  }
};
