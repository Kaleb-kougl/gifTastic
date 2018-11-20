  // Storing our giphy API URL for a random cat image
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";

$(".btn").on("click", function() {
    // Grabbing and storing the data-animal property value from the button
    let food = $(this).attr("data-food");
    console.log(food);

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      food + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
    .then(function(response) {
      $("#images").empty();
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var foodDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height.url);
        foodDiv.append(p);
        foodDiv.append(animalImage);
        $("#images").prepend(foodDiv);
      }
    });
  });