function calculateTotalAmount() {

    //retrieve the date and store it in the browser's local storage
    const selectedDate = document.getElementById("dateInput").value;
    localStorage.setItem("selectedDate", selectedDate);





    // Get the selected time slots
    const durationSelect = document.getElementById("duration");
    const selectedTimeSlots = [];
    for (let option of durationSelect.options) {
        if (option.selected) {
            selectedTimeSlots.push(option.value);
        }
    }


// retrieve the values of various input elements and parse as integers 
    const numlocalAdultTickets = parseInt(document.getElementById('localAdult').value);
    const numlocalChildTickets = parseInt(document.getElementById('localChild').value);
    const numforeignerAdultTickets = parseInt(document.getElementById('foreignerAdult').value);
    const numforeignerChildTickets = parseInt(document.getElementById('foreignerChild').value);
    const numinfantTickets = parseInt(document.getElementById('infant').value);


    // Store the values in the local storage
    localStorage.setItem("numlocalAdultTickets", numlocalAdultTickets);
    localStorage.setItem("numlocalChildTickets", numlocalChildTickets);
    localStorage.setItem("numforeignerAdultTickets", numforeignerAdultTickets);
    localStorage.setItem("numforeignerChildTickets", numforeignerChildTickets);
    localStorage.setItem("numinfantTickets", numinfantTickets);



    // Define the normal and peak hour ranges in an array(hours 10 to 1 pm and 3 to 6 pm)
    const normalHours = [7, 8, 9, 13, 14];
    const peakHours = [10, 11, 12, 15, 16, 17];

    // Initialize variables to store the counts of normal and peak hours
    let normalCount = 0;
    let peakCount = 0;

    // Calculate the counts of normal and peak hours from the selected time slots.
     //splits each slot to extract the hour and converts it to an integer
    for (let slot of selectedTimeSlots) {
        const hour = parseInt(slot.split(":")[0]);
        if (normalHours.includes(hour)) {
            normalCount++;
        } else if (peakHours.includes(hour)) {
            peakCount++;
        }
    }

    localStorage.setItem("normalCount", normalCount); //added on 1aug
    localStorage.setItem("peakCount", peakCount); //added on 1aug

    // Define the normal and peak prices for each category
    const normalPriceLocalAdult = 4;
    const peakPriceLocalAdult = 6;
    const normalPriceLocalChild = 2;
    const peakPriceLocalChild = 3;
    const normalPriceForeignerAdult = 10;
    const peakPriceForeignerAdult = 13;
    const normalPriceForeignerChild = 5;
    const peakPriceForeignerChild = 8;




    // Calculate the total cost for each category based on normal and peak hours
    const totalCostLocalAdult = (normalCount * normalPriceLocalAdult + peakCount * peakPriceLocalAdult) * numlocalAdultTickets;
    const totalCostLocalChild = (normalCount * normalPriceLocalChild + peakCount * peakPriceLocalChild) * numlocalChildTickets;
    const totalCostForeignerAdult = (normalCount * normalPriceForeignerAdult + peakCount * peakPriceForeignerAdult) * numforeignerAdultTickets;
    const totalCostForeignerChild = (normalCount * normalPriceForeignerChild + peakCount * peakPriceForeignerChild) * numforeignerChildTickets;
    const totalCostInfant = 0;

    // Store the calculated total costs in the local storage
    localStorage.setItem("totalCostLocalAdult", totalCostLocalAdult);
    localStorage.setItem("totalCostLocalChild", totalCostLocalChild);
    localStorage.setItem("totalCostForeignerAdult", totalCostForeignerAdult);
    localStorage.setItem("totalCostForeignerChild", totalCostForeignerChild);
    localStorage.setItem("totalCostInfant", totalCostInfant);

    // Calculate and update the total amount payable
    const totalAmountPayable = totalCostLocalAdult + totalCostLocalChild + totalCostForeignerAdult + totalCostForeignerChild;
    document.getElementById("totalAmount").textContent = totalAmountPayable + " USD";

    // Store the totalAmountPayable in the local storage
    localStorage.setItem("totalAmountPayable", totalAmountPayable);

    const selectedTimeSlotsSpan = document.getElementById("selectedTimeSlots");
    selectedTimeSlotsSpan.textContent = getFormattedTime(selectedTimeSlots);
    const formattedTime = getFormattedTime(selectedTimeSlots);
    // Store the formattedTime in the local storage
    localStorage.setItem("formattedTime", formattedTime);

    function getFormattedTime(timeSlots) {

        // Helper function to get the formatted time for selected time slots
        const startTime = timeSlots[0].split(" to ")[0];
        const endTime = timeSlots[timeSlots.length - 1].split(" to ")[1];
        return startTime + " to " + endTime;
    }
    document.getElementById('totalHours').addEventListener('change', function () {
        const totalHours = calculateTotalHours(selectedTimeSlots);
        // ... (Get other user inputs)
        updateTable(selectedDate, formattedTime, totalHours, normalCount, peakCount, totalAmountPayable, numlocalAdultTickets, totalCostLocalAdult, numlocalChildTickets, totalCostLocalChild, numforeignerAdultTickets, totalCostForeignerAdult, numforeignerChildTickets, totalCostForeignerChild, numinfantTickets);
    });
    // Calculate the total number of hours selected
    const totalHours = calculateTotalHours(selectedTimeSlots);

    // Store the value of totalHours in the local storage
    localStorage.setItem("totalHours", totalHours);

    // Display the total number of hours on the web page
    const totalHoursSpan = document.getElementById("totalHours");
    totalHoursSpan.textContent = totalHours + " hour(s)";

    //adding values into the table
    document.getElementById("tableinputdate").innerHTML = selectedDate;
    document.getElementById("tableinputtime").innerHTML = formattedTime;
    document.getElementById("tableinputduration").innerHTML = `${totalHours} hrs (${normalCount} Normal:${peakCount} Peak)`;


    document.getElementById("totalPayableprice").innerHTML = `$ ${totalAmountPayable}`;

    // Function to hide or show a row based on the number of tickets.


    function setRowVisibilityBasedOnTicketCount(rowId, ticketCount) {
        const row = document.getElementById(rowId);
        row.classList.toggle("hidden-row", ticketCount === 0);
    }

    // Setting the innerHTML and visibility for each row based on ticket counts
    document.getElementById("localadulttable").innerHTML = `${numlocalAdultTickets} SL Adult`;
    document.getElementById("localadulttableprice").innerHTML = `$ ${totalCostLocalAdult}`;
    setRowVisibilityBasedOnTicketCount("rowlocaladult", numlocalAdultTickets);

    document.getElementById("localchildtable").innerHTML = `${numlocalChildTickets} SL Child`;
    document.getElementById("localchildtableprice").innerHTML = `$ ${totalCostLocalChild}`;
    setRowVisibilityBasedOnTicketCount("rowlocalchild", numlocalChildTickets);

    document.getElementById("foriegnadulttable").innerHTML = `${numforeignerAdultTickets} Foreigner Adult`;
    document.getElementById("foriegnadulttableprice").innerHTML = `$ ${totalCostForeignerAdult}`;
    setRowVisibilityBasedOnTicketCount("rowforiegnadult", numforeignerAdultTickets);

    document.getElementById("foriegnchildtable").innerHTML = `${numforeignerChildTickets} Foreigner Child`;
    document.getElementById("foriegnchildtableprice").innerHTML = `$ ${totalCostForeignerChild}`;
    setRowVisibilityBasedOnTicketCount("rowforiegnchild", numforeignerChildTickets);

    document.getElementById("infanttable").innerHTML = `${numinfantTickets} Infant`;
    document.getElementById("infanttableprice").innerHTML = "Free";
    setRowVisibilityBasedOnTicketCount("rowinfant", numinfantTickets);

    // saves in the local storage. 
    localStorage.setItem("selectedDate", selectedDate);
    localStorage.setItem("numlocalAdultTickets", numlocalAdultTickets);
    localStorage.setItem("numlocalChildTickets", numlocalChildTickets);
    localStorage.setItem("numforeignerAdultTickets", numforeignerAdultTickets);
    localStorage.setItem("numforeignerChildTickets", numforeignerChildTickets);
    localStorage.setItem("numinfantTickets", numinfantTickets);
    localStorage.setItem("normalCount", normalCount);
    localStorage.setItem("peakCount", peakCount);
    localStorage.setItem("totalCostLocalAdult", totalCostLocalAdult);
    localStorage.setItem("totalCostLocalChild", totalCostLocalChild);
    localStorage.setItem("totalCostForeignerAdult", totalCostForeignerAdult);
    localStorage.setItem("totalCostForeignerChild", totalCostForeignerChild);
    localStorage.setItem("totalCostInfant", totalCostInfant);
    localStorage.setItem("totalAmountPayable", totalAmountPayable);
    localStorage.setItem("totalHours", totalHours);
    localStorage.setItem("formattedTime", formattedTime);

}

