
$("#addcomment").on("click", function() {
    $.ajax({
      type: "POST",
      url: "/comments",
      dataType: "json",
      data: {
        comment: $("#comment").val(),
        created: Date.now()
      }
    })
      .then(function(data) {
        console.log(data);      
        $("#comment").val("");
       
      }
      );
    return false;
  });
  
  $(document).on("click", "#googlebutton", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
      type: "GET",
      url: "/google" + thisId
    });
    $(this).parents("tr").remove();
    // getGoogle();
  });
  
  // Click event to mark a book as not read
  $(document).on("click", "#bbcbutton", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
      type: "GET",
      url: "/bbc" + thisId
    });
    $(this).parents("tr").remove();
    // getBBC();
  });
  
  
  // Functions
  
 
  function getGoogle() {
    $("#google").empty();
    $.getJSON("/google", function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#google").prepend("<tr><td>" + data[i].title + "</td><td>" + data[i].link +
          "</td><td>&nbsp;&nbsp;<button class='btn btn-warning' data-id='" + data[i]._id + "'>Remove</button></td></tr>");
      }
      $("#google").prepend("<tr><th>Title</th><th>Link</th></tr>");
    });
    // getGoogle()
  }
  
  function getBBC() {
    $("#bbc").empty();
    $.getJSON("/bbc", function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#bbc").prepend("<tr><td>" + data[i].title + "</td><td>" + data[i].author +
          "</td><td>&nbsp;&nbsp;<button class='btn btn-warning' data-id='" + data[i]._id + "'>Remove</button></td></tr>");
      }
      $("#bbc").prepend("<tr><th>Title</th><th>Link</th></tr>");
    });
    // getBBC();  
  }
  
 
  getGoogle();
  getBBC();
  