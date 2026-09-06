/* =====================================================
   ALBERTO WATCHES - SEARCH JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("searchInput");

    const searchButton =
        document.getElementById("searchButton");

    const productCards =
        document.querySelectorAll(".product-card");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const noResult =
        document.getElementById("noResult");

    const resultCount =
        document.getElementById("resultCount");


    let currentCategory = "all";


    /* =================================================
       SEARCH FUNCTION
    ================================================= */

    function searchProducts() {

        const searchValue =
            searchInput.value
                .toLowerCase()
                .trim();

        let visibleProducts = 0;


        productCards.forEach(function (product) {

            const productName =
                product.dataset.name.toLowerCase();

            const productCategory =
                product.dataset.category.toLowerCase();


            const matchesSearch =
                productName.includes(searchValue) ||
                productCategory.includes(searchValue);


            const matchesCategory =
                currentCategory === "all" ||
                productCategory === currentCategory;


            if (matchesSearch && matchesCategory) {

                product.style.display = "";

                visibleProducts++;

            } else {

                product.style.display = "none";

            }

        });


        /* =================================================
           RESULT MESSAGE
        ================================================= */

        if (visibleProducts === 0) {

            noResult.style.display = "block";

            resultCount.textContent =
                "No watches found";

        } else {

            noResult.style.display = "none";

            resultCount.textContent =
                "Showing " +
                visibleProducts +
                " watch" +
                (visibleProducts > 1 ? "es" : "");

        }

    }


    /* =================================================
       LIVE SEARCH
    ================================================= */

    searchInput.addEventListener(
        "input",
        searchProducts
    );


    /* =================================================
       SEARCH BUTTON
    ================================================= */

    searchButton.addEventListener(
        "click",
        searchProducts
    );


    /* =================================================
       ENTER KEY
    ================================================= */

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchProducts();

            }

        }
    );


    /* =================================================
       CATEGORY FILTER
    ================================================= */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove("active");

                    }
                );


                button.classList.add("active");


                currentCategory =
                    button.dataset.category;


                searchProducts();

            }
        );

    });


    /* =================================================
       VIEW PRODUCT BUTTON
    ================================================= */

    const viewButtons =
        document.querySelectorAll(".view-btn");


    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const product =
                    button.closest(".product-card");

                const productName =
                    product.dataset.name;

                alert(
                    "You selected: " +
                    productName
                );

            }
        );

    });


    /* =================================================
       INITIAL RESULT
    ================================================= */

    searchProducts();

});