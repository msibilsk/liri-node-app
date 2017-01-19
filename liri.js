var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");
var twitterKeys = keys.twitterKeys;
var client = new twitter(twitterKeys);

function createParam () {
	var arr = (process.argv).slice(3);
	var param = '';
	for (var i = 0; i < arr.length; i ++) {
		if(i === arr.length - 1) {
			param+= arr[i];
		} else {
			param+= arr[i] + ' ';
		}
	}
	return param;
};

function spotifyThis(param) {
    spotify.search({ type: 'track', query: param }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var song = data.tracks.items[0];
        console.log("Artist: " + song.artists[0].name);
        console.log("Title: " + song.name);
        console.log("URL: " + song.preview_url);
        console.log("Album: " + song.album.name);
    });
};

function imbd() {
    var movieName = createParam();
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true";

    request({ url: queryUrl, json: true }, function(error, response, body) {

        if (!error && response.statusCode === 200 && process.argv[3]) {

            console.log("Title: " + response.body.Title);
            console.log("Release Year: " + response.body.Year);
            console.log("IMDB Rating: " + response.body.imdbRating);
            console.log("Country of Origin: " + response.body.Country);
            console.log("Languages: " + response.body.Language);
            console.log("Plot: " + response.body.Plot);
            console.log("Actors: " + response.body.Actors);
            console.log("Rotten Tomatoes Rating: " + response.body.tomatoRating);
            console.log("Rotten Tomatoes URL: " + response.body.tomatoURL);

        } else if (process.argv[3] === undefined) {
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/ \nIt's on Netflix!")
        }
    });
};

function twitterCall() {
    var params = { screen_name: 'msibilsk21', count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
        	tweets.forEach(function(tweet){
        		console.log("Created at: " + tweet.created_at + "\nContent: " + tweet.text + "\n")
        	});
        }
    });
};

switch (process.argv[2]) {
    case "my-tweets":

        twitterCall();
        break;

    case "spotify-this-song":
        if (process.argv[3]) {

            spotifyThis(createParam());

        } else {
            spotifyThis("ace of base the sign");
        }

        break;

    case "movie-this":

        imbd();
        break;

    case "do-what-it-says":

        fs.readFile("random.txt", "utf8", function(err, data) {
            var args = data.split(",");
            if (args[0] === 'my-tweets') {
                twitter();
            } else if (args[0] === 'spotify-this-song') {
                spotifyThis(args[1]);
            } else if (args[0] === 'movie-this') {
                imbd();
            }
        });

        break;
}