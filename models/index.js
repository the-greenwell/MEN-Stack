require('dotenv').config()
var mongoose = require('mongoose');
mongoose.connect(`'${process.env.DB_URL}'`, {useNewUrlParser: true });

var Quote = require('./quote');
var User = require('./user');

module.exports = {
  Quote: Quote,
  User: User,
}
