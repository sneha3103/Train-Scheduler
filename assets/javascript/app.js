alert ("hi");

  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyD38FNlKyd6oHl1EmQw_k97_M_mj1wEY2Y",
    authDomain: "transportation-scheduler-e7005.firebaseapp.com",
    databaseURL: "https://transportation-scheduler-e7005.firebaseio.com",
    projectId: "transportation-scheduler-e7005",
    storageBucket: "",
    messagingSenderId: "550234484648"
  };
  firebase.initializeApp(config);

  // Creating a variable to reference the database
  var database = firebase.database();

  // Storing the train information and rendering it on the website. Retreive the snapshots of the stored data at intial load. 
  // .on(child-added) - An event listener that grabs the train information and executes information one at a time and renders it to the table.
 
  database.ref().on("child_added" , function (snapshot) {
    var transportation = snapshot.val().transportation;
    var destination = snapshot.val().destination;
    var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;

    console.log(transportation);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    console.log(snapshot);

    var currentTime = moment();
    var firstTransport = moment(firstTrain, "HH:mm");
    var minAway = firstTransport.diff(currentTime, "minutes");

    while (firstTrain < currentTime) {
        firstTrain.add(frequency, "minutes");
    }

    console.log("minutes away", minAway);

    //When user submits the train information
    $("#submit-button").on("click", function() {
       event.preventDefault();

       var transport = $("#transportation-input").val().trim();
       var dest = $("#dest-input").val().trim();
       var time = $("#firsttrain-input").val().trim();
       var freq = $("#freq-input").val().trim();

    //Push information to the database

     database.ref().push({
        transportation : transport,
        destination : dest,
        firstTrain : time,
        frequency : freq,

     })

    
    })



  })

