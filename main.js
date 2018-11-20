let topics =['beef', 'chicken', 'ramen'];

  for (let i = 0; i < topics.length; i++) {
    console.log('here')
    let newBtn = $(`<button class="btn" data-food=${topics[i]}>`);
    newBtn.text(topics[i]);
    $('#button-div').append(newBtn);
}

$(document).on("click", ".btn", function() {
  // Grabbing and storing the data-animal property value from the button
  let food = $(this).attr("data-food");
  console.log(food);

  // Constructing a queryURL using the animal name
  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    food + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
  .then(function(response) {
    $("#images").empty();
    let results = response.data;
    for (let i = 0; i < results.length; i++) {
      console.log(results[i].images);
      let foodDiv = $("<div>");
      let p = $("<p>").text("Rating: " + results[i].rating);
      let animalImage = $("<img>");
      // animalImage.attr("src", results[i].images.fixed_height.url);
      animalImage.attr("src", results[i].images.fixed_height_still.url)
      animalImage.data('state', 'still')
      animalImage.attr('data-animate', results[i].images.fixed_height.url)
      animalImage.attr('data-still', results[i].images.fixed_height_still.url)
      animalImage.attr('class', 'gif')
      foodDiv.append(p);
      foodDiv.append(animalImage);
      $("#images").prepend(foodDiv);
    }
  });
});

$('#submission-form').on('submit', function(event) {
  event.preventDefault();
  let food = $('#food-text').val();

  let newBtn = $(`<button class="btn" data-food=${food}>`);
  newBtn.text(food);
  $('#button-div').append(newBtn);
})

$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});