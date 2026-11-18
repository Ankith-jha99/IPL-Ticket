
// DOM Selectors
const match = document.getElementById("match");
const stand = document.getElementById("stand");
const quantity = document.getElementById("quantity");

const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.getElementById("summaryStand");
const summaryPrice = document.getElementById("summaryPrice");
const summaryQuantity = document.getElementById("summaryQuantity");
const total = document.getElementById("total");

const bookingForm = document.getElementById("bookingForm");
const bookingRecords = document.getElementById("bookingRecords");

// Ticket Prices
const prices = {
    "RCB vs CSK": {
        General: 1000,
        Premium: 2500,
        VIP: 5000
    },

    "MI vs KKR": {
        General: 1000,
        Premium: 2500,
        VIP: 5000
    },

    "CSK vs MI": {
        General: 1000,
        Premium: 2500,
        VIP: 5000
    },

    "CSK vs GT": {
        General: 1000,
        Premium: 2500,
        VIP: 5000
    },

    "SRH vs RR": {
        General: 800,
        Premium: 1500,
        VIP: 3000
    }
};

// Toast Notification
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

// Calculate and Update Booking Summary
function updateSummary(showNotification = true) {

    let selectedMatch = match.value;
    let selectedStand = stand.value;
    let ticketQuantity = Number(quantity.value);

    let price = 0;

    if (selectedMatch && selectedStand) {
        price = prices[selectedMatch][selectedStand];
    }

    if (ticketQuantity < 1 || !Number.isInteger(ticketQuantity)) {
        ticketQuantity = 0;
    }

    if (ticketQuantity > 10) {
        ticketQuantity = 10;
    }

    let totalPrice = price * ticketQuantity;

    // Display Booking Details
    summaryMatch.textContent = selectedMatch || "Not Selected";

    summaryStand.textContent = selectedStand || "Not Selected";

    summaryPrice.textContent = price;

    summaryQuantity.textContent = ticketQuantity;

    total.textContent = totalPrice;

    if (showNotification) {
        showToast("Booking Summary Updated!");
    }
}

// Change Event Listeners
match.addEventListener("change", function () {
    updateSummary();
});

stand.addEventListener("change", function () {
    updateSummary();
});

quantity.addEventListener("change", function () {
    updateSummary();
});

// Also update quantity immediately while typing
quantity.addEventListener("input", function () {
    updateSummary(false);
});

// Confirm Booking
bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let selectedMatch = match.value;
    let selectedStand = stand.value;
    let ticketQuantity = Number(quantity.value);

    let name = document.getElementById("name").value;

    let email = document.getElementById("email").value;

    let phone = document.getElementById("phone").value;

    // Check valid booking details
    if (!selectedMatch || !selectedStand ||
        ticketQuantity < 1 || ticketQuantity > 10) {

        showToast("Please select valid booking details!");
        return;
    }

    let price = prices[selectedMatch][selectedStand];

    let totalPrice = price * ticketQuantity;

    // Add booking to My Bookings table
    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${selectedMatch}</td>
        <td>${selectedStand}</td>
        <td>${ticketQuantity}</td>
        <td>₹${totalPrice}</td>
    `;

    bookingRecords.appendChild(row);

    showToast("Booking Confirmed Successfully!");

    // Reset Form
    bookingForm.reset();

    updateSummary(false);
});

// Team Filter
const teamFilter = document.getElementById("teamFilter");

teamFilter.addEventListener("change", function () {

    let selectedTeam = teamFilter.value;

    let rows = document.querySelectorAll("#matchTable tr");

    rows.forEach(function (row) {

        let teams = row.cells[1].textContent;

        if (selectedTeam === "all" ||
            teams.includes(selectedTeam)) {

            row.style.display = "";
        } else {

            row.style.display = "none";
        }
    });
});

// Book Button
document.querySelectorAll(".book-btn").forEach(function (button) {

    button.addEventListener("click", function () {

        let row = button.closest("tr");
        let selectedMatch = row.cells[1].textContent;

        match.value = selectedMatch;

        updateSummary();

    });
});

// Initial Summary
updateSummary(false);
