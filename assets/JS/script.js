var currentDate = $("#currentDay");
var updateBlocks = $(".row");
// var saveEvent = $(".col-2");
var eventDescription = $(".description");
var savedMessage = $(".messageSaved");

//function calls time to be displayed in extended format
function displayTime() {
  var rightNow = dayjs().format('dddd, MMMM, D');
  currentDate.text(rightNow);
}


//makes sure to load this first before rendering
$(document).ready(function () {
//this functions calls for the saving of local storage and the message to display when save button is pressed
  $(".saveBtn").on("click", function() {
    var descriptionId = $(this).closest('.row').attr('id'); 
    var userInput = $(this).prev('.description').val();
    localStorage.setItem(descriptionId, userInput);
    
    //message displayed directing to created messageSaved Div/class in the HTMl file 
    //once button is pressed
    var savedMessage = $(".messageSaved");
    savedMessage.text("Event saved! 🎉").show();

    //this allows to load up to next message forcing a timeout of the first. Even though fade in and out is in css
    //that is just for the effect not for the function itself. 
    setTimeout(function() {
      savedMessage.hide();
    }, 3000);

  });

  //this calls to update the blocks based off the hour as each hour has a different ID 2nd part. This applies it to 
  //all while also allowing it to not target the entire ID. This removes the style applied and based on the current hour 
  //displayed this will promt the correct color to show 
  function updateBlocks() {
    var currentHour = dayjs().hour();
    
    $("[id^='hour-']").each(function() {
      var elementID = $(this).attr("id");
      var blockHour = parseInt (elementID.split ("-")[1]);
      
      $(this).removeClass("past present future");
      
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future")
      }
    })
  }
 
  //this allows the browser to pull up the stored information based on the ID hour and keep that in place
  $('.description').each(function() {
    var descriptionId = $(this).closest('.row').attr('id'); 
    var savedDescription = localStorage.getItem(descriptionId);
    if (savedDescription) {
        $(this).val(savedDescription);
    }
  });

  //calls to display time 
  displayTime ();
  
  //this calls to update the hour blocks every minute
  updateBlocks();
  setInterval(updateBlocks, 60000);

});
