var currentDate = $("#currentDay");
var updateBlocks = $(".row");
// var saveEvent = $(".col-2");
var eventDescription = $(".description");


function displayTime() {
  var rightNow = dayjs().format('dddd, MMMM, D');
  currentDate.text(rightNow);
}

$(document).ready(function () {

  $(".saveBtn").on("click", function() {
    var descriptionId = $(this).closest('.row').attr('id'); 
    var userInput = $(this).prev('.description').val();
    localStorage.setItem(descriptionId, userInput);
  });

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
 
  $('.description').each(function() {
    var descriptionId = $(this).closest('.row').attr('id'); 
    var savedDescription = localStorage.getItem(descriptionId);
    if (savedDescription) {
        $(this).val(savedDescription);
    }
  });
  // TODO: Add code to display the current date in the header of the page.
  displayTime ();
  
  updateBlocks();
  setInterval(updateBlocks, 60000);
});
