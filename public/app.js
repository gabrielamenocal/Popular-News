// Click Events

// Click event to add a book to the db
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
        // getUnread();
        $("##addcomment").val("");
       
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
    getGoogle();
  });
  
  // Click event to mark a book as not read
  $(document).on("click", "#nybutton", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
      type: "GET",
      url: "/nytimes" + thisId
    });
    $(this).parents("tr").remove();
    getNYtimes();
  });
  
  
  // Functions
  
 
  function getGoogle() {
    $("#googlenews").empty();
    $.getJSON("/google", function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#unread").prepend("<tr><td>" + data[i].title + "</td><td>" + data[i].link +
          "</td><td><button class='google' data-id='" + data[i]._id + "'>Remove</button></td></tr>");
      }
      $("#googlenews").prepend("<tr><th>Title</th><th>Link</th></tr>");
    });
  }
  
  function getNYtimes() {
    $("#nytimesnews").empty();
    $.getJSON("/nytimes", function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#read").prepend("<tr><td>" + data[i].title + "</td><td>" + data[i].author +
          "</td><td><button class='nytimes' data-id='" + data[i]._id + "'>Remove</button></td></tr>");
      }
      $("#nytimesnews").prepend("<tr><th>Title</th><th>Link</th></tr>");
    });
  }
  
 
  getGoogle();
  getNYtimes();
  