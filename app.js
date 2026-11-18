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
    "RCB vs CSK": { General: 1000, Premium: 2500, VIP: 5000 },
    "MI vs KKR": { General: 1000, Premium: 2500, VIP: 5000 },
    "CSK vs MI": { General: 1000, Premium: 2500, VIP: 5000 },
    "CSK vs GT": { General: 1000, Premium: 2500, VIP: 5000 },
    "SRH vs RR": { General: 800, Premium: 1500, VIP: 3000 }
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

    summaryMatch.textContent = selectedMatch || "Not Selected";
    summaryStand.textContent = selectedStand || "Not Selected";
    summaryPrice.textContent = price;
    summaryQuantity.textContent = ticketQuantity;
    total.textContent = totalPrice;

    if (showNotification) {
        showToast("Booking Summary Updated!");
    }
}

// Change Event Listeners for Booking
if (match) match.addEventListener("change", () => updateSummary());
if (stand) stand.addEventListener("change", () => updateSummary());
if (quantity) {
    quantity.addEventListener("change", () => updateSummary());
    quantity.addEventListener("input", () => updateSummary(false));
}

// Confirm Booking Form Submission
if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let selectedMatch = match.value;
        let selectedStand = stand.value;
        let ticketQuantity = Number(quantity.value);
        let name = document.getElementById("name").value;

        if (!selectedMatch || !selectedStand || ticketQuantity < 1 || ticketQuantity > 10) {
            showToast("Please select valid booking details!");
            return;
        }

        let price = prices[selectedMatch][selectedStand];
        let totalPrice = price * ticketQuantity;

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
        bookingForm.reset();
        updateSummary(false);
    });
}

// Team Filter for Grid Match Cards
const teamFilter = document.getElementById("teamFilter");
if (teamFilter) {
    teamFilter.addEventListener("change", function () {
        let selectedTeam = teamFilter.value;
        let cards = document.querySelectorAll("#matchCardsContainer .card");

        cards.forEach(function (card) {
            let cardTeams = card.getAttribute("data-team");
            if (selectedTeam === "all" || cardTeams.includes(selectedTeam)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// Grid / List View Toggle Logic
const viewToggleBtn = document.getElementById("viewToggleBtn");
const matchCardsContainer = document.getElementById("matchCardsContainer");

if (viewToggleBtn && matchCardsContainer) {
    viewToggleBtn.addEventListener("click", function () {
        matchCardsContainer.classList.toggle("list-view");
        if (matchCardsContainer.classList.contains("list-view")) {
            viewToggleBtn.textContent = "Switch to Grid View";
        } else {
            viewToggleBtn.textContent = "Switch to List View";
        }
    });
}

// Hamburger Mobile Menu Toggle Logic
const hamburgerBtn = document.getElementById("hamburger-btn");
const navLinks = document.getElementById("nav-links");

if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}

// Book Button Click Delegation
document.querySelectorAll(".book-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        let card = button.closest(".card");
        let matchTitle = card.querySelector("h3").textContent;
        match.value = matchTitle;
        updateSummary();
    });
});

// Initial Summary Setup
updateSummary(false);