$(document).ready(function () {

    // Initial array of disney characthers
    let topics = ["Mickey Mouse", "Minnie Mouse", "Donald Duck", "Pluto"];

    //declare topics object to hold the api info needed for each character

    let topicsArray = [
        {
            topicNum: [],
            stillPic: [],
            animatedPic: [],
            rating: " ",
            title: " "

        }];
    let disneyChar;

    //create buttons from topics
    //get disney character info from giphy and store in topics array

    disneyButtons();


    function disneyButtons() {

        // Clear the disney characters buttons 
        $("#buttons-view").empty();

        // create buttons by looping through topics array
        for (var i = 0; i < topics.length; i++) {

            let disneyBtn = $("<button>");
            disneyBtn.addClass("disneyChar");
            disneyBtn.attr("data-name", topics[i]);
            disneyBtn.attr("value", i);
            disneyBtn.text(topics[i]);
            $("#buttons-view").append(disneyBtn).append("        ");
            getDisneyInfo(i);
        }
    }
    // this function uses AJAX to obtain API info from giphy for
    // each character in topics array

    function getDisneyInfo(topicNum) {
        console.log("topic number in get disne info "+ topicNum);
        disneyChar = topics[topicNum];
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wr31u1ZrO2oB9emm2y2KAdcFudxUCC6X&limit=10&offset=0&lang=en&q=" + disneyChar;

        $.ajax({
            url: queryURL,
            method: "GET"

            // data gets back from API

        }).then(function (response) {

            // save data from API in results

            let results = response.data;
            let maxLength = 10;
            if (results.length < 10) {
                maxLength = results.length;
            }
            for (let j = 0; j < maxLength; j++) {
                console.log("in j loop  " + j + "topics num " +topicNum);
                console.log("ratings   "+ results[j].rating);
                topicsArray[topicNum].rating = results[j].rating;
                topicsArray[topicNum].title = results[j].title;
                topicsArray[topicNum].stillPic[j] = results[j].images.original_still.url;
                topicsArray[topicNum].stillPic[j] = results[j].url;

            }
        });
    }

    // need to save 10 or less results (depends on number returned) to be displayed
    // need to save animated pictures, still pictures, rating, and title for each  


    // determine which disney character was selected and display info
    // $(document).on("click", ".disneyChar", disneyCharInfo);

});
