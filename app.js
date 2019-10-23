const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = require('./models');
const controllers = require('./controllers');

require('dotenv').config();

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});


app.get('/api/quotes', controllers.quotes.index);
app.post('/api/quotes', controllers.quotes.create);
app.delete('/api/quotes/:quote_id', controllers.quotes.destroy)

var server = app.listen(process.env.PORT,() => console.log(`listening on ${process.env.PORT}`));
