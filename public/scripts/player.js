var player;

/**
 * Function generates a random string for use in unique IDs, etc
 *
 * @param <int> n - The length of the string
 */
function randString(n)
{
    if(!n)
    {
        n = 5;
    }

    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(var i=0; i < n; i++)
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function onYouTubeIframeAPIReady() {

	$("body").append("<div id='player'>");
	player = new YT.Player('player', {
		height: '0',
		width: '0',
//		videoId: 'TINZIfp-xaI',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});

}

function onPlayerReady(event)
{
	event.target.playVideo();
}

function onPlayerStateChange(event)
{

}

function playSong(songId)
{
	player.loadVideoById({'videoId': songId,
/*               'startSeconds': 0,
               'endSeconds': 60,*/
               'suggestedQuality': 'large'});
}

define(['jquery', 'socket.io'], function($, io) {
	
    $.getScript('https://www.youtube.com/iframe_api');
	
	$('#songs-list tr').on('dblclick', function() {
		$('.row-play-button', this).toggleClass('glyphicon-play');
	});
	
    var socket = io();
	
});