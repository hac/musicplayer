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

	$("body").prepend("<div id='player'>");
	player = new YT.Player('player', {
		height: '0',
		width: '0',
		videoId: 'TINZIfp-xaI',
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

define(['jquery'], function($) {
	
    $.getScript('https://www.youtube.com/iframe_api');
	
});