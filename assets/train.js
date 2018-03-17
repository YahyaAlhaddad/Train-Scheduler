  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCs4WVhzCj8lN3R-Nb1u7TZ9Injjzz64Nw",
    authDomain: "train-schedule-923c3.firebaseapp.com",
    databaseURL: "https://train-schedule-923c3.firebaseio.com",
    projectId: "train-schedule-923c3",
    storageBucket: "train-schedule-923c3.appspot.com",
    messagingSenderId: "565478800578"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var table = $("#train-table");
  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();
    
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirst = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val();
      
    firebase.database().ref().push({
        name: trainName,
        destination: trainDestination,
        start: trainFirst,
        frequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
         });
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-train-input").val("");
      $("#frequency-input").val("");
        
      var currentTime = moment();
      var trainStartConverted = moment(trainFirst, "HH:mm").subtract(1, "years");    
      var diffTime = moment().diff(moment(trainStartConverted), "minutes");
      var tRemainder = diffTime % trainFrequency;
      var minutesAway = trainFrequency - tRemainder;
      var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
  
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
    var currentTime = moment();
    var trainStartConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(trainStartConverted), "minutes");
    var tRemainder = diffTime % trainFrequency;
    var minutesAway = trainFrequency - tRemainder;
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
    
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
  });
  // event.preventDefault();
    
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirst = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val();
      
    firebase.database().ref().push({
        name: trainName,
        destination: trainDestination,
        start: trainFirst,
        frequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-train-input").val("");
      $("#frequency-input").val("");
