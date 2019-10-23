var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuoteSchema = new Schema({
    name: String,
    quote: String,
})

var Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;
