
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var day = dayjs();
var hour = dayjs().hour();
$(function () {
  var planner = $('.time-block');
  var savebtns =$('.saveBtn');

// function to ensure time is kept correctly
  function checkTime () {
    //handles hours
    $.each(planner, function () {
      $(this).removeClass('present future past');
      if($(this).attr('data-hour') < hour) {
        $(this).addClass('past');


      }
      else if($(this).attr('data-hour') == hour) {
        $(this).addClass('present');


      }
      else{
        $(this).addClass('future');

      }
    });
    console.log(hour);

    //handles day and date
    var currentDay = $('#currentDay');
    currentDay.text(day.format('dddd, MMMM D YYYY'));
    return;
  }
  //rechecks time every 50 minutes (unsure what interval I should use). To make sure it works make hour equal a static variable and incremnt in interval
  var timer = setInterval( ()=> {
    checkTime();
    return;
  },3000000) // 50 minutes 
  
  //saves the text of the corrisponding block to button pressed to local storage
  function save (event) {
    var hBlock = $(this).parent();
    localStorage.setItem(hBlock.attr('id'), hBlock.children('textarea').val());
    
  }
  // checks storage and returns any saved events to their correct blocks.
  function checkStorage () {
    $.each(planner, function () {
      var timeBlock = $(this);
      var events = localStorage.getItem(timeBlock.attr('id'));
      if (typeof events == null){
        return;
      }
      else{
        timeBlock.children('textarea').val(events);
        return;
      }


    });
    return;
  }

  //checks for storage on load
  checkStorage();
  
  //checks time on load
  checkTime();

  //adds even listener to all save buttons.
  savebtns.click(save);
});