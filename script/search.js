		
var offsetCounter=0;
var limitCounter=25;
var queryString;
var getMore = false;

var player;

$(document).ready(function() {
	$('#topbar').slideDown(1500);

	
//	$('#playlist').sortable({
//		connectWith: ".droptrue",
//		scroll: false,
//		revert: true,
//	}).disableSelection();
	
//	$('#resultList').scroll( function(event) {
//		event.preventDefault();
//		if ($('#resultList').scrollTop() + $('#resultList').innerHeight() >= 0.9 * $('#resultList')[0].scrollHeight) {
//			  console.log('hi');
//			  getMore = true;
//			  $('#resultList').children().css("opacity" , "0.4")
//			  search( getMore );
//			  getMore = false;
//		}
//	}); 
	
	SC.initialize({
	  client_id: "4e6ccdd562cc478168c5a3c1fb6676a1"
	});
  
		$('#searchForm').submit(function() { 
        if ( $('#searchInput').val() != "") {
		
		getMore = false;				   
		$('#resultList').children().css("opacity" , "0.4")
		$('#moreButton').prop("disabled","true");
		
		offsetCounter=0;
		
		queryString=$('#searchInput').val();
	    
		$('#search').animate({"margin-top" : "10px"});		
    	search( getMore );
        }
		//return false so no action takes place
		  return false; 
		});
		
	

 });

function search( getMore ){
	
		$('#moreButton').prop("disabled","true");
	
		console.log("In search: [limit:" + limitCounter+" offset: " +offsetCounter+ " query:"+ queryString+" ]");
		
		SC.get("/tracks", {limit: limitCounter, offset: offsetCounter, q: queryString, order: "hotness"},          
		function(tracks){
				console.log(tracks);
			console.log("received " + tracks.length+" tracks");
			if(tracks.length==0){
				if(offsetCounter==0){
					showModal($( "#noResultsModal" ));
				}else{
					showModal($( "#noMoreResultsModal" ));  
				}
		
			$('#moreButton').prop("disabled","true");
			}else{
			$('#moreButton').prop("disabled","");
			offsetCounter+=tracks.length;
			if ( !getMore)
				$('#resultList').children().remove()					
			$.each(tracks, function(index, val) {  
                var first = (index == 0) ? "first" : "";
                var url = (val.artwork_url != null) ? val.artwork_url : "/image/albumDefault.jpg";
                var dur = (val.duration / 60000).toPrecision(3);
				if (val.streamable==true){
			  $('#resultList').append('<li class="playable ' + first + '" id="'+val.id+'" songId='+val.id+'>'+
                                      '<img src="' + url + '" id="image" />' +
									  '<div class="info">' +
                                        '<div class="title" id="' + val.title + '" >' + val.title + '</div>' +
									    '<div class="duration">duration: ' + dur + ' minutes</div>' +
                                        '<div class="user">' + val.user.username + '</div>' +
                                      '</div>' +
                                      '<div class="searchbuttons">' +
									      '<input class="addbutton"  type="button" value="+" />' +
									      '<button id="' + val.id + '" onclick="playSong(' + val.id + ')" class="playbutton">p</button>' +
									  '</div>' +
                                      '<div class="social">' +
                                        '<input type="button" value="like" class="likeSong" />' +
									    '<input type="button" value="add to playlist" class="addSong" />' +
                                      '</div></li>');
				}					  											  
			});
			
			$(".addbutton").click(function() {
				  var songname = $(this).parent().parent().children("div").attr("id");
				  var songid = $(this).parent().parent().attr("songid");
				  
				  //create the dom element here
				  //do a mock and I will do the script to populate it 
				  addSong(songname, songid);
			});		
			
			function addSong(songname, songid){
				var html = "<li class='song' id='" + songid + "' >"
							+ "<div>" 
								+ "<div class='songName'>" + songname + "</div>" 
								+ "<button onclick='playSong(" + songid + ")' class='playbutton' id='playlist_song_" + songid + "_play' title='Play song'>p</button>"		
								+ "<input class='removebutton' type='button' id='playlist_song_" + songid + "_remove' value='x' title='Remove song from crate'></input>"
							+ "</div>"
						+ "</li>";
				
				
				var $newSong = $(html);
				$("#playlist").append($newSong);
				
				checkForNoQueueResults();
				
				// set up delete button
				$('.removebutton').click(function(e){
					$(this).parent().parent().remove();
					checkForNoQueueResults();
				});
				
				$('#playlist li:even').addClass("even");
			 	$('#playlist li:odd').addClass("odd");
			 	$('#resultList li').removeClass("even");
				$('#resultList li').removeClass("odd");
				$('#resultList li:even').addClass("even");
				$('#resultList li:odd').addClass("odd");
			 						
				

			};		
			
			function makePlayListSortable() {
				$('#playlist').sortable({
					connectWith: ".droptrue",
					axis: "y",
				}).disableSelection();
			};
								
			
			$('#resultList').children().css("opacity" , "1")
			
			$('.playbutton').click(function() {
			  	console.log($(this));
				if ($(this).val() == "play")
				{
					var sId = $(this).parent().attr("songid");
					console.log(sId);
					playSong(sId);
					$(".playbutton").val("play");
					$(this).val("pause");
				}
				else if ($(this).val() == "pause")
				{
					var sId = $(this).parent().attr("songid");
					console.log(sId);
					player.pause();
					$(this).val("play");						
				
				}
			});

            $('#playlist').css("display", "none");
            $('.searchNote').fadeOut();
            $('#searchResults').css("display" , "block");		
            $('#searchResults').animate({"height" : "100%"});
            $('#doneSearching').css("display" , "block");	
            $('#doneSearching').animate({"height" : "20px"});
            $('#searchResults').animate({"opacity" : "1.0"});
            $('#doneSearching').animate({"opacity" : "1.0"});
			 $('#resultList li').removeClass("even");
			 $('#resultList li').removeClass("odd");
			
			 $('#resultList li:even').addClass("even");
			 $('#resultList li:odd').addClass("odd");
			 
		
			}
		
		  });
	
	
	
}



function searchFocus() {
	$("#searchInput").focus();
	$("#searchInput").select();
}

function doneSearching() {
	$('#searchResults').fadeOut();
	$('#doneSearching').fadeOut();
	$('#searchResults').css("height" , "0px");
    $('#playlist').fadeIn();
    checkForNoQueueResults();
}

function checkForNoQueueResults() {
	if ($(".song").length > 0)
	{
		$('#search').animate({"margin-top" : "10px"});
		$("#noResults").html("");
	}
	else
	{
		$('#search').animate({"margin-top" : "80px"});
		$("#noResults").html("<div><p class='searchNote' >search for songs to add them</p>");
	}
}

function showModal(modal){
		$(modal).dialog({
					height: 140,
					modal: true
				});
				
					$(modal).animate({
						opacity: '0.1'
					  }, 500, 'linear', function() {
							$(modal).dialog( "destroy" );
					  });
	
	
}


function playSong(songId){
		if(player!=null){player.stop();}
		 player= SC.stream(songId);
		 player.play();
}

SC.whenStreamingReady(function(){
		//showModal($( "#soundReadyModal" ));


});
		