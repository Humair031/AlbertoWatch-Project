/* =====================================================
   ALBERTO WATCHES - VINTAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       ELEMENTS
    ================================================= */

    const menuBtn =
        document.querySelector(".menu-btn");

    const mobileMenu =
        document.querySelector(".sectioncol-2");

    const dropdown =
        document.querySelector(".dropdown");

    const dropdownToggle =
        document.querySelector(".dropdown-toggle");

    const cartButton =
        document.querySelector(".cart-icon-btn");

    const cartSidebar =
        document.querySelector(".cart-sidebar");

    const cartOverlay =
        document.querySelector(".cart-overlay");

    const closeCart =
        document.querySelector(".close-cart");

    const cartItemsContainer =
        document.querySelector(".cart-items");

    const emptyCart =
        document.querySelector(".empty-cart");

    const cartCount =
        document.querySelector(".cart-count");

    const totalPrice =
        document.querySelector(".total-price");

    const checkoutButton =
        document.querySelector(".checkout-btn");


    /* =================================================
       CART
    ================================================= */

    let cart =
        JSON.parse(localStorage.getItem("albertoVintageCart")) || [];


    /* =================================================
       MOBILE MENU
    ================================================= */

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            mobileMenu.classList.toggle("active");

        });

    }


    /* =================================================
       MOBILE DROPDOWN
    ================================================= */

    if (dropdownToggle && dropdown) {

        dropdownToggle.addEventListener("click", function (event) {

            if (window.innerWidth <= 768) {

                event.preventDefault();

                event.stopPropagation();

                dropdown.classList.toggle("active");

            }

        });

    }


    /* =================================================
       MENU LINKS
    ================================================= */

    document
        .querySelectorAll(".header-text > a:not(.dropdown-toggle), .dropdown-menu a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                if (window.innerWidth <= 768) {

                    mobileMenu?.classList.remove("active");

                    dropdown?.classList.remove("active");

                }

            });

        });


    /* =================================================
       OPEN CART
    ================================================= */

    function openCart() {

        cartSidebar?.classList.add("active");

        cartOverlay?.classList.add("active");

        document.body.style.overflow = "hidden";

        renderCart();

    }


    /* =================================================
       CLOSE CART
    ================================================= */

    function closeCartSidebar() {

        cartSidebar?.classList.remove("active");

        cartOverlay?.classList.remove("active");

        document.body.style.overflow = "";

    }


    /* =================================================
       CART BUTTON
    ================================================= */

    if (cartButton) {

        cartButton.addEventListener("click", function () {

            openCart();

        });

    }


    if (closeCart) {

        closeCart.addEventListener("click", function () {

            closeCartSidebar();

        });

    }


    if (cartOverlay) {

        cartOverlay.addEventListener("click", function () {

            closeCartSidebar();

        });

    }


    /* =================================================
       ADD TO CART
    ================================================= */

    const addButtons =
        document.querySelectorAll(".add-cart");


    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const product = {

                id: Date.now(),

                name: this.dataset.name,

                price: Number(this.dataset.price),

                image: this.dataset.image

            };


            cart.push(product);


            saveCart();

            updateCart();


            /* Button animation */

            const oldText =
                this.textContent;

            this.textContent =
                "Added ✓";

            this.classList.add("added");


            setTimeout(() => {

                this.textContent =
                    oldText;

                this.classList.remove("added");

            }, 1000);

        });

    });


    /* =================================================
       SAVE CART
    ================================================= */

    function saveCart() {

        localStorage.setItem(
            "albertoVintageCart",
            JSON.stringify(cart)
        );

    }


    /* =================================================
       UPDATE CART COUNT
    ================================================= */

    function updateCart() {

        if (cartCount) {

            cartCount.textContent =
                cart.length;

        }

    }


    /* =================================================
       RENDER CART
    ================================================= */

    function renderCart() {

        if (!cartItemsContainer) {
            return;
        }


        cartItemsContainer.innerHTML = "";


        /* EMPTY CART */

        if (cart.length === 0) {

            emptyCart?.classList.add("active");

            if (totalPrice) {

                totalPrice.textContent =
                    "Rs. 0";

            }

            return;

        }


        emptyCart?.classList.remove("active");


        let total = 0;


        cart.forEach(function (item) {

            total += Number(item.price);


            const cartItem =
                document.createElement("div");

            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}">

                </div>


                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <div class="cart-item-price">
                        Rs. ${item.price.toLocaleString("en-PK")}
                    </div>

                    <button
                        class="remove-cart-item"
                        data-id="${item.id}">

                        Remove

                    </button>

                </div>

            `;


            cartItemsContainer.appendChild(cartItem);

        });


        /* TOTAL */

        if (totalPrice) {

            totalPrice.textContent =
                "Rs. " +
                total.toLocaleString("en-PK");

        }


        /* REMOVE BUTTONS */

        document
            .querySelectorAll(".remove-cart-item")
            .forEach(function (button) {

                button.addEventListener("click", function () {

                    const id =
                        Number(this.dataset.id);


                    cart =
                        cart.filter(function (item) {

                            return item.id !== id;

                        });


                    saveCart();

                    updateCart();

                    renderCart();

                });

            });

    }


    /* =================================================
       FILTER PRODUCTS
    ================================================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const products =
        document.querySelectorAll(".watch-box");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            /* Active button */

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });

            this.classList.add("active");


            const filter =
                this.dataset.filter;


            products.forEach(function (product) {

                const category =
                    product.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    product.style.display =
                        "block";

                } else {

                    product.style.display =
                        "none";

                }

            });

        });

    });


    /* =================================================
       CHECKOUT
    ================================================= */

    if (checkoutButton) {

        checkoutButton.addEventListener("click", function () {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            alert(
                "Your order is ready for checkout!"
            );

        });

    }


    /* =================================================
       CLOSE MOBILE MENU OUTSIDE
    ================================================= */

    document.addEventListener("click", function (event) {

        if (
            window.innerWidth <= 768 &&
            mobileMenu &&
            menuBtn &&
            !mobileMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            mobileMenu.classList.remove("active");

        }

    });


    /* =================================================
       ESC KEY
    ================================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeCartSidebar();

            mobileMenu?.classList.remove("active");

            dropdown?.classList.remove("active");

        }

    });


    /* =================================================
       RESIZE
    ================================================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {

            mobileMenu?.classList.remove("active");

            dropdown?.classList.remove("active");

        }

    });


    /* =================================================
       INITIAL LOAD
    ================================================= */

    updateCart();

    renderCart();

});
