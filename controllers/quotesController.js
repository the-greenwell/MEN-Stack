var db = require('../models')

function index(req, res) {
  db.Quote.find({}, function(err,allQuotes) {
    if (err) { console.log('error',err)}
    res.json(allQuotes)
  })
}

function create(req,res) {
  db.Quote.create(req.body, function(err,quote) {
    if (err) {console.log('error', err)}
    res.json(quote)
  })
}

function destroy(req,res){
  db.Quote.findByIdAndRemove(req.params.quote_id, function(err, destroyedQuote) {
    if (err) { console.log('error', err); }
    res.json(destroyedQuote);
  })
}

module.exports = {
  index:index,
  create:create,
  destroy:destroy,
}
