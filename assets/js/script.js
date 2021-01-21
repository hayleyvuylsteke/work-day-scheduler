var $todaysDate = $('#currentDay');
var $timeBlockHour = $(".row");
var $timeBlockEntry = $(".saveBtn");
//Grab today’s date and hour
var currentDate = moment().format("dddd, MMMM DD, YYYY");
var currentHour = moment().format("H");
var agendaItems = [""];
//colour-coding time blocks based on time
function initiateDay() {
    $timeBlockHour.each(function () {
        var $currentBlock = $(this);
        var currentBlockTime = parseInt($currentBlock.attr("data-hour"));
        var agendaItemObj = {
            hour: currentBlockTime,
            text: "",
        };
        // console.log(agendaItems);
        agendaItems.push(agendaItemObj);
    });
    //save data to storage
    localStorage.setItem("agendaItems", JSON.stringify(agendaItems));
}
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
function buildSchedule() {
    agendaItems = localStorage.getItem("agendaItems");
    agendaItems = JSON.parse(agendaItems);

    for (var h = 0; h < agendaItems.length; h++) {
        var agendaHour = agendaItems[h].hour;
        var agendaText = agendaItems[h].text;

        $(`.row[data-hour=${agendaHour}]`).children("textarea").val(agendaText);
    }
}
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
    // buildSchedule();
}
window.onload = function () {
    $todaysDate.text("Today is: " + currentDate);
    colorBlocking();
  
    if (!localStorage.getItem("agendaItems")) {
        initiateDay();
    } else {
        buildSchedule();
    }
    // console.log(‘$timeBlockEntry:  ’, $timeBlockEntry);
    $timeBlockEntry.on("click", saveButtonHandler);
};