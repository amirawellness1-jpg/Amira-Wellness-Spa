document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     MOBILE MENU
  ========================= */

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {

    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    const menuLinks = navLinks.querySelectorAll("a");

    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
      });
    });

  }


  /* =========================
     BOOKING FORM
  ========================= */

  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {

    const dateInput = document.getElementById("date");

    // Prevent selecting previous dates
    if (dateInput) {

      const today = new Date();

      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");

      const todayDate = `${year}-${month}-${day}`;

      dateInput.setAttribute("min", todayDate);
    }


    /* =========================
       FORM SUBMIT
    ========================= */

    bookingForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const service = document.getElementById("service").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;


      /* =========================
         BASIC VALIDATION
      ========================= */

      if (!name || !phone || !service || !date || !time) {

        alert("Please fill all booking details.");

        return;
      }


      /* =========================
         PHONE VALIDATION
      ========================= */

      const cleanPhone = phone.replace(/\D/g, "");

      if (cleanPhone.length !== 10) {

        alert("Please enter a valid 10-digit mobile number.");

        return;
      }


      /* =========================
         DATE FORMAT
      ========================= */

      const selectedDate = new Date(date);

      const formattedDate = selectedDate.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "long",
          year: "numeric"
        }
      );


      /* =========================
         TIME FORMAT
      ========================= */

      let formattedTime = time;

      if (time) {

        const [hours, minutes] = time.split(":");

        let hour = parseInt(hours);

        const ampm = hour >= 12 ? "PM" : "AM";

        hour = hour % 12 || 12;

        formattedTime =
          `${hour}:${minutes} ${ampm}`;
      }


      /* =========================
         WHATSAPP MESSAGE
      ========================= */

      const message =
`Hello Amira Wellness Spa,

I would like to book an appointment.

Name: ${name}
Mobile: ${phone}
Service: ${service}
Preferred Date: ${formattedDate}
Preferred Time: ${formattedTime}

Please confirm my appointment. Thank you.`;


      /* =========================
         WHATSAPP NUMBER
      ========================= */

      const whatsappNumber = "919315896303";


      /* =========================
         OPEN WHATSAPP
      ========================= */

      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


      window.open(whatsappURL, "_blank");

    });

  }

});
