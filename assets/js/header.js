/* =========================================================
   ALBERTO WATCHES - header.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.querySelector(".sectioncol-3 .menu");
    const nav = document.querySelector(".header-text");
    const dropdown = document.querySelector(".dropdown");
    const dropdownLink = document.querySelector(".dropdown > a");

    /* ================= MOBILE MENU ================= */

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", function () {
            nav.classList.toggle("mobile-active");
        });

    }

    /* ================= MOBILE DROPDOWN ================= */

    if (dropdownLink && dropdown) {

        dropdownLink.addEventListener("click", function (event) {

            if (window.innerWidth <= 768) {

                event.preventDefault();

                dropdown.classList.toggle("dropdown-active");

            }

        });

    }

    /* ================= CLOSE MENU ================= */

    document.addEventListener("click", function (event) {

        if (
            nav &&
            menuBtn &&
            !nav.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            nav.classList.remove("mobile-active");
        }

    });

});