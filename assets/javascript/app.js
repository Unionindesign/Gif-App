// Giphy app for TV Shows

$(function(){
    populateButtons(showsArray, 'searchButton', '#tvShowButtons');
})

var showsArray = ['The Simpsons', 'Family Guy', 'Futurama', 'Bobs Burgers'];

function populateButtons(showsArray,classToAdd,areaToAddTo){
    $(areaToAddTo).empty();
    for(var i=0; i < showsArray.length; i++){
        var btnCreate = $('<button>');
        btnCreate.addClass(classToAdd);
        btnCreate.attr('data-type', showsArray[i])
        btnCreate.text(showsArray[i]);
        $(areaToAddTo).append(btnCreate);
    }
}

$(document).on('click', '.searchButton' ,function() {
    $('#tvShows').empty();
    var type = $(this).data('type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
    type + '&api_key=g90ySnNe0ZmLUEAz2xByfXaqn9x6cE4Y&limit=10';

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    //run done method, function to capture response
    .done(function(response) {
        const results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div class="search-item">');
            var rating = results[i].rating;
            var p = $('<p>').text('Rating: ' +rating);
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            var tvShowImage = $("<img>");
            tvShowImage.attr('src',still);
            tvShowImage.attr('data-still',still);
            tvShowImage.attr('data-animated',animated);
            tvShowImage.attr('data-state','still');
            tvShowImage.addClass('searchImage');
            
            gifDiv.append(p);
            gifDiv.append(tvShowImage);

            $("#tvShows").append(gifDiv);
        }
    })
})
$(document).on('click','.searchImage',function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state','animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state','still'); 
    }
})

$('#addSearch').on('click',function(){
    var newSearch = $(input).eq(0).val();
    showsArray.push(newSearch);
    populateButtons(showsArray, 'searchButton', '#tvShowButtons');
    return false;
})

