document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE MENU
    ========================= */

    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    if (navToggle && navLinks) {

        navToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");

            if (navLinks.classList.contains("active")) {
                navToggle.setAttribute("aria-label", "Close Menu");
            } else {
                navToggle.setAttribute("aria-label", "Open Menu");
            }
        });

        const links = navLinks.querySelectorAll("a");

        links.forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                navToggle.setAttribute("aria-label", "Open Menu");
            });
        });
    }


    /* =========================
       BOOKING FORM → WHATSAPP
    ========================= */

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;


            /* Validate */

            if (!name || !phone || !service || !date || !time) {
                alert("Please fill all the details.");
                return;
            }


            /* Mobile number validation */

            if (!/^[0-9]{10}$/.test(phone)) {
                alert("Please enter a valid 10 digit mobile number.");
                return;
            }


            /* Date formatting */

            const dateObject = new Date(date);

            const formattedDate = dateObject.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });


            /* =========================
               WHATSAPP MESSAGE
            ========================= */

            const message =
`Hello Amira Wellness Spa 👋

I want to book a spa appointment.

👤 Name: ${name}
📱 Customer Mobile: ${phone}
💆 Service: ${service}
📅 Preferred Date: ${formattedDate}
⏰ Preferred Time: ${time}

📍 Customer Source: Website / Google

I found Amira Wellness Spa through your website.

Please confirm my appointment. Thank you!`;


            /* WhatsApp Business Number */

            const whatsappNumber = "919315896303";


            /* Encode message */

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);


            /* Open WhatsApp */

            window.location.href = whatsappURL;

        });
    }

});
