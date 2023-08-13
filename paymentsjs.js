document.addEventListener("DOMContentLoaded", function () {
    // Retrieve values from local storage
    const selectedDate = localStorage.getItem("selectedDate");
    const selectedTime = localStorage.getItem("selectedTime");
    const slAdultTickets = parseInt(localStorage.getItem("slAdultTickets"));
    const slChildTickets = parseInt(localStorage.getItem("slChildTickets"));
    const foreignAdultTickets = parseInt(localStorage.getItem("foreignAdultTickets"));
    const foreignChildTickets = parseInt(localStorage.getItem("foreignChildTickets"));
    const infantTickets = parseInt(localStorage.getItem("infantTickets"));


    // Update summary table with retrieved values
    if (selectedDate !== null) {
        document.getElementById("tableinputdate").innerText = selectedDate;
    }
    if (selectedTime !== null) {
        document.getElementById("tableinputtime").innerText = selectedTime;
    }

    document.getElementById("tableinputdate").innerText = selectedDate;
    document.getElementById("tableinputtime").innerText = selectedTime;
    document.getElementById("rowlocaladult").innerText = slAdultTickets;
    document.getElementById("rowlocalchild").innerText = slChildTickets;
    document.getElementById("rowforiegnadult").innerText = foreignAdultTickets;
    document.getElementById("rowforiegnchild").innerText = foreignChildTickets;
    document.getElementById("rowinfant").innerText = infantTickets;


    /*const summaryTickets = document.getElementById("summary-tickets");
    const summaryPrice = document.getElementById("summary-price");
    summaryTickets.innerHTML = "";
    summaryPrice.innerHTML = "";*/

    // Define the calculateCategoryTotal function
    function calculateCategoryTotal(category, quantity) {
        // Define prices for each category 
        const prices = {
            "localAdult": 20,
            "localChild": 10,
            "foreignerAdult": 30,
            "foreignerChild": 15,
            "infant": 0
        };
        return prices[category] * quantity;
    }

    let totalPayable = 0; // Initializing the total payable variable

    // an array to iterate through ticket categories
    const ticketCategories = [
        { category: "localAdult", quantity: slAdultTickets },
        { category: "localChild", quantity: slChildTickets },
        { category: "foreignerAdult", quantity: foreignAdultTickets },
        { category: "foreignerChild", quantity: foreignChildTickets },
        { category: "infant", quantity: infantTickets }
    ];

    for (const categoryData of ticketCategories) {
        const { category, quantity } = categoryData;
        if (quantity > 0) {
            const categoryTotal = calculateCategoryTotal(category, quantity);
            summaryTickets.innerHTML += `<li>${quantity} ${category}</li>`;
            summaryPrice.innerHTML += `<li>$${categoryTotal}</li>`;
            totalPayable += categoryTotal; // Add to the total payable
        }
    }

    // Display the total payable
    /*summaryPrice.innerHTML += `<li class="bold">Total Payable: $${totalPayable}</li>`;
});*/


document.querySelector('.card-number-input').oninput = () =>{
    document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
}

document.querySelector('.card-holder-input').oninput = () =>{
    document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
}

document.querySelector('.month-input').oninput = () =>{
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

document.querySelector('.year-input').oninput = () =>{
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () =>{
    document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
}

const cardNumberInput = document.querySelector('.card-number-input');
const cardNumberBox = document.querySelector('.card-number-box');
const cardHolderInput = document.querySelector('.card-holder-input');
const cardHolderName = document.querySelector('.card-holder-name');
const monthInput = document.querySelector('.month-input');
const yearInput = document.querySelector('.year-input');
const cvvInput = document.querySelector('.cvv-input');
const cvvBox = document.querySelector('.cvv-box');
const submitBtn = document.querySelector('.submit-btn');
const errorMessages = document.querySelectorAll('.error-message');

// Helper function to display error message
function showError(inputElement, errorMessage) {
    const parent = inputElement.parentElement;
    const errorElement = parent.querySelector('.error-message');
    errorElement.innerText = errorMessage;
}

// Helper function to clear error message
function clearError(inputElement) {
    const parent = inputElement.parentElement;
    const errorElement = parent.querySelector('.error-message');
    errorElement.innerText = '';
}

// Card Number Validation
cardNumberInput.oninput = () => {
    clearError(cardNumberInput);
    const cardNumberValue = cardNumberInput.value;
    if (cardNumberValue.length < 16) {
        showError(cardNumberInput, 'Incomplete field');
    }
    cardNumberBox.innerText = cardNumberValue;
}

// Card Holder Name Validation
cardHolderInput.oninput = () => {
    clearError(cardHolderInput);
    const cardHolderValue = cardHolderInput.value;
    if (!/^[A-Za-z\s]+$/.test(cardHolderValue)) {
        showError(cardHolderInput, 'Name contains invalid characteristics');
    }
    cardHolderName.innerText = cardHolderValue;
}

// Expiration Date Validation
monthInput.oninput = yearInput.oninput = () => {
    clearError(yearInput);
    const yearValue = parseInt(yearInput.value);
    if (yearValue < 2023) {
        showError(yearInput, 'Card too old');
    }
}

// CVV Validation
cvvInput.oninput = () => {
    clearError(cvvInput);
    const cvvValue = cvvInput.value;
    if (cvvValue.length < 3) {
        showError(cvvInput, 'Incomplete field');
    }
    cvvBox.innerText = cvvValue;
}

// Submit Validation
submitBtn.onclick = (event) => {
    event.preventDefault();
    const errorCount = document.querySelectorAll('.error-message').length;
    if (errorCount === 0) {
        // Form submission logic here
    } else {
        // Scroll to the first error message
        const firstError = document.querySelector('.error-message');
        firstError.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
});