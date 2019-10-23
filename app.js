const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const cookieParser  = require('cookie-parser');
const session       = require('express-session');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db    = require('./models');
const User  = db.User;
const Quote = db.Quote;

const controllers = require('./controllers');

require('dotenv').config();

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  secret: `'${process.env.SESH_KEY}'`,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function (req, res) {

  res.sendFile('views/index.html' , { root : __dirname});

});
app.get('/signup', function (req, res) {

  res.sendFile('views/signup.html' , { root : __dirname});

});
app.get('/login', function (req, res) {

  res.sendFile('views/login.html' , { root : __dirname});

});
app.get('/quotes', function (req, res) {
  if (req.user) {
    res.sendFile('views/quotes.html' , { root : __dirname});
  } else {
      res.status(401).redirect('/');
  }
});

app.get('/api/quotes', controllers.quotes.index);
app.post('/api/quotes', controllers.quotes.create);
app.delete('/api/quotes/:quote_id', controllers.quotes.destroy)

app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/quotes');
      });
    }
  );
});
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.redirect('/quotes');
});
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

var server = app.listen(process.env.PORT,() => console.log(`listening on ${process.env.PORT}`));
