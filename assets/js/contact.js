document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuBtn = document.querySelector(".sectioncol-3 .menu");
    const navMenu = document.querySelector(".sectioncol-2");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            /* Change menu icon */

            if (navMenu.classList.contains("active")) {
                menuBtn.style.transform = "rotate(90deg)";
            } else {
                menuBtn.style.transform = "rotate(0deg)";
            }

        });
    }


    /* =====================================
       PRODUCTS DROPDOWN MOBILE
    ===================================== */

    const dropdown = document.querySelector(".dropdown");
    const dropdownLink = dropdown
        ? dropdown.querySelector(":scope > a")
        : null;

    if (dropdown && dropdownLink) {

        dropdownLink.addEventListener("click", function (event) {

            if (window.innerWidth <= 768) {

                event.preventDefault();

                dropdown.classList.toggle("active");

            }

        });
    }


    /* =====================================
       CLOSE MOBILE MENU
    ===================================== */

    const navLinks = document.querySelectorAll(
        ".header-text > a:not(.dropdown > a)"
    );

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 768) {

                navMenu.classList.remove("active");

                if (menuBtn) {
                    menuBtn.style.transform = "rotate(0deg)";
                }

            }

        });

    });


    /* =====================================
       CONTACT FORM
    ===================================== */

    const form = document.querySelector("form");

    if (form) {

        const nameInput = form.querySelector(
            'input[type="text"]'
        );

        const emailInput = form.querySelector(
            'input[type="email"]'
        );

        const messageInput = form.querySelector(
            "textarea"
        );

        const submitBtn = form.querySelector(
            ".submit-btn"
        );


        form.addEventListener("submit", function (event) {

            event.preventDefault();


            /* Remove previous errors */

            document
                .querySelectorAll(".form-error")
                .forEach(function (error) {
                    error.remove();
                });


            /* Reset borders */

            [nameInput, emailInput, messageInput].forEach(
                function (input) {

                    if (input) {
                        input.style.borderColor = "#ddd";
                    }

                }
            );


            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();


            let valid = true;


            /* NAME */

            if (name.length < 2) {

                showError(
                    nameInput,
                    "Please enter your name."
                );

                valid = false;
            }


            /* EMAIL */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                showError(
                    emailInput,
                    "Please enter a valid email address."
                );

                valid = false;
            }


            /* MESSAGE */

            if (message.length < 5) {

                showError(
                    messageInput,
                    "Please enter your message."
                );

                valid = false;
            }


            /* Stop if invalid */

            if (!valid) {
                return;
            }


            /* =================================
               SUBMIT BUTTON
            ================================= */

            const oldText = submitBtn.textContent;

            submitBtn.disabled = true;

            submitBtn.textContent = "Sending...";


            setTimeout(function () {

                submitBtn.textContent =
                    "Message Sent ✓";


                showSuccess(
                    form,
                    "Thank you! Your message has been submitted successfully."
                );


                form.reset();


                setTimeout(function () {

                    submitBtn.textContent = oldText;

                    submitBtn.disabled = false;

                }, 2500);


            }, 1000);

        });
    }


    /* =====================================
       SHOW ERROR
    ===================================== */

    function showError(input, message) {

        if (!input) return;

        input.style.borderColor = "#d32f2f";


        const error = document.createElement("small");

        error.className = "form-error";

        error.textContent = message;

        error.style.display = "block";
        error.style.color = "#d32f2f";
        error.style.fontSize = "12px";
        error.style.marginTop = "5px";


        input.parentElement.appendChild(error);


        input.addEventListener(
            "input",
            function () {

                input.style.borderColor = "#ddd";

                if (error) {
                    error.remove();
                }

            },
            { once: true }
        );
    }


    /* =====================================
       SUCCESS MESSAGE
    ===================================== */

    function showSuccess(form, message) {

        let success =
            form.querySelector(".success-message");


        if (!success) {

            success =
                document.createElement("div");

            success.className =
                "success-message";

            form.appendChild(success);
        }


        success.textContent = message;

        success.style.display = "block";


        setTimeout(function () {

            success.style.display = "none";

        }, 4000);
    }


    /* =====================================
       NAVBAR SCROLL EFFECT
    ===================================== */

    const navbar =
        document.querySelector(".headercol-sec");


    window.addEventListener("scroll", function () {

        if (!navbar) return;


        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 5px 20px rgba(0,0,0,0.15)";

        } else {

            navbar.style.boxShadow =
                "0 2px 12px rgba(0,0,0,0.08)";
        }

    });


    /* =====================================
       WINDOW RESIZE
    ===================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (dropdown) {
                dropdown.classList.remove("active");
            }

            if (menuBtn) {
                menuBtn.style.transform = "rotate(0deg)";
            }

        }

    });

});