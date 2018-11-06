var cheerio = require("cheerio");
var axios = require("axios");

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
      link: link
    });
  });
  console.log("New York Times: \n" + resultsNYtimes);
});

// Google News

axios.get("https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pEUVNnQVAB?hl=en-CA&gl=CA&ceid=CA%3Aen").then(function(response) {  
  var $ = cheerio.load(response.data); 
  var resultsGoogle = [];  
  $("a.VDXfz").each(function(i, element) {
    var title = $(element).text();   
    var link = $(element).children().attr("href");
    resultsGoogle.push({
      title: title,
      link: link
    });
  });
  console.log("Google Results: \n" + resultsGoogle);
});
