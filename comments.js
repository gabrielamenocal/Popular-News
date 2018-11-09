var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var UserSchema = new Schema({
  
  comment: {
    type: String,
  },
   
  newsCreated: {
    type: Date,
    default: Date.now
  }

});

var news = mongoose.model("comments", UserSchema);


module.exports = comments;
