$(document).ready(function () {

    // Initial array of disney characters
    let topics = ["Mickey Mouse", "Minnie Mouse", "Donald Duck", "Pluto"];

    // initialize variables 
    // arrays to hold fixed and animated pictures so user can toggle back and forth
    // holders 

    let disneyChar;
    let charFixedArray = [];
    let charAnimatedArray = [];
    let title;
    let rating;
    let picState;
    let picValue;

    //create buttons from topics

    disneyButtons();

    //get disney character info from giphy 

    $(document).on("click", ".disneyChar", getDisneyInfo);

    // change picture to animated or still when clicked
    $("#images-appear-here").on("click", ".character", changePicture);

    function disneyButtons() {

        // Clear the disney characters buttons 
        $("#buttons-view").empty();

        // create buttons by looping through topics array
        for (let i = 0; i < topics.length; i++) {

            let disneyBtn = $("<button>");
            disneyBtn.addClass("disneyChar");
            disneyBtn.attr("char-name", topics[i]);
            disneyBtn.attr("value", i);
            disneyBtn.text(topics[i]);
            $("#buttons-view").append(disneyBtn).append("        ");
        }
    }
    // this function uses AJAX to obtain API info from giphy for
    // each character in topics array

    function getDisneyInfo() {
        console.log("in getdisneyinfo");
        disneyChar = $(this).attr("char-name");
        console.log("disney char " + disneyChar);
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            disneyChar + "&api_key=wr31u1ZrO2oB9emm2y2KAdcFudxUCC6X&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"

            // data gets back from API

        }).then(function (response) {

            // data from API in results
            //maximum number of info wanted for each char is 10
            //get still picture, animated picture, title and rating

            let results = response.data;
            let maxLength = 10;
            if (results.length < 10) {
                maxLength = results.length;
            }
            console.log("max length " + maxLength);
            for (let i = 0; i < maxLength; i++) {
                let gifDiv = $("<div>");
                let charImg = $("<img>");
                charImg.addClass("char-button character char-state");
                //        charImg.attr("picValue", i);
                //        charFixedArray[i] = results[i].images.original_still.url;
                //        charImg.attr("data-still",charFixedArray[i]);
                //       charImg.attr("src", charFixedArray[i]);
                charImg.attr("data-still", results[i].images.original_still.url);
                charImg.attr("src", results[i].images.original_still.url);

                //    charAnimatedArray[i] = results[i].url;
                //   charImg.attr("data-animate",charAnimatedArray[i]);
                console.log("animated pic " + results[i].url);
                charImg.attr("data-animate", results[i].url);

                charImg.attr("image-state", "still");
                title = results[i].title;
                rating = results[i].rating;
                let p1 = $("<p>").text("Title:  " + title + "     Rating:  " + rating);
                gifDiv.append("<br>").append(charImg).append(p1);
                $("#images-appear-here").prepend(gifDiv);
            }
        });
    }
    function changePicture() {
        //get state of picture
        console.log("in change picture");
        picState = $(this).attr("image-state");
        //    picNum = $(this).attr("picValue");
        let animatePic = $(this).attr("data-animate");
        let stillPic = $(this).attr("data-still");
        console.log("  pic state " + picState);
        console.log(" data-animate " + animatePic);
        console.log(" still pic " + stillPic);

        // if still picture - change to animate and change attribute to animate
        // if animated picture - change to still and change attribute to still

        if (picState === "still") {
    //        $(this).attr("src", $(this).attr(data-animate));
            $(this).attr("src", animatePic);
            $(this).attr("image-state", "animate");
        }
        else {
    //        $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("src", stillPic);

            $(this).attr("image-state", "still");
        }
    }


});
