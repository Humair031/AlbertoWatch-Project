document.addEventListener("DOMContentLoaded", function () {
/* =========================================
   ELEMENTS
========================================= */

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebarOverlay");

const sidebarProducts =
    document.getElementById("sidebarProducts");

const sidebarDropdown =
    document.querySelector(".sidebar-dropdown");


/* =========================================
   OPEN SIDEBAR
========================================= */

function openSidebar() {

    if (!sidebar || !overlay) return;

    sidebar.classList.add("active");
    overlay.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================================
   CLOSE SIDEBAR
========================================= */

function closeSidebar() {

    if (!sidebar || !overlay) return;

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

    document.body.style.overflow = "";

    if (sidebarDropdown) {
        sidebarDropdown.classList.remove("active");
    }
}


/* =========================================
   MENU BUTTON
========================================= */

if (menuBtn) {
    menuBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        if (sidebar.classList.contains("active")) {
            closeSidebar();
        } else {
            openSidebar();
        }

    });
}


/* =========================================
   CLOSE BUTTON
========================================= */

if (closeBtn) {
    closeBtn.addEventListener("click", function () {
        closeSidebar();
    });
}


/* =========================================
   OVERLAY CLICK
========================================= */

if (overlay) {
    overlay.addEventListener("click", function () {
        closeSidebar();
    });
}


/* =========================================
   PRODUCTS DROPDOWN
========================================= */

if (sidebarProducts && sidebarDropdown) {

    sidebarProducts.addEventListener("click", function () {

        sidebarDropdown.classList.toggle("active");

    });

}


/* =========================================
   SIDEBAR LINKS
========================================= */

const sidebarLinks =
    document.querySelectorAll(".sidebar-nav a");

sidebarLinks.forEach(function (link) {

    link.addEventListener("click", function () {
        closeSidebar();
    });

});


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeSidebar();
    }

});


/* =========================================
   WINDOW RESIZE
========================================= */

window.addEventListener("resize", function () {

    if (window.innerWidth > 900) {
        closeSidebar();
    }

});


/* =========================================
   DESKTOP PRODUCTS DROPDOWN
========================================= */

const desktopDropdown =
    document.querySelector(".nav-dropdown");

const desktopDropdownBtn =
    document.querySelector(".dropdown-btn");

if (desktopDropdown && desktopDropdownBtn) {

    desktopDropdownBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        desktopDropdown.classList.toggle("active");

    });

}


/* =========================================
   CLOSE DESKTOP DROPDOWN
========================================= */

document.addEventListener("click", function (event) {

    if (
        desktopDropdown &&
        !desktopDropdown.contains(event.target)
    ) {
        desktopDropdown.classList.remove("active");
    }

});


/* =========================================
   SEARCH ICON
========================================= */

const searchIcon =
    document.querySelector(
        '.nav-icons a[href="search.html"]'
    );

if (searchIcon) {

    searchIcon.addEventListener("click", function () {

        window.location.href = "search.html";

    });

}


/* =========================================
   CART ICON
========================================= */

const cartIcon =
    document.querySelector(
        '.nav-icons a[href="cart.html"]'
    );

if (cartIcon) {

    cartIcon.addEventListener("click", function () {

        window.location.href = "cart.html";

    });

}


/* =========================================
   USER ICON
========================================= */

const userIcon =
    document.querySelector(
        '.nav-icons a[href="login.html"]'
    );

if (userIcon) {

    userIcon.addEventListener("click", function () {

        window.location.href = "login.html";

    });

}

});
