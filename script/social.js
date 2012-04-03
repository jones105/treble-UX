$(document).ready(function(e){
	Social.ready(e);
});


var Social = (function($){
	var _$likeButton = null;
	var _$tweetButton = null;
	var _$pageUrl = null;
	var _$mySpinsNum = null;
	
	var _setJQueryVars = function(){
		_$likeButton = $('#likeButton');
		_$tweetButton = $('#tweetButton');
		_$pageUrl = $('#pageUrl');
		_$mySpinsNum = $('#mySpinsNum');
	};
	

	
	var _getMe = function(){
		$.ajax({
			url: '/trebleapi/me',
			type: 'POST',
			dataType: 'html',
			error: function(data){
				
			},
			success: function(data){
				var data = $.parseJSON(data);
				_$mySpinsNum.val(data.votes);
			}
		});
	}
	
	// public interface
	return {
		ready: function(e){
			var url = window.location || document.location;
			url = url.href;
			
			_setJQueryVars();
			
			_$likeButton.attr('data-href',url);
			_$tweetButton.attr('href', "www.twitter.com/share?" + url);
			_$pageUrl.val(url);
		}
	};
})($);