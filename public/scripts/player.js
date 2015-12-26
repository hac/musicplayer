var player, songs;

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
               'suggestedQuality': 'large'});
}

var playingSong = -1;

function clickRow(row)
{
	var i = row.attr("class").split("-")[1]
	var song = songs[i];
	
	if (playingSong > -1)
	{
		$('.song-' + playingSong + ' .row-play-button').toggleClass('glyphicon-play', 0);
	}
	
	row.find('.row-play-button').toggleClass('glyphicon-play', 1);
	playingSong = i;
	
	playSong(songs[i].ytId);
}

define(['jquery', 'socket.io', 'bootstrap'], function($, io) {
	
    $.getScript('https://www.youtube.com/iframe_api');
	
    var socket = io();
	
	socket.emit('loadSongs', function(data){
		
		songs = data;
		
		var r = new Array(), j = -1;
		 for (var key=0, size=data.length; key<size; key++){
		     r[++j] ='<tr class="song-';
			 r[++j] = key;
			 r[++j] = '"><td><span class="glyphicon row-play-button" /></td><td>';
		     r[++j] = data[key].song;
		     r[++j] = '</td><td class="whatever1">';
		     r[++j] = data[key].artist;
		     r[++j] = '</td><td class="whatever2">';
		     r[++j] = data[key].id;
		     r[++j] = '</td><td></td><td></td><td></td></tr>';
		 }
		$('#songs-list').append(r.join(''));
		
		$('#songs-list tr').on('dblclick', function() {
			clickRow($(this));
		});
		 
	});
	
});