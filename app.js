const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const cookieParser  = require('cookie-parser');
const session       = require('express-session');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pug = require('pug')

const db    = require('./models');
const User  = db.User;
const Quote = db.Quote;

const controllers = require('./controllers');

require('dotenv').config();

app.use(express.static('public'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  secret: `'${process.env.SESH_KEY}'`,
  resave: false,
  saveUninitialized: false,
  name: 'sessionID'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
app.get('/', function (req, res) {
  res.render('index')
});
app.get('/signup', function (req, res) {
  res.render('signup')
});
app.get('/login', function (req, res) {
  res.render('login')
});
app.get('/quotes', function (req, res) {
  console.log(req.user)
  if (req.isAuthenticated()) {
    res.render('quotes', {name:req.user.name});
  } else {
      res.status(401).redirect('/');
  }
});

app.get('/api/quotes', controllers.quotes.index);
app.post('/api/quotes', controllers.quotes.create);
app.delete('/api/quotes/:quote_id', controllers.quotes.destroy)

app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username, name: req.body.name }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/quotes');
      });
    }
  );
});
app.post('/login', passport.authenticate('local', {
    successRedirect: '/quotes',
    failureRedirect: '/login',
  })
);
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

var server = app.listen(process.env.PORT,() => console.log(`listening on ${process.env.PORT}`));
