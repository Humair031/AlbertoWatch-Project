document.addEventListener("DOMContentLoaded", function () {

    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("show");

            menuBtn.textContent =
                navMenu.classList.contains("show") ? "×" : "☰";
        });
    }


    /* ================= DROPDOWN MOBILE ================= */

    const dropdown = document.querySelector(".dropdown");
    const dropBtn = document.querySelector(".drop-btn");

    if (dropBtn && dropdown) {

        dropBtn.addEventListener("click", function (e) {

            if (window.innerWidth <= 800) {

                e.preventDefault();

                dropdown.classList.toggle("open");
            }

        });

    }


    /* ================= PRODUCT FILTER ================= */

    const filterButtons = document.querySelectorAll(".filter");
    const products = document.querySelectorAll(".watch-card");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.getAttribute("data-filter");

            products.forEach(function (product) {

                const category =
                    product.getAttribute("data-category");

                if (filter === "all" || category === filter) {

                    product.style.display = "block";

                    setTimeout(function () {
                        product.style.opacity = "1";
                    }, 50);

                } else {

                    product.style.display = "none";
                    product.style.opacity = "0";

                }

            });

        });

    });


    /* ================= BUY NOW ================= */

    const buyButtons = document.querySelectorAll(".buy-btn");

    buyButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productName =
                button.getAttribute("data-name");

            const productPrice =
                button.getAttribute("data-price");

            alert(
                "Thank you for choosing Alberto Watches!\n\n" +
                "Product: " + productName +
                "\nPrice: " + productPrice +
                "\n\nOur team will contact you soon."
            );

        });

    });


    /* ================= QUICK VIEW ================= */

    const modal = document.getElementById("quickModal");
    const closeModal = document.getElementById("closeModal");

    const modalTitle = document.getElementById("modalTitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalDescription =
        document.getElementById("modalDescription");

    const quickButtons =
        document.querySelectorAll(".quick-view");


    quickButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const card = button.closest(".watch-card");

            const title =
                card.querySelector("h3").textContent;

            const description =
                card.querySelector("p").textContent;

            const price =
                card.querySelector(".price").textContent;

            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalPrice.textContent = price;

            modal.classList.add("show");

        });

    });


    if (closeModal) {

        closeModal.addEventListener("click", function () {
            modal.classList.remove("show");
        });

    }


    if (modal) {

        modal.addEventListener("click", function (e) {

            if (e.target === modal) {
                modal.classList.remove("show");
            }

        });

    }


    /* ================= ESC CLOSE MODAL ================= */

    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape" && modal) {
            modal.classList.remove("show");
        }

    });


    /* ================= HEADER SHADOW ================= */

    window.addEventListener("scroll", function () {

        const header =
            document.querySelector(".header");

        if (window.scrollY > 20) {
            header.style.boxShadow =
                "0 4px 20px rgba(0,0,0,0.12)";
        } else {
            header.style.boxShadow =
                "0 2px 15px rgba(0,0,0,0.07)";
        }

    });


    /* ================= IMAGE ERROR HANDLING ================= */

    const images = document.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener("error", function () {

            image.style.display = "none";

            const parent = image.parentElement;

            if (parent) {
                parent.style.background = "#eeeeee";
            }

        });

    });

});