$(document).ready(function () {
	var config = {
		apiKey: "AIzaSyA9rqW7VL5vWRgPZgeMcaWTd-OfxKa7jMw",
		authDomain: "train-homework-fa5ef.firebaseapp.com",
		databaseURL: "https://train-homework-fa5ef.firebaseio.com",
		projectId: "train-homework-fa5ef",
		storageBucket: "train-homework-fa5ef.appspot.com",
		messagingSenderId: "608926182351"
	};

	//initialize firebase
	firebase.initializeApp(config);

	var database = firebase.database();


	//when the submit button is clicked page is prevented from reloading
	$("#submit").on("click", function (event) {
		event.preventDefault();

		//grabs and trims the values the user input to each field of the form
		//and stores them in local variables
		var name = $("#name").val().trim();
		var destination = $("#destination").val().trim();
		var first = $("#first").val().trim();
		var frequency = $("#frequency").val().trim();

		//variable for holding the data for each new train as an object
		var newTrain = {
			name: name,
			destination: destination,
			start: first,
			frequency: frequency
		};

		//pushes the new train data to firebase
		database.ref("/trains").push(newTrain);

		//clears text inputs so user can more easily add another train
		$("#name").val("");
		$("#destination").val("");
		$("#first").val("");
		$("#frequency").val("");
	});


	//when a child is added to firebase a snapshot of the data is taken
	database.ref("/trains").on("child_added", function (childSnapshot) {

		//variables for storing each value of the snapshot
		var name = childSnapshot.val().name;
		var destination = childSnapshot.val().destination;
		var first = childSnapshot.val().first;
		var frequency = childSnapshot.val().frequency;

		//time variables and conversions
		var firstTrain = 0;
		var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
		var currentTime = moment();
		var difference = moment().diff(moment(firstTrainConverted), "minutes");
		var remainder = difference % frequency;
		var minToTrain = frequency - remainder;
		var nextTrain = moment().add(minToTrain, "minutes");


		//each train is added to the table
		$("#train-table tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency +
			"</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minToTrain + "</td></tr>");
	});

});