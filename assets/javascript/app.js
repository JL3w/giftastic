var searchTerms = ["kittens", "puppies", "baby cow", "juxtapoze", "ryan gosling", "nice shot"];


function renderButtons() {
    $("#button").empty();
    for (var i = 0; i < searchTerms.length; i++) {
      var a = $("<button>");
      a.attr("type", "button");
      a.addClass("btn btn-outline-info");
      a.addClass("topic");
      a.attr("data-name", searchTerms[i]);
      a.text(searchTerms[i]);
      $("#button").append(a);
    }
  };
  
  $("#submit").on("click", function(event) {
    event.preventDefault();
    var topic = $("#input-form").val().trim();
    searchTerms.push(topic);
    renderButtons();
  });
  renderButtons();

  $(document).on("click", ".topic", function(event) {
    event.preventDefault();
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=hPbcV5OKBoyuEzCYPU5Kgt5ORqa62VEk&limit=9";
    $("#gifs").empty();
  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    var results = response.data;

    for (i = 0; i < results.length; i++) {
    
    var gifDiv = $("<div>");
    gifDiv.addClass("giffs")
    gifDiv.addClass("col-4")
    var rating = results[i].rating;
    
    var p = $("<p>").text("Rating: " + rating);
    var image = $("<img>");
    image.addClass("jif")
    image.attr("src", results[i].images.fixed_height_still.url);
    image.attr("data-still", results[i].images.fixed_height_still.url);
    image.attr("data-animate", results[i].images.fixed_height.url);
    image.attr("data-state", "still");
   
    gifDiv.append(p);
    gifDiv.append(image);
   
    $("#gifs").append(gifDiv);
    }
    })});
    $(document).on("click", ".jif", function(event) {
        var state = $(this).attr("data-state");
      
        if (state === "still") {
          var imageIClickedOn = $(this);
          var animatedURL = imageIClickedOn.attr("data-animate");
          imageIClickedOn.attr("src", animatedURL);
  
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
