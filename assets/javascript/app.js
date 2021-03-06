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
    var firstTrainTime = snapshot.val().firstTrainTime;
    var frequency = snapshot.val().frequency;


    // console.log(frequency);
    // console.log(snapshot);


   //Utilize moment.js to parse, validate, manipulate, and display times/dates in javascript

    var currentTime = moment();
    // console.log(moment);

    //HH represents 24 hour time
    // var firstTransport = moment.unix(firstTrainTime).format("HH:mm");
    // console.log(firstTransport);

    //to capture first train time.
    var firstTransport = moment(firstTrainTime, "HH:mm");
    
    //To find the difference from the time now and the first train time. 
    var diffTime = moment().diff(moment(firstTransport), "minutes");
    
    var remainder = diffTime % frequency;
   
    var minutesToTrain = frequency - remainder;
    
    //add the amount of minutes to the next train and format to the hh:mm. 
    var nextTrain = moment().add(minutesToTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm A");

    var minAway = currentTime.diff(firstTransport, "minutes");
   

     $("#traintable").append("<tr><td>" + transportation + "</td><td> " + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td></tr>");
    
   
    //When user submits the train information
    $("#submit-button").on("click", function() {
       event.preventDefault();

       $("#traintable").empty();

       var transport = $("#transportation-input").val().trim();
       var dest = $("#dest-input").val().trim();
       var time = $("#firsttrain-input").val().trim();
       var freq = $("#freq-input").val().trim();

    //Push information to the root of the object in database. Database. ref is the root of the object. 

     database.ref().push({
        transportation : transport,
        destination : dest,
        firstTrainTime : time,
        frequency : freq,

     }), 

    
    

    //User clears train information    
    $("#clear-button").on("click", function() {
        //create a reference to the file to delete
        var databaseRef = database.ref();

        databaseRef.remove();
        $("#traintable").empty();
    });

   



  });
  })
