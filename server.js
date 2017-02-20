// configuration =================
var express  = require('express');
var angularserver = require('angularjs-server');
var fs = require('fs');

var templateFile = 'client/index.html';
var template = fs.readFileSync(templateFile);
var app      = express();
app.use(express.static(__dirname + '/client'));
// listen (start app with node server.js)

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var angularMiddlewares = angularserver.Server({
    template: template,

    // Scripts that should be loaded into the angularjs context on the server.
    // This should include AngularJS itself and all of the source files required
    // to register your Angular modules, but *not* code to bootstrap the
    // application.
    serverScripts: [
        'angular.js',
        'angular-route.js',
        'app.js',
        'angular-bootstrap.js'
    ],

    // Scripts that should be loaded by the client browser to render the page.
    // This should include the same set of files to load Angular itself and
    // your Angular modules, but should also include additional code that
    // calls into angular.bootstrap to kick off the application.
    // Unlike serverScripts, these are URLs.
    clientScripts: [
        '/static/angular.js',
        '/static/angular-route.js',
        '/static/app.js'
    ],

    // Angular modules that should be used when running AngularJS code on
    // the server. 'ng' is included here by default, along with the
    // special AngularJS-Server overrides of 'ng'.
    angularModules: [
        'app'
    ]
});
    
// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});    

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
