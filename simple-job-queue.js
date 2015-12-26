/* simple-job-queue.js */
var kue = require('kue')
 , jobs = kue.createQueue()
 ;
 
var request = require("request")
 
function newJob (name){
 name = name || 'Default_Name';
 var job = jobs.create('new job', {
   name: name
 });
 job
   .on('complete', function (){
     console.log('Job', job.id, 'with name', job.data.name, 'is    done');
   })
   .on('failed', function (){
     console.log('Job', job.id, 'with name', job.data.name, 'has  failed');
   });
 job.save();
}

jobs.process('new job', function (job, done){
 /* carry out all the job function here */
	
	var songs = [];
	
	var url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCFJlOFdbDbG6Y5hhgrfQ6QndGiJ8DRPGU&channelId=UCd3TI79UTgYvVEq5lTnJ4uQ&part=snippet,id&order=date&maxResults=50"

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
			
			for (i in body.items)
			{
				var item = body.items[i];
				var id = item.id.videoId;
				var title = item.snippet.title;
				var rePattern = new RegExp(/^(.*)-(.*)$/);
				var arrMatches = title.match(rePattern);
				if (arrMatches)
				{
				var artistTitle = arrMatches[1].trim();
				var songTitle = arrMatches[2].trim();
				songs.push({ytId:id, artist:artistTitle, song:songTitle});
				}
			}
			
			var fs = require('fs');
			fs.writeFile("./songs.json", JSON.stringify(songs), function(err) {
			    if(err) {
			        return console.log(err);
			    }

			    console.log("The file was saved!");
			}); 
	    }
	})
	
	console.log();
 done && done();
});

/*setInterval(function (){
 newJob('Send_Email');
}, 3000);*/

module.exports.newJob = newJob;