var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var UserSchema = new Schema({
  
  title: {
    type: String,
  },

  link: {
    type: String,
  },

  source: {
    type: String,
  },
 
  newsCreated: {
    type: Date,
    default: Date.now
  }

});

var news = mongoose.model("news", UserSchema);


module.exports = news;
