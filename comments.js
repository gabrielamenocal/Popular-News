var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var UserSchema = new Schema({
  
  comment: {
    type: String,
  },
   
  created: {
    type: Date,
    default: Date.now
  }

});

var comments = mongoose.model("comments", UserSchema);


module.exports = comments;
