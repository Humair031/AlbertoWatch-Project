/* =========================================================
   ALBERTO WATCHES - SEARCH PAGE JAVASCRIPT
   File: assets/js/search.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ================= ELEMENTS ================= */

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const sortSelect = document.getElementById("sortSelect");
    const productGrid = document.getElementById("productGrid");
    const products = Array.from(
        document.querySelectorAll(".search-product")
    );
    const resultCount = document.getElementById("resultCount");
    const noResult = document.getElementById("noResult");
    const resetSearch = document.getElementById("resetSearch");

    let selectedCategory = "all";


    /* =====================================================
       SEARCH + FILTER FUNCTION
       ===================================================== */

    function filterProducts() {

        const searchValue = searchInput.value
            .trim()
            .toLowerCase();

        let visibleProducts = [];


        products.forEach(function (product) {

            const name = (
                product.dataset.name || ""
            ).toLowerCase();

            const category = (
                product.dataset.category || ""
            ).toLowerCase();

            const productText = (
                product.innerText || ""
            ).toLowerCase();


            const searchMatch =
                searchValue === "" ||
                name.includes(searchValue) ||
                category.includes(searchValue) ||
                productText.includes(searchValue);


            const categoryMatch =
                selectedCategory === "all" ||
                category === selectedCategory.toLowerCase();


            if (searchMatch && categoryMatch) {

                product.style.display = "";

                visibleProducts.push(product);

            } else {

                product.style.display = "none";

            }

        });


        /* ================= SORT ================= */

        sortProducts(visibleProducts);


        /* ================= COUNT ================= */

        resultCount.textContent =
            visibleProducts.length +
            (visibleProducts.length === 1
                ? " Watch Found"
                : " Watches Found");


        /* ================= NO RESULT ================= */

        if (visibleProducts.length === 0) {

            noResult.classList.add("show");

        } else {

            noResult.classList.remove("show");

        }

    }


    /* =====================================================
       SORT PRODUCTS
       ===================================================== */

    function sortProducts(productList) {

        const sortValue = sortSelect.value;


        if (sortValue === "default") {

            return;

        }


        productList.sort(function (a, b) {

            const nameA = (
                a.dataset.name || ""
            ).toLowerCase();

            const nameB = (
                b.dataset.name || ""
            ).toLowerCase();

            const priceA = Number(
                a.dataset.price || 0
            );

            const priceB = Number(
                b.dataset.price || 0
            );


            if (sortValue === "name-asc") {

                return nameA.localeCompare(nameB);

            }


            if (sortValue === "name-desc") {

                return nameB.localeCompare(nameA);

            }


            if (sortValue === "price-low") {

                return priceA - priceB;

            }


            if (sortValue === "price-high") {

                return priceB - priceA;

            }

        });


        productList.forEach(function (product) {

            productGrid.appendChild(product);

        });

    }


    /* =====================================================
       LIVE SEARCH
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterProducts
        );

    }


    /* =====================================================
       SEARCH BUTTON
       ===================================================== */

    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            function () {

                filterProducts();

                searchInput.focus();

            }
        );

    }


    /* =====================================================
       ENTER KEY SEARCH
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    filterProducts();

                }

            }
        );

    }


    /* =====================================================
       CATEGORY FILTER
       ===================================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(function (btn) {

                    btn.classList.remove("active");

                });


                this.classList.add("active");


                selectedCategory =
                    this.dataset.category || "all";


                filterProducts();

            }
        );

    });


    /* =====================================================
       SORT CHANGE
       ===================================================== */

    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            filterProducts
        );

    }


    /* =====================================================
       RESET SEARCH
       ===================================================== */

    if (resetSearch) {

        resetSearch.addEventListener(
            "click",
            function () {

                searchInput.value = "";

                selectedCategory = "all";

                sortSelect.value = "default";


                filterButtons.forEach(function (button) {

                    button.classList.remove("active");

                });


                const allButton =
                    document.querySelector(
                        '.filter-btn[data-category="all"]'
                    );


                if (allButton) {

                    allButton.classList.add("active");

                }


                filterProducts();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuButton =
        document.querySelector(".sectioncol-3 .menu");

    const headerMenu =
        document.querySelector(".header-text");

    if (menuButton && headerMenu) {

        menuButton.addEventListener(
            "click",
            function () {

                headerMenu.classList.toggle(
                    "mobile-active"
                );

            }
        );

    }


    /* =====================================================
       MOBILE DROPDOWN
       ===================================================== */

    const dropdown =
        document.querySelector(".dropdown");

    const dropdownButton =
        document.querySelector(".dropdown-btn");

    if (dropdown && dropdownButton) {

        dropdownButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                dropdown.classList.toggle(
                    "dropdown-active"
                );

            }
        );

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER LINK CLICK
       ===================================================== */

    const menuLinks =
        document.querySelectorAll(
            ".header-text > li > a"
        );


    menuLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <= 992 &&
                    !this.classList.contains("dropdown-btn")
                ) {

                    if (headerMenu) {

                        headerMenu.classList.remove(
                            "mobile-active"
                        );

                    }

                }

            }
        );

    });


    /* =====================================================
       INITIAL LOAD
       ===================================================== */

    filterProducts();

});