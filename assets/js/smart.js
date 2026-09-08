document.addEventListener("DOMContentLoaded", function () {
/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.querySelector(".sectioncol-3 .menu");
const nav = document.querySelector(".sectioncol-2");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
        nav.classList.toggle("active");
    });
}


/* =========================
   BUY NOW BUTTON
========================= */

const buyButtons =
    document.querySelectorAll(".watch-btn");

buyButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const card =
            this.closest(".watch-box");

        const productName =
            card.querySelector("h2").textContent.trim();

        const price =
            card.querySelector(".watch-price").textContent.trim();

        alert(
            "Product Selected\n\n" +
            productName +
            "\n" +
            price
        );

    });

});


/* =========================
   PRODUCT HOVER EFFECT
========================= */

const cards =
    document.querySelectorAll(".watch-box");

cards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {
        this.style.zIndex = "5";
    });

    card.addEventListener("mouseleave", function () {
        this.style.zIndex = "1";
    });

});


/* =========================
   SCROLL HEADER EFFECT
========================= */

const header =
    document.querySelector(".headercol-sec");

if (header) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 60) {

            header.style.boxShadow =
                "0 4px 18px rgba(0,0,0,.08)";

        } else {

            header.style.boxShadow = "none";
        }

    });

}


/* =========================
   CLOSE MOBILE MENU
========================= */

document.querySelectorAll(".header-text > a")
    .forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 768) {
                nav.classList.remove("active");
            }

        });

    });


/* =========================
   IMAGE LAZY EFFECT
========================= */

const images =
    document.querySelectorAll(".watch-image img");

images.forEach(function (img) {

    img.addEventListener("load", function () {

        this.style.opacity = "1";

    });

    img.style.opacity = "0";
    img.style.transition = "opacity .5s ease";

});


/* =========================
   CURRENT PAGE ACTIVE LINK
========================= */

const currentPage =
    window.location.pathname.split("/").pop();

document.querySelectorAll(".header-text a")
    .forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {
            link.style.color = "#a8894d";
        }

    });

});
