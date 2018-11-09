var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");

var PORT = 8080;

var news = require("/.news.js");
var comments = require("/.comments.js");


var app = express ();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/userdb", { useNewUrlParser: true })


// Route to post our form submission to mongoDB via mongoose
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
  db.news.find({ source: "googlenews"}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});
 
app.get("/nytimes", function(req, res) {
  db.news.find({ source: "nytimes" }, function(error, found) {
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
            "from New York Times and Google News's Technology website section:" +
            "\n***********************************\n");

axios.get("https://www.nytimes.com/section/technology").then(function(response) {  
  var $ = cheerio.load(response.data); 
  var resultsNYtimes = [];  
  $("h2.headline").each(function(i, element) {
    var title = $(element).text();   
    var link = $(element).children().attr("href");
    resultsNYtimes.push({
      title: title,
      link: link,
      source:"nytimes"
    });
  });
  console.log("New York Times: \n" + resultsNYtimes);
  console.log(resultsNYtimes);

});

// Google News

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
  console.log("Google Results: \n" + resultsGoogle);
  console.log(resultsGoogle);

});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});




