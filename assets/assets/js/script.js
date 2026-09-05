const menu = document.querySelector(".menu");
const headerText = document.querySelector(".header-text");
menu.addEventListener("click", function () {
    headerText.classList.toggle("active");
});
