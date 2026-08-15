document.addEventListener("DOMContentLoaded", function () {

    // Mobile Menu
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    if (navToggle && navLinks) {

        navToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
            });
        });
    }


    // Booking Form → WhatsApp
    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;

            if (!name || !phone || !service || !date || !time) {
                alert("Please fill all details.");
                return;
            }

            const cleanPhone = phone.replace(/\D/g, "");

            if (cleanPhone.length !== 10) {
                alert("Please enter a valid 10 digit mobile number.");
                return;
            }

            const message =
                "Hello Amira Wellness Spa,%0A%0A" +
                "I would like to book an appointment.%0A%0A" +
                "Name: " + encodeURIComponent(name) + "%0A" +
                "Mobile: " + encodeURIComponent(phone) + "%0A" +
                "Service: " + encodeURIComponent(service) + "%0A" +
                "Preferred Date: " + encodeURIComponent(date) + "%0A" +
                "Preferred Time: " + encodeURIComponent(time) + "%0A%0A" +
                "Customer Source: WEBSITE%0A%0A" +
                "I found Amira Wellness Spa through the website.%0A%0A" +
                "Please confirm my appointment.";

            const whatsappURL =
                "https://wa.me/919315896303?text=" + message;

            window.location.href = whatsappURL;

        });
    }


    // Prevent selecting past dates
    const dateInput = document.getElementById("date");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
    }

});
