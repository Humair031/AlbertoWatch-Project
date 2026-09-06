// app.js

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MOBILE SIDEBAR
    ========================================= */

    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    function openSidebar() {
        sidebar.classList.add("active");
        sidebarOverlay.classList.add("active");

        menuBtn.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
        sidebar.classList.remove("active");
        sidebarOverlay.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    if (menuBtn) {
        menuBtn.addEventListener("click", openSidebar);
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }


    /* =========================================
       MOBILE PRODUCTS DROPDOWN
    ========================================= */

    const sidebarProducts =
        document.getElementById("sidebarProducts");

    const sidebarDropdown =
        document.getElementById("sidebarDropdown");

    if (sidebarProducts && sidebarDropdown) {

        sidebarProducts.addEventListener("click", function () {

            sidebarDropdown.classList.toggle("active");

        });

    }


    /* =========================================
       DESKTOP PRODUCTS DROPDOWN
    ========================================= */

    const desktopProductsBtn =
        document.getElementById("desktopProductsBtn");

    const desktopDropdown =
        document.querySelector(".nav-dropdown");

    if (desktopProductsBtn && desktopDropdown) {

        desktopProductsBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            desktopDropdown.classList.toggle("open");

        });

    }


    /* Close desktop dropdown when clicking elsewhere */

    document.addEventListener("click", function (event) {

        if (
            desktopDropdown &&
            !desktopDropdown.contains(event.target)
        ) {
            desktopDropdown.classList.remove("open");
        }

    });


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeSidebar();

            if (desktopDropdown) {
                desktopDropdown.classList.remove("open");
            }

        }

    });


    /* =========================================
       CLOSE SIDEBAR AFTER LINK CLICK
    ========================================= */

    const sidebarLinks =
        document.querySelectorAll(".sidebar-nav a");

    sidebarLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            closeSidebar();

        });

    });


    /* =========================================
       RESPONSIVE SIDEBAR RESET
    ========================================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 992) {

            closeSidebar();

        }

    });

});