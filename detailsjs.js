document.addEventListener("DOMContentLoaded", function() {
    const fullNameInput = document.getElementById("fullName");
    const genderInput = document.getElementById("gender");
    const mobileNumberInput = document.getElementById("mobileNumber");
    const emailInput = document.getElementById("email");
    const confirmEmailInput = document.getElementById("confirmEmail");
    const continueButton = document.getElementById("continue-button");
  
    const fullNameOutput = document.getElementById("outputFullName");
    const genderOutput = document.getElementById("outputGender");
    const mobileNumberOutput = document.getElementById("outputMobileNumber"); 
    const emailOutput = document.getElementById("outputEmail");
  
    fullNameInput.addEventListener("input", function() {
          fullNameOutput.textContent = fullNameInput.value;
      });
  
      genderInput.addEventListener("input", function() {
          genderOutput.textContent = genderInput.value;
      });
  
      mobileNumberInput.addEventListener("input", function() {
          mobileNumberOutput.textContent = mobileNumberInput.value;
      });
  
      emailInput.addEventListener("input", function() {
          emailOutput.textContent = emailInput.value;
      });
  
    function calculateCategoryTotal(category, quantity) {
      // Define prices for each category (adjust as needed)
      const prices = {
          "SL Adult": 20,
          "SL Child": 10,
          "Foreigner Adult": 30,
          "Foreigner Child": 15,
          "Infant": 0
      };
      return prices[category] * quantity;
  }
  
  
  // Retrieve values from local storage
  const selectedDate = localStorage.getItem("selectedDate");
  const selectedTime = localStorage.getItem("selectedTime");
  const slAdultTickets = parseInt(localStorage.getItem("slAdultTickets"));
  const slChildTickets = parseInt(localStorage.getItem("slChildTickets"));
  const foreignAdultTickets = parseInt(localStorage.getItem("foreignAdultTickets"));
  const foreignChildTickets = parseInt(localStorage.getItem("foreignChildTickets"));
  const infantTickets = parseInt(localStorage.getItem("infantTickets"));
  const totalCharges = parseInt(localStorage.getItem("totalCharges"));
  
  // Update summary table with retrieved values
  document.getElementById("summary-date").innerText = selectedDate;
  document.getElementById("summary-time").innerText = selectedTime;
  
  const summaryTickets = document.getElementById("summary-tickets");
  const summaryPrice = document.getElementById("summary-price");
  summaryTickets.innerHTML = "";
  summaryPrice.innerHTML = "";
  
  // Create an array to iterate through ticket categories
  const ticketCategories = [
      { category: "SL Adult", quantity: slAdultTickets },
      { category: "SL Child", quantity: slChildTickets },
      { category: "Foreigner Adult", quantity: foreignAdultTickets },
      { category: "Foreigner Child", quantity: foreignChildTickets },
      { category: "Infant", quantity: infantTickets }
  ];
  
  for (const categoryData of ticketCategories) {
      const { category, quantity } = categoryData;
      if (quantity > 0) {
          const categoryTotal = calculateCategoryTotal(category, quantity);
          summaryTickets.innerHTML += `<li>${quantity} ${category}</li>`;
          summaryPrice.innerHTML += `<li>$${categoryTotal}</li>`;
      }
  }
  document.getElementById("summary-total").innerText = `$${totalCharges}`;
  
  
  
    fullNameInput.addEventListener("focus", function() {
        fullNameInput.setAttribute("placeholder", "Same as your ID");
        fullNameInput.nextElementSibling.textContent = "Please add your full name";
    });
  
    mobileNumberInput.addEventListener("focus", function() {
        mobileNumberInput.setAttribute("placeholder", "We may reach out for booking updates here over SMS/WhatsApp");
        mobileNumberInput.nextElementSibling.textContent = "Add a valid mobile number";
    });
  
    emailInput.addEventListener("focus", function() {
        emailInput.setAttribute("placeholder", "We'll send your tickets here");
        emailInput.nextElementSibling.textContent = "Add a valid email ID";
    });
  
    confirmEmailInput.addEventListener("focus", function() {
        confirmEmailInput.setAttribute("placeholder", "Just to confirm that we've got it right");
    });
  
    const detailsForm = document.getElementById("detailsForm");
    detailsForm.addEventListener("submit", function(event) {
      if (!fullNameInput.value.includes(" ")) {     //checks if the field is either empty or contains only spaces
            fullNameInput.nextElementSibling.textContent = "Please add your full name";
            event.preventDefault();
        }
        if (!mobileNumberInput.value.trim()) {
            mobileNumberInput.nextElementSibling.textContent = "Add a valid mobile number";
            event.preventDefault();
        }
        if (!emailInput.value.trim()) {
            emailInput.nextElementSibling.textContent = "Add a valid email ID";
            event.preventDefault();
        }
        if (emailInput.value !== confirmEmailInput.value) {
            confirmEmailInput.nextElementSibling.textContent = "Emails do not match";
            event.preventDefault();
        }
  
        // checks if certain conditions are met 
        if (fullNameInput.value && mobileNumberInput.value && emailInput.value && emailInput.value === confirmEmailInput.value) {
            const userDetails = {
                fullName: fullNameInput.value,
                gender: genderInput.value,
                mobileNumber: mobileNumberInput.value,
                email: emailInput.value
            };
            
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
        }
    });
  
  
    //attempting to retrieve user details stored in the localStorage
    const summaryTable = document.getElementById("detailsTable").querySelector("tbody");
    const userDetails = localStorage.getItem("userDetails");
    
    // code snippet parses the stored JSON string to retrieve the user details
    if (userDetails) {
      const userDetailsParsed = JSON.parse(userDetails); 
      const newRow = summaryTable.insertRow(); 
      
      const fullNameCell = newRow.insertCell(0);
      fullNameCell.textContent = userDetailsParsed.fullName; 
  
      const genderCell = newRow.insertCell(1);
      genderCell.textContent = userDetailsParsed.gender; 
  
      const mobileNumberCell = newRow.insertCell(2);
      mobileNumberCell.textContent = userDetailsParsed.mobileNumber; 
  
      const emailCell = newRow.insertCell(3);
      emailCell.textContent = userDetailsParsed.email; 
  }
  window.onload = payments.html;
  });


  