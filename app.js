function showToast(message) {

    let toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

// Smooth Scrolling for Book Buttons

document.addEventListener("DOMContentLoaded", function () {

    const bookButtons = document.querySelectorAll(".book-btn");

    bookButtons.forEach(function(button) {

        button.addEventListener("click", function(event) {

            event.preventDefault();

            document.getElementById("booking").scrollIntoView({
                behavior: "smooth"
            });

            showToast("Redirecting to Booking Form!");

        });

    });

});

