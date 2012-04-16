function getRooms( pagenum ) {
var page = (pagenum==1) ? "getRooms" : "rooms/" + pagenum; 
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
            $("a").live("click", function(){
                $(this).attr('target', '_blank'); 
            });  
            $(document).ready (function() {
                $(document).scroll( function(e) {		        
                    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                        console.log(data.next);
                        var next = data.next;
                        if (data.next) {
                            var next = data.next;
                            var nextID = next.charAt(next.length-1);
                            event.preventDefault();
                            //getRooms( nextID );   
                        }	      
                    }
                }); 
            });
            var next = data.next;
            var nextID = next.charAt(next.length-1);
            html += "<input type='button' onClick='getRooms(" + nextID + ")' value='get more' />";
			$('#rooms').append(html);
		}
	});
}