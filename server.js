var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");
var express = require("express");

// ****************MONGO CONNECTION TO HEROKU ******************

// var MongoClient  = ("mongodb").MongoClient,format=require('util').format;


// MongoClient.connect("ds033679.mlab.com:33679/news -u <dbuser> -p <dbpassword>", function (err,db){

//         if(err){
//           throw err;
//         }
//         else{
//           console.log("connected");

//         }

//         db.close();

// })







  // **************************************************************

var PORT = process.env.PORT|| 8080;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/userdb";


var News = require("./news.js");
var comments = require("./comments.js");


var app = express();

// app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })



app.post("/comments", function(req, res) {
  comments.create(req.body)
    .then(function(comments) {
      res.json(comments);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/comments", function(req, res){
  comments.find()
  .then(function(comments) {
    res.json(comments);
  })
  .catch(function(err) {
    res.json(err);
  });
})


app.get("/deletecomments/:id", function(req, res){
  console.log(req.params.id);
  comments.remove({_id: req.params.id})
  .then(function(data) {
    res.json(cdata);
  })
  .catch(function(err) {
    res.json(err);
  });
})


app.get("/google", function(req, res) {
  News.find({ source: "google"}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});
 
app.get("/bbc", function(req, res) {
  News.find({ source: "bbc" }, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});


app.get("/deletearticle/:id", function(req, res){
  console.log(req.params.id);
  News.remove({_id: req.params.id})
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    res.json(err);
  });
})


console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from BBC and Google News's Technology website section:" +
            "\n***********************************\n");


app.get("/scrapbbc", function(req, res){
      axios.get("https://www.bbc.com/news/technology").then(function(response) {  
      var $ = cheerio.load(response.data); 
      var resultsBBC = [];  
      $(".pigeon-item").each(function(i, element) {
        var title = $(element).children("a").children("h3").children("span").text();   
        var link = $(element).children().attr("href");
        if(title && link){
          resultsBBC.push({
            title: title,
            link: "https://www.bbc.com/news/technology" + link,
            source:"bbc"
          });
          var news = new News({title: title,
            link: "https://www.bbc.com/news/technology" + link,
            source:"bbc"})
            news.save();
          }
      });
    res.send(resultsBBC);
    });
});



// Google News
app.get("/scrapgoogle", function(req, res){
      axios.get("https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pEUVNnQVAB?hl=en-CA&gl=CA&ceid=CA%3Aen").then(function(response) {  
      var $ = cheerio.load(response.data); 
      var resultsGoogle = [];  
      $("a.VDXfz").each(function(i, element) {
        var title = $(element).text();   
        var link = $(element).attr("href");
        if(title || link){
          resultsGoogle.push({
            title: title,
            link: link,
            source: "google"
          });          
        }
        var news = new News ({
          title: title,
          link: "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pEUVNnQVAB?hl=en-CA&gl=CA&ceid=CA%3Aen",
          source:"google"
        })
        news.save();       
      });
      res.send(resultsGoogle);
    });
})


app.get("/cleargoogle", function(req, res){
  News.remove({ source: "google" }, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });


})



// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});




