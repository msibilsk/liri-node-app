var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var keys = require("./keys");
var fs = require("fs");

var twitterKeys = keys.twitterKeys;

var client = new twitter(twitterKeys);

switch (process.argv[2]) {
    case "my-tweets":
        var params = { screen_name: 'msibilsk21' };
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
            	//TODO more tweets
                for (var i = 0; i < 6; i++) {

                    console.log("Created at: " + tweets[i].created_at + "\nContent: " + tweets[i].text + "\n");

                }
            }
        });
        break;

    case "spotify-this-song":

        spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            //TODO figure out how to access specific parts of this data
            if(process.argv[3]) {
           		console.log(data);
        	} else {
        		//TODO make a default functionality for ace of base
        	}
        });
        break;

    case "movie-this":

        var movieName = process.argv[3];
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

        request({url: queryUrl, json: true}, function(error, response, body) {

            if (!error && response.statusCode === 200 && process.argv[3]) {

                console.log("Title: " + response.body.Title);
                console.log("Release Year: " + response.body.Year);
                console.log("IMDB Rating: " + response.body.imdbRating);
                console.log("Country of Origin: " + response.body.Country);
                console.log("Languages: " + response.body.Language);
                console.log("Plot: " + response.body.Plot);
                console.log("Actors: " + response.body.Actors);

                //TODO - find the rotten tomatoes info
                console.log("Rotten Tomatoes Rating: ");
                console.log("Rotten Tomatoes URL: ");
            } else if (process.argv[3] === undefined) {
            	console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/ \nIt's on Netflix!")
            }
        });
        break;

    case "do-what-it-says":

    	//TODO this entire section

        break;
}
