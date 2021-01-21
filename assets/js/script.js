//grabbing data from the HTML
var $todaysDate = $('#currentDay');
var $timeBlockHour = $(".row");
var $timeBlockEntry = $(".saveBtn");

//Grab today’s date and hour
var currentDate = moment().format("dddd, MMMM DD, YYYY");
var currentHour = moment().format("H");

//setting a var for the agenda Items
var agendaItems = [""];

//initiating day when local storage is empty
function initiateDay() {
    $timeBlockHour.each(function () {
        var $currentBlock = $(this);
        var currentBlockTime = parseInt($currentBlock.attr("data-hour"));
        var agendaItemObj = {
            hour: currentBlockTime,
            text: "",
        };

        agendaItems.push(agendaItemObj);
    });
    //save data to storage
    localStorage.setItem("agendaItems", JSON.stringify(agendaItems));
}

//colour-coding time blocks based on time
function colorBlocking() {
    $timeBlockHour.each(function () {
        var $currentBlock = $(this);
        var currentBlockTime = parseInt($currentBlock.attr("data-hour"));
        if (currentBlockTime > currentHour) {
            $currentBlock.addClass("future").removeClass("past present");
        } else if (currentBlockTime < currentHour) {
            $currentBlock.addClass("past").removeClass("future present");
        } else {
            $currentBlock.addClass("present").removeClass("future past");
        }
    });
}

//building day from local storage
function buildSchedule() {
    agendaItems = localStorage.getItem("agendaItems");
    agendaItems = JSON.parse(agendaItems);

    for (var h = 0; h < agendaItems.length; h++) {
        var agendaHour = agendaItems[h].hour;
        var agendaText = agendaItems[h].text;

        $(`.row[data-hour=${agendaHour}]`).children("textarea").val(agendaText);
    }
}

//allowing user to save agenda items
function saveButtonHandler() {
    var $currentBlock = $(this).parent();
    console.log($currentBlock);
    var updatedTime = $(this).parent().attr("data-hour");
    var updatedItem = $(this).siblings("textarea").val();


    for (var h = 0; h < agendaItems.length; h++) {
        if (agendaItems[h].hour == updatedTime) {
            agendaItems[h].text = updatedItem;
        }
    }
    localStorage.setItem("agendaItems", JSON.stringify(agendaItems));

}

//loading agenda when window loads. Will grab from local storage if available. If not it will run initiate day function
window.onload = function () {
    $todaysDate.text("Today is: " + currentDate);
    colorBlocking();
  
    if (!localStorage.getItem("agendaItems")) {
        initiateDay();
    } else {
        buildSchedule();
    }

    $timeBlockEntry.on("click", saveButtonHandler);
};