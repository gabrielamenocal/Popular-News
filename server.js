var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");
var express = require("express");

var PORT = 8080;

var news = require("./news.js");
var comments = require("./comments.js");


var app = express();

// app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/userdb", { useNewUrlParser: true })



app.post("/comments", function(req, res) {
  comments.create(req.body)
    .then(function(dbcomments) {
      res.json(dbcomments);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/google", function(req, res) {
  news.find({ source: "googlenews"}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});
 
app.get("/bbc", function(req, res) {
  news.find({ source: "bbc" }, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from BBC and Google News's Technology website section:" +
            "\n***********************************\n");


app.get("/scrapbbc", function(req, res){
      axios.get("https://www.bbc.com/news/technology").then(function(response) {  
      var $ = cheerio.load(response.data); 
      var resultsNYtimes = [];  
      $(".pigeon-item").each(function(i, element) {
        var title = $(element).children("a").children("h3").children("span").text();   
        var link = $(element).children().attr("href");
        if(title && link){
          resultsNYtimes.push({
            title: title,
            link: "https://www.bbc.com/news/technology" + link,
            source:"bbc"
          });
          var article = new news({title: title,
            link: "https://www.bbc.com/news/technology" + link,
            source:"bbc"})
            article.save();
          }

      });
    res.send(resultsNYtimes);
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
        resultsGoogle.push({
          title: title,
          link: link,
          source: "googlenews"
        });
      });
      res.send(resultsGoogle);
    });
})





// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});




