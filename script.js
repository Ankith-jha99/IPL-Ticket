
// Get HTML elements
const match = document.getElementById("match");
const stand = document.getElementById("stand");
const quantity = document.getElementById("quantity");

const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.getElementById("summaryStand");
const summaryPrice = document.getElementById("summaryPrice");
const summaryQuantity = document.getElementById("summaryQuantity");
const total = document.getElementById("total");

// Update booking summary
function updateSummary() {

    let price = Number(stand.value);
    let qty = Number(quantity.value);

    if (qty < 1 || !Number.isInteger(qty)) {
        qty = 1;
    }

    summaryMatch.textContent = match.value;

    summaryStand.textContent =
        stand.options[stand.selectedIndex].text.split(" - ")[0];

    summaryPrice.textContent = price;
    summaryQuantity.textContent = qty;

    total.textContent = price * qty;
}

// Listen for changes
match.addEventListener("change", updateSummary);
stand.addEventListener("change", updateSummary);
quantity.addEventListener("input", updateSummary);

// Team Filter
const teamFilter = document.getElementById("teamFilter");
const rows = document.querySelectorAll("#matchTable tr");

teamFilter.addEventListener("change", function() {

    let selectedTeam = teamFilter.value;

    rows.forEach(function(row) {

        let teams = row.cells[1].textContent;

        if (selectedTeam === "all" || teams.includes(selectedTeam)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

});

// Booking Form
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    let qty = Number(quantity.value);

    if (!Number.isInteger(qty) || qty < 1) {
        alert("Enter a valid ticket quantity");
        return;
    }

    let matchName = match.value;
    let standName = stand.options[stand.selectedIndex].text.split(" - ")[0];
    let amount = Number(stand.value) * qty;

    // Add booking to table
    let table = document.getElementById("bookingRecords");

    let newRow = table.insertRow();

    newRow.insertCell(0).textContent = name;
    newRow.insertCell(1).textContent = matchName;
    newRow.insertCell(2).textContent = standName;
    newRow.insertCell(3).textContent = qty;
    newRow.insertCell(4).textContent = "₹" + amount;

    alert("Booking Successful!");

    bookingForm.reset();
    updateSummary();

});
 
// Initial summary
updateSummary();
