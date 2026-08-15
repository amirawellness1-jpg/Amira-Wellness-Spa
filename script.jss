document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // MOBILE MENU
    // ==========================================

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


    // ==========================================
    // AMIRA WHATSAPP NUMBER
    // ==========================================

    const whatsappNumber = "919315896303";


    // ==========================================
    // DETECT CUSTOMER SOURCE
    // ==========================================

    function getCustomerSource() {

        const urlParams = new URLSearchParams(window.location.search);

        const gclid = urlParams.get("gclid");
        const utmSource = (urlParams.get("utm_source") || "").toLowerCase();
        const utmMedium = (urlParams.get("utm_medium") || "").toLowerCase();

        const referrer = (document.referrer || "").toLowerCase();


        // Google Ads
        if (
            gclid ||
            utmSource === "google" &&
            (
                utmMedium === "cpc" ||
                utmMedium === "ppc" ||
                utmMedium === "paid"
            )
        ) {
            return "Google Ads";
        }


        // Google Search / Organic
        if (
            referrer.includes("google.co.in") ||
            referrer.includes("google.com")
        ) {
            return "Google Search";
        }


        // Default website
        return "Website";
    }


    // ==========================================
    // WHATSAPP BOOKING FORM
    // ==========================================

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();


            // Get form values

            const name = document.getElementById("name").value.trim();

            const phone = document.getElementById("phone").value.trim();

            const service = document.getElementById("service").value;

            const date = document.getElementById("date").value;

            const time = document.getElementById("time").value;


            // Basic validation

            if (!name || !phone || !service || !date || !time) {

                alert("Please fill all the details.");

                return;

            }


            // Detect source

            const source = getCustomerSource();


            // Convert date to readable format

            let formattedDate = date;

            if (date) {

                const dateObj = new Date(date + "T00:00:00");

                formattedDate = dateObj.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                });

            }


            // Convert time to 12-hour format

            let formattedTime = time;

            if (time) {

                const [hours, minutes] = time.split(":");

                const hour = parseInt(hours);

                const ampm = hour >= 12 ? "PM" : "AM";

                const hour12 = hour % 12 || 12;

                formattedTime =
                    hour12 + ":" + minutes + " " + ampm;

            }


            // ==========================================
            // WHATSAPP MESSAGE
            // ==========================================

            const message =
`Hello Amira Wellness Spa 👋

I would like to book an appointment.

👤 Name: ${name}
📞 Mobile: ${phone}
💆 Service: ${service}
📅 Date: ${formattedDate}
⏰ Time: ${formattedTime}

📍 Source: ${source}

Please confirm my appointment. Thank you.`;


            // Encode message

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);


            // Open WhatsApp

            window.open(whatsappURL, "_blank");


        });

    }


    // ==========================================
    // WEBSITE WHATSAPP BUTTONS
    // ==========================================

    const whatsappLinks = document.querySelectorAll(
        'a[href*="wa.me"]'
    );


    whatsappLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();


            const source = getCustomerSource();


            const message =
`Hello Amira Wellness Spa 👋

I would like to know more about your spa and massage services.

📍 Source: ${source}

Please share the available services and appointment details.`;


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);


            window.open(whatsappURL, "_blank");

        });

    });

});
