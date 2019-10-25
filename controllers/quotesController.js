var db = require('../models')
var passport = require('passport')



function index(req, res) {
  if (req.isAuthenticated()){
    db.Quote.find({}, function(err,allQuotes) {
      if (err) { console.log('error',err)}
      res.json(allQuotes)
    }).populate('quoteAuthor')
  } else {
    res.send('You\'re not authorized to do that')
  }
}

function create(req,res) {
  if (req.isAuthenticated()){
    var user = req.user._id
    var quote = new db.Quote({
      name: req.user.username,
      quote: req.body.quote,
      quoteAuthor: user
    })
    console.log('this is ' + req.user._id)
    quote.save(function(err,savedQuote){
      if(err){console.log(err)}
      console.log(savedQuote.quoteAuthor)
      res.json(savedQuote)
    })

    req.user.postedQuotes.push(quote)
    req.user.save(function(err, savedUser){
      if(err) {console.log(err)}
    })
  } else {
    res.send('You\'re not authorized to do that')
  }
}

function destroy(req,res){
  if (req.isAuthenticated()){
    db.Quote.findByIdAndRemove(req.params.quote_id, function(err, destroyedQuote) {
      if (err) { console.log('error', err); }
      res.json(destroyedQuote);
    })
  } else {
    res.send('You\'re not authorized to do that')
  }
}

module.exports = {
  index:index,
  create:create,
  destroy:destroy,
}
