var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    Quote = require('./quote');

var UserSchema = new Schema ({
  name: String,
  username: String,
  password: String,
  postedQuotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}]
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);

module.exports = User;