document.getElementById("purchasebtn").addEventListener("click", calculateTotalAmount);

function calculateTotalHours(timeSlots) {
    // Helper function to calculate the total number of hours from selected time slots
    let totalHours = 0;
    for (let slot of timeSlots) {
        const startTime = slot.split(" to ")[0];
        const endTime = slot.split(" to ")[1];

        const startHour = parseInt(startTime.split(":")[0]);
        const endHour = parseInt(endTime.split(":")[0]);

        totalHours += endHour - startHour;
    }
    return totalHours;
}

//selected duration 
const form = document.getElementById("ticketsForm");
form.addEventListener("submit", myfunction);

function storeSelectedOptions(event) {
    event.preventDefault(); //prevents form from submitting
    const durationSelect = document.getElementById("duration");
    const selectedOptions = [];

    for (let i = 0; i < durationSelect.options.length; i++) {
        if (durationSelect.options[i].selected) {
            selectedOptions.push(durationSelect.options[i].value);
        }
    }

    //store the selected options in local storage
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
    console.log("Selected Options:", selectedOptions);

}


//increment and decrement of guests and storing input of tickets in local storage
function increment(category) {
    const inputField = document.getElementById(category);
    inputField.value = parseInt(inputField.value) + 1;

    localStorage.setItem(category, inputField.value);
    calculateTotalAmount();


}

function decrement(category) {
    const inputField = document.getElementById(category);
    const currentValue = parseInt(inputField.value);
    if (currentValue > 0) {
        inputField.value = currentValue - 1;
    }
    localStorage.setItem(category, inputField.value);
    calculateTotalAmount();

}

window.onload = details.html;

