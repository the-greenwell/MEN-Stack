var express = require('express');
var app = express();

app.set('view engine','pug');

app.get('/', function(req,res){
  res.render('index',{title:'Home',message:'Welcome to the Home Page!'});
});

app.route('/about').get(function(req,res){
  res.render('about',{title:'About',message:'Lorem Ipsem!'});
})

app.route('/contact').get(function(req,res){
  res.render('contact',{title:'Contact',message:'Contact me here!'});
});

var server = app.listen(3000,function(){

});
