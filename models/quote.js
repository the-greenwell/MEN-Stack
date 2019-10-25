var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user');

var QuoteSchema = new Schema({
    name: String,
    quote: String,
    quoteAuthor: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

var Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;
