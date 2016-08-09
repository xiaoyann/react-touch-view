var webpack = require('webpack');
var DevServer = require('webpack-dev-server');

var port = 8080;
var host = getIP();
var url = 'http://' + host + ':' + port;

var compiler = webpack({
  entry: [
    'webpack-dev-server/client?' + url,
    __dirname + '/app.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
});

new DevServer(compiler, {
  quiet: true,
  contentBase: __dirname
}).listen(port, host, function() {
  console.log("==> 🌎  Listening on port %s. Open up %s in your browser.", port, url);
});

function getIP() {
  var os = require('os');
  var IPv4 = '127.0.0.1';
  var interfaces = os.networkInterfaces();
  for (var key in interfaces) {
    interfaces[key].some(function(details){
      if (details.family == 'IPv4' && key == 'en0') {
        IPv4 = details.address;
        return true;
      }
    });
  }
  return IPv4;
}
