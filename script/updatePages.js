updateURL('home');
function updateURL(newURL) {
	if ($('.'+newURL).attr("class") != "item " + newURL + " active") {
        for (var i=0; i < $('.item').length; i++) { $('.item').removeClass("active") };
        $('.'+newURL).attr("class","item " + newURL + " active");
        if (newURL == 'home') 
        {
            $("#rooms").html("");
            $("#search").css("display", "block");
        }
        if (newURL == 'top') {
        }
        if (newURL == 'new') 
        {
            $("#rooms").html("");
            $("#search").css("display", "none");
            getRooms(1);
        }
        if (newURL == 'favorited') 
        {
        }
        if (newURL == 'yours') 
        {
        }
        if (newURL == 'random') 
        {
        }
    }
}

