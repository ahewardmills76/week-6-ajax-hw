
/*Beleow are the defects with this code:

1)It is possible for blank buttons and duplicate buttons to be added.

2)Added buttons do not display gifs from the Giphy API on user click event.

3)Upon initial load the first four anime title buttons display gifs from the Giphy API; but no longer 
display gifs on user click event after the user has added new buttons from the form.

4)When I inititially coded the gifs to load in a static state then animate, only every other gif would animate.
This caused me to code them so they would load in an animated state and would toggle to a still state upon
being clicked on by the user.  The older code is commented out below the new code.

*/   
var topics = ["Fullmetal Alchemist", "Attack On Titan", "One Punch Man", "My Hero Academia"];
console.log(topics);
       
function renderButtons() {
    $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("gif btn btn-info");
            a.attr("data-anime", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        };
    }
    renderButtons();
        
    $("#add-anime").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var anime = $("#anime-input", ).val().trim();
        
        // Adding movie from the textbox to our array
        topics.push(anime);
            
        // Calling renderButtons which handles the processing of our anime array
        renderButtons();
        });
    
    // Adding click event listen listener to all buttons
    $("button").on("click", function() {
        // Grabbing and storing the data-anime property value from the button
        
var anime = $(this).attr("data-anime");
        
        // Constructing a queryURL using the anime name
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
anime + "&api_key=EgeLd9D4LDEBMAaWArSg8jtp6Sdxp5vZ&limit=10";
        
        // Performing an AJAX request with the queryURL
    $.ajax({
    url: queryURL,
    method: "GET"
})
        // After data comes back from the request
        .done(function(response) {
            console.log(queryURL);
            
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating and storing a div tag
          var animeDiv = $("<div class='item'>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating and storing an image tag
          var animeImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animeImage.attr("src", results[i].images.fixed_height.url);
          animeImage.attr("data-still", results[i].images.fixed_height_still.url);
          animeImage.attr("data-animate", results[i].images.fixed_height.url);
          animeImage.attr("data-state", "still");
		  animeImage.addClass("gif");
          animeDiv.append(animeImage);
          
        /*
        ========DEFECT # 4 Listed above======================================================
         animeImage.attr("src", results[i].images.fixed_height_still.url);
          animeImage.attr("data-still", results[i].images.fixed_height_still.url);
          animeImage.attr("data-animate", results[i].images.fixed_height.url);
          animeImage.attr("data-state", "still");
		  animeImage.addClass("gif");
          animeDiv.append(animeImage);
        =====================================================================================
        
        
        
        */




			//add new div to existing div

          // Appending the paragraph and image tag to the animeDiv
          animeDiv.append(p);
          animeDiv.append(animeImage);

          // Prependng the animeDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(animeDiv);
          $(".gif").on("click", function() {
              // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
              var state = $(this).attr("data-state");
              // If the clicked image's state is still, update its src attribute to what its data-animate value is.
              // Then, set the image's data-state to animate
              // Else set src to the data-still value
              if (state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              } else {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              }
            
              /*
              ===================Defect # 4 Listed above==========================================================
               if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
              
              ====================================================================================================
              
              
              */


            });
        }
      }
    });
  });


