const menu = document.querySelector(".menu");
const headerText = document.querySelector(".header-text");
const dropdown = document.querySelector(".dropdown");
const dropdownLink = document.querySelector(".dropdown > a");

menu.addEventListener("click", function () {
    headerText.classList.toggle("active");
});

dropdownLink.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle("active");
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        headerText.classList.remove("active");
        dropdown.classList.remove("active");
    }
});