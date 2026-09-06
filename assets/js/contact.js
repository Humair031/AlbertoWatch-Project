/* =====================================================
   ALBERTO WATCHES - CONTACT PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuButton = document.querySelector(".sectioncol-3 .menu");
    const mobileMenu = document.querySelector(".sectioncol-2");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", function () {

            mobileMenu.classList.toggle("show");

            if (mobileMenu.classList.contains("show")) {
                menuButton.src =
                    "assets/icon/xmark-solid-full.svg";
            } else {
                menuButton.src =
                    "assets/icon/bars-solid-full.svg";
            }

        });
    }


    /* =================================================
       PRODUCTS DROPDOWN - MOBILE
    ================================================= */

    const dropdown = document.querySelector(".dropdown");
    const dropdownLink = document.querySelector(".dropdown > a");

    if (dropdown && dropdownLink) {

        dropdownLink.addEventListener("click", function (event) {

            event.preventDefault();

            dropdown.classList.toggle("open");

        });
    }


    /* =================================================
       CONTACT FORM
    ================================================= */

    const form = document.querySelector(".card form");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const nameInput =
                form.querySelector('input[placeholder="Name *"]');

            const emailInput =
                form.querySelector('input[type="email"]');

            const messageInput =
                form.querySelector("textarea");


            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();


            /* Name validation */

            if (name === "") {

                alert("Please enter your name.");

                nameInput.focus();

                return;
            }


            /* Email validation */

            if (email === "") {

                alert("Please enter your email address.");

                emailInput.focus();

                return;
            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");

                emailInput.focus();

                return;
            }


            /* Message validation */

            if (message === "") {

                alert("Please enter your message.");

                messageInput.focus();

                return;
            }


            /* Success */

            alert(
                "Thank you, " +
                name +
                "! Your message has been submitted successfully."
            );


            form.reset();

        });

    }


    /* =================================================
       CLOSE MOBILE MENU AFTER LINK CLICK
    ================================================= */

    const menuLinks =
        document.querySelectorAll(".header-text > a");

    menuLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 768) {

                mobileMenu.classList.remove("show");

                if (menuButton) {

                    menuButton.src =
                        "assets/icon/bars-solid-full.svg";

                }

            }

        });

    });

});