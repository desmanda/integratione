// configuration =================
var express  = require('express');
//var fs = require('fs');
//var templateFile = 'client/index.html';
//var template = fs.readFileSync(templateFile);
var app      = express();
app.use(express.static(__dirname + '/client'));
// listen (start app with node server.js)

var port = process.env.PORT || 8080;
   // ip   = process.env.IP || '127.0.0.1';
    
// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});    

app.get('/', function(req, res) {
    res.redirectTo('client/index.html');
});


app.listen(port);
console.log('Server running on http://%s:%s', port);
