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
    let disneyC;
    // let lowerCaseWord;
    //  let capitalWords;

    //create buttons from topics

    disneyButtons();

    //get disney character info from giphy 

    $(document).on("click", ".disneyChar", getDisneyInfo);

    // change picture to animated or still when clicked
    $("#images-appear-here").on("click", ".character", changePicture);
    $("#images-appear-here-2").on("click", ".character", changePicture);

    //this function handles events when adding a disney character
    $("#add-disneyChar").on("click", function (event) {

        //event.preventDefault prevents the form from trying to submit itself
        event.preventDefault();

        // get text from input box

        disneyC = $("#disney-input").val().trim();
        // if no input - do not want to put out a button
        if (disneyC.length === 0) {
            return;
        }

        //make first letter of each word capital
        disneyC = capitalLetters(disneyC);

        // before adding to topics array, check if duplicate
        if (topics.includes(disneyC)) {
            $("#disney-input").val(" ");
            return;
        }

        // add disney character to topics array

        topics.push(disneyC);

        //clear input box

        $("#disney-input").val(" ");

        //update buttons

        disneyButtons();

    });

    function capitalLetters(capitalWords) {
        //make first letter upper case - first slice letters starting from position 1
        //make first letter capital
        //join lower case with first letter

        let lowerCaseWord = capitalWords.slice(1);
        capitalWords = capitalWords.charAt(0).toUpperCase();
        capitalWords = capitalWords + lowerCaseWord;

        //if value of character is a space, then next letter is capitalized

        for (i = 1; i < capitalWords.length; i++) {
            if (capitalWords[i] == " ") {
                //want first letter of next word capitalized; split the string
                //first word is from position zero to current position
                //remaining string is in lowerCaseWord, need to capitalize the first letter
                //concatenate capital word with lower case word

                lowerCaseWord = capitalWords.slice(i + 1);
                capitalWords = capitalWords.substr(0, i);
                let nextLetter = lowerCaseWord.charAt(0).toUpperCase();
                lowerCaseWord = lowerCaseWord.slice(1);
                capitalWords = capitalWords + " " + nextLetter + lowerCaseWord;
            }

        }
        return capitalWords;

    }
    function disneyButtons() {

        // Clear the disney characters buttons 
        $("#buttons-view").empty();

        // create buttons by looping through topics array
        for (let i = 0; i < topics.length; i++) {
            let disneyBtn = $("<button>");
            disneyBtn.addClass("disneyChar");
            disneyBtn.attr("char-name", topics[i]);
            //    disneyBtn.attr("value", i);
            disneyBtn.text(topics[i]);
            $("#buttons-view").append(disneyBtn).append("        ");
        }
    }


    // this function uses AJAX to obtain API info from giphy for
    // each character in topics array

    function getDisneyInfo() {
        disneyChar = $(this).attr("char-name");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=disney%20" +
            disneyChar + "&api_key=wr31u1ZrO2oB9emm2y2KAdcFudxUCC6X&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"

            // data gets back from API

        }).then(function (response) {

            // data from API in results
            //maximum number of info wanted for each character is 10
            //get still picture, animated picture, title and rating
            //empty images to remove previous character images

            $("#images-appear-here").empty();
            $("#images-appear-here-2").empty();

            let results = response.data;

            // check that data was obtained, if no data obtained send message

            if (results.length === 0) {
                $("#images-appear-here").text("No images found");
                return;
            }
            let maxLength = 10;
            if (results.length < 10) {
                maxLength = results.length;
            }
            let gifDiv = $("<div>");
            let gifDiv2 = $("<div>");

            for (let i = 0; i < maxLength; i++) {
                let charImg = $("<img id='imgStyle'>");
                charImg.addClass("char-button character char-pic-size");
                charImg.attr("data-still", results[i].images.original_still.url);
                charImg.attr("src", results[i].images.original_still.url);
                charImg.attr("data-animate", results[i].images.fixed_width.url);
                charImg.attr("image-state", "still");

                //remove picture type from api title

                let picType = results[i].type.toUpperCase();

                //capitalize title from api title

                title = results[i].title.replace(picType, "   ").trim();
                title = capitalLetters(title);

                //capitalize api rating
                rating = results[i].rating.toUpperCase();
                
                let p1 = $("<p class='para'>").text("Title:  " + title);
                let p2 = $("<p class='para'>").text("Rating: " + rating);
                // put 2 images per row
                if (i % 2 === 0) {
                    gifDiv2.append(charImg).append("<br>").append(p1).append(p2).append("<br>");
                }
                else {
                    gifDiv.append(charImg).append("<br>").append(p1).append(p2).append("<br>");
                }
                $("#images-appear-here").append(gifDiv);
                $("#images-appear-here-2").append(gifDiv2);
            }

        });
    }
    function changePicture() {
        //get state of picture
        picState = $(this).attr("image-state");

        // if still picture - change to animate and change attribute to animate
        // if animated picture - change to still and change attribute to still

        if (picState === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("image-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("image-state", "still");
        }
    }


});
