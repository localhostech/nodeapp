var mongoose = require('mongoose');

// define the schema for our user model
var messageSchema = mongoose.Schema({
    text     : String,
    author: String,
    created: {type: Date,default: Date.now}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Message', messageSchema);
