$(document).ready (function(){
    getRooms(1);
});

function getRooms(pageNumber) {
var page = (pageNumber==1) ? "getRooms" : "rooms/" + pageNumber; 
$.ajax({
		url: "http://pigppo.com:9010/TrebleAPI/" + page,
		dataType: 'html',
		error: function(data){
			console.log('Something went wrong!');
		},
		success: function(data) {			
			var html = "";
			var data = $.parseJSON(data);
            console.log(data);
            console.log("returned ", data.resultSetSize, " of ", data.roomCount, " results");
			for (var i=0; i < data.resultSetSize; i++){	
                if (data.rooms[i] != undefined) {
                    html += '<li onClick="joinRoom(' + data.rooms[i].id + ')" class="roomBlock ' + data.rooms[i].id + '">'
                                 + '<div class="content">' 
                                     + '<div>'
                                         + '<img style="height:140px;width:220px;" class="image" src="/image/'
                                         + 'kicks.jpg' +'" ></img>'
                                         + '<div class="roomInfo">'
                                             + '<p class="name">' + data.rooms[i].name + '</p>'
                                             + '<p class="users">' + data.rooms[i].userCount + '</p>'
                                         + '</div>'
                                     + '</div>'
                                     + '<div id="info" >'
                                         + '<p class="desc">' + data.rooms[i].description +'</p>'
                                     + '</div>' 
                                     + '<div id="currentSong" >'
                                         + '<input type="button" onClick="playSong(40563285)" value="p" class="currentSong" />'
                                     + '</div>' 
                                     + '<div id="joinRoom" >'
                                         + '<a href="/room?roomId=' + data.rooms[i].id + '&name=' + data.rooms[i].name + '">Join Room </a>'
                                     + '</div>'                                      
                                 + '</div>'
                          + '</li>';                
                               
                }        
			}
            $("a").live("click", function(){  $(this).attr('target', '_blank'); });  
            if (data.next != undefined) {
            var next = data.next;
            var nextID = next.charAt(next.length-1);
            var getMoreBtn = "<input class='next' type='button' value='see more' onClick='getRooms("+nextID+")' \>"
            html += getMoreBtn;            
            }
			$('#rooms').append(html);
		}
	});
}

function joinRoom( roomID ) {
    

}