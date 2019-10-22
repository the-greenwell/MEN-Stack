var express = require('express');
var app = express();

app.get('/', function(req,res){
  res.send('This is the home-page');
});

app.route('/about').get(function(req,res){
  res.send('This is the about-page');
})

app.route('/contact').get(function(req,res){
  res.send('This is the contact-page');
});

var server = app.listen(3000,function(){

});
