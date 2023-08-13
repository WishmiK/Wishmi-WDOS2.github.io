document.addEventListener("DOMContentLoaded", function () {
    // Retrieve user details from local storage
    const userDetails = JSON.parse(localStorage.getItem("detailsTable"));
  
    if (userDetails) {
        // Display user details in the confirm page
        document.getElementById("fullName").textContent = userDetails.fullName;
        document.getElementById("mobileNumber").textContent = userDetails.mobileNumber;
        document.getElementById("email").textContent = userDetails.email;
    }
  });
  
  
  //summarytable
  
  document.addEventListener("DOMContentLoaded", function () {
    const summaryDate = document.getElementById("tableinputdate");
    const summaryTime = document.getElementById("tableinputtime");
    const summaryDuration = document.getElementById("tableinputduration");
    const summaryTable = document.getElementById("ticketTable");
  
    // Retrieve data from local storage
    const storedSummaryData = JSON.parse(localStorage.getItem("summaryData"));
  
    if (storedSummaryData) {
        summaryDate.textContent = storedSummaryData.date;
        summaryTime.textContent = storedSummaryData.time;
        summaryDuration.textContent = storedSummaryData.duration;
  
        const slAdultChargeCell = summaryTable.querySelector("#localAdult");
        const slChildChargeCell = summaryTable.querySelector("#localChild");
        const foreignAdultChargeCell = summaryTable.querySelector("#foreignerAdult");
        const foreignChildChargeCell = summaryTable.querySelector("#foreignerChild");
        const infantChargeCell = summaryTable.querySelector("#foreignerChild");
        const totalPayableCell = summaryTable.querySelector("#total-payable");
  
        slAdultChargeCell.textContent = `$${storedSummaryData.totalCostLocalAdult}`;
        slChildChargeCell.textContent = `$${storedSummaryData.totalCostLocalChild}`;
        foreignAdultChargeCell.textContent = `$${storedSummaryData.totalCostForeignerAdult}`;
        foreignChildChargeCell.textContent = `$${storedSummaryData.totalCostForeignerChild}`;
        infantChargeCell.textContent = `$${storedSummaryData.totalCostInfant}`;
        totalPayableCell.textContent = `$${storedSummaryData.totalPayable}`;
    }
  });