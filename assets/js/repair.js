document.addEventListener("DOMContentLoaded", function () {
// ================= MOBILE MENU =================

const menuBtn = document.querySelector(".sectioncol-3 .menu");
const nav = document.querySelector(".sectioncol-2");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
        nav.classList.toggle("active");
    });
}


// ================= FORM VALIDATION =================

const form = document.querySelector(".form-container form");

if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const firstName = form.querySelectorAll("input")[0];
        const lastName = form.querySelectorAll("input")[1];
        const email = form.querySelectorAll("input")[2];
        const phone = form.querySelectorAll("input")[3];
        const problem = form.querySelectorAll("input")[4];

        let valid = true;

        // Remove old errors
        form.querySelectorAll("input").forEach(function (input) {
            input.classList.remove("error");
        });


        // First Name
        if (firstName.value.trim() === "") {
            firstName.classList.add("error");
            valid = false;
        }


        // Last Name
        if (lastName.value.trim() === "") {
            lastName.classList.add("error");
            valid = false;
        }


        // Email
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            email.value.trim() === "" ||
            !emailPattern.test(email.value.trim())
        ) {
            email.classList.add("error");
            valid = false;
        }


        // Phone
        if (phone.value.trim() !== "") {

            const phonePattern =
                /^[0-9+\-\s()]{7,20}$/;

            if (!phonePattern.test(phone.value.trim())) {
                phone.classList.add("error");
                valid = false;
            }
        }


        if (!valid) {

            alert("Please enter the required information correctly.");

            return;
        }


        // Success message
        alert(
            "Thank you! Your repair request has been submitted successfully."
        );

        form.reset();
    });
}


// ================= INPUT FOCUS EFFECT =================

const inputs = document.querySelectorAll(
    ".form-group input"
);

inputs.forEach(function (input) {

    input.addEventListener("input", function () {
        this.classList.remove("error");
    });

});


// ================= SCROLL HEADER EFFECT =================

const header = document.querySelector(".headercol-sec");

window.addEventListener("scroll", function () {

    if (window.scrollY > 80) {
        header.style.boxShadow =
            "0 4px 18px rgba(0,0,0,0.08)";
    } else {
        header.style.boxShadow = "none";
    }

});


// ================= IMAGE LOAD EFFECT =================

const repairImage = document.querySelector(".repair-img");

if (repairImage) {

    repairImage.addEventListener("load", function () {
        this.style.opacity = "1";
    });

    repairImage.style.opacity = "0";
    repairImage.style.transition = "opacity 0.7s ease";
}


// ================= CLOSE MOBILE MENU =================

document.querySelectorAll(".header-text a").forEach(function (link) {

    link.addEventListener("click", function () {

        if (window.innerWidth <= 768) {
            nav.classList.remove("active");
        }

    });

});

});
