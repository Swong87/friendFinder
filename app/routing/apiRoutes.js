var path = require("path");

var friends = require("./../data/friends.js");

module.exports = function (app){
	// Puts the friends array into the api/friends path
	app.get("/api/friends", function(req, res) {
		res.sendFile(path.join(__dirname, "../data/friends.js"))
	  	res.json(friends);
	});

	app.post("/api/friends", function(req, res) {
	  	var newUser = req.body;
	  	// Stores the users' scores in an array variable
	  	var arrayOne = newUser.scores;
	  	// Array of match scores to the new user
	  	var scoreArray = [];
	  	// The index number for the best match
	  	var bestMatch = 0;

	  	// Compares scores from every person in the friends array with the new user
	  	for (var i = 0; i < (friends.length); i++){
	  		console.log(compare(arrayOne, friends[i].scores));
	  		var matchScore = compare(arrayOne, friends[i].scores);
	  		// Pushes each users' match score to the user into the scoreArray
	  		scoreArray.push(matchScore);
	  	}

	  	// Checks which friend had the best match
	  	for (var i = 0; i < scoreArray.length; i++){
      	    if(scoreArray[i] < scoreArray[bestMatch]){
      	    	// Gets the index number of the best match from the friends array
      	        bestMatch = i;  
      	    }   
      	}
	  	res.send(friends[bestMatch]);

	  	// Pushes the new user to the friends array
	  	friends.push(newUser);
	  	// console.log(bestMatch);
	});
}

// Adds two arguments
function add(a, b){
	return a + b;
};  

// Compares two arrays' values and finds the absolute difference
function compare(array1, array2){
	var resultArray = [];
	for (var i = 0; i < array1.length; i++){
		var matchNum = Math.abs(array1[i] - array2[i]);
		// Pushes each comparison to the resultArray
		resultArray.push(matchNum);

	}
	// Stores the total match score in a variable
	var totalDifference = resultArray.reduce(add,0);
	return totalDifference;
};