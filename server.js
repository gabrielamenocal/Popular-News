var cheerio = require("cheerio");
var axios = require("axios");

console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from New York Time's Technology website section:" +
            "\n***********************************\n");

axios.get("https://www.nytimes.com/section/technology").then(function(response) {  
  var $ = cheerio.load(response.data); 
  var results = [];  
  $("h2.headline").each(function(i, element) {
    var title = $(element).text();   
    var link = $(element).children().attr("href");
    results.push({
      title: title,
      link: link
    });
  });
  console.log(results);
});

console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from Google New's Technology website section:" +
            "\n***********************************\n");


axios.get("https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pEUVNnQVAB?hl=en-CA&gl=CA&ceid=CA%3Aen").then(function(response) {  
  var $ = cheerio.load(response.data); 
  var results = [];  
  $("a.VDXfz").each(function(i, element) {
    var title = $(element).text();   
    var link = $(element).children().attr("href");
    results.push({
      title: title,
      link: link
    });
  });
  console.log(results);
});
