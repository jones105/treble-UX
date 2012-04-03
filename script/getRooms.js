$(document).ready (function(){
	$.ajax({
		url: 'http://pigppo.com:9010/TrebleAPI/getRooms',
		dataType: 'html',
		error: function(data){
			console.log('Something went wrong!');
		},
		success: function(data){
			console.log(data);
			var html = ""
			var data = $.parseJSON(data);
			for (var i=0; i < data.length; i++){
				console.log(data[i].description);
				html += '<li class="roomBlock" >'
							 + '<div class="content">' 
							 	 + '<a href="/room?roomId=' + data[i].id + '&roomName='
								 	 + data[i].name + '">'
									 + '<img style="height:140px;width:220px;" class="image" src="/image/'
									 + 'kicks.jpg' +'" ></img>'
									 + '<div class="roomInfo">'
										 + '<p class="name">' + data[i].name + '</p>'
										 + '<p class="users">' + data[i].userCount + '</p>'
									 + '</div>'
								 + '</a>'
								 + '<div id="info" >'
								     + '<p class="desc">' + data[i].description +'</p>'
								 + '</div>' 
								 + '<div id="joinRoom">'
								 	 + '<a href="/room?roomId=' + data[i].id + '&roomName='
								 	 + data[i].name + '">Join Room</a>'
								 	 + '<br><a href="/room?roomId=' + data[i].id + '&roomName='
								 	 + data[i].name + '">//Room is full, listen offline</a>'
								 + '</div>'
							 + '</div>'
				      + '</li>';
			}
			$('#rooms').append(html);
		}

	});

});

/*remove when release */
   $(document).ready(function(){
    
    $('#splash').fadeIn();
   });