/* =====================================================
   ALBERTO WATCHES
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       ELEMENTS
    ================================================= */

    const menuBtn = document.querySelector(".menu-btn");
    const mobileMenu = document.querySelector(".sectioncol-2");
    const dropdown = document.querySelector(".dropdown");
    const dropdownToggle = document.querySelector(".dropdown-toggle");

    const cartBtn = document.querySelector(".cart-icon-btn");
    const cartSidebar = document.querySelector(".cart-sidebar");
    const cartOverlay = document.querySelector(".cart-overlay");
    const closeCart = document.querySelector(".close-cart");

    const cartItemsContainer = document.querySelector(".cart-items");
    const totalPrice = document.querySelector(".total-price");
    const cartCount = document.querySelector(".cart-count");
    const emptyCart = document.querySelector(".empty-cart");

    const checkoutBtn = document.querySelector(".checkout-btn");

    let cart = [];


    /* =================================================
       MOBILE MENU
    ================================================= */

    if (menuBtn) {

        menuBtn.addEventListener("click", function () {

            mobileMenu.classList.toggle("active");

        });

    }


    /* =================================================
       MOBILE DROPDOWN
    ================================================= */

    if (dropdownToggle) {

        dropdownToggle.addEventListener("click", function (event) {

            if (window.innerWidth <= 768) {

                event.preventDefault();

                dropdown.classList.toggle("active");

            }

        });

    }


    /* =================================================
       CLOSE MOBILE MENU WHEN LINK CLICKED
    ================================================= */

    const menuLinks = document.querySelectorAll(
        ".header-text > a:not(.dropdown-toggle)"
    );

    menuLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileMenu.classList.remove("active");

        });

    });


    /* =================================================
       CART OPEN
    ================================================= */

    if (cartBtn) {

        cartBtn.addEventListener("click", function () {

            cartSidebar.classList.add("active");
            cartOverlay.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    }


    /* =================================================
       CART CLOSE
    ================================================= */

    function closeCartSidebar() {

        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (closeCart) {

        closeCart.addEventListener("click", closeCartSidebar);

    }


    if (cartOverlay) {

        cartOverlay.addEventListener("click", closeCartSidebar);

    }


    /* =================================================
       ADD TO CART
    ================================================= */

    const addCartButtons = document.querySelectorAll(".add-cart");

    addCartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name = button.dataset.name;
            const price = Number(button.dataset.price);
            const image = button.dataset.image;

            const existingProduct = cart.find(function (item) {
                return item.name === name;
            });


            if (existingProduct) {

                existingProduct.quantity += 1;

            } else {

                cart.push({
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });

            }


            updateCart();

            cartSidebar.classList.add("active");
            cartOverlay.classList.add("active");

            document.body.style.overflow = "hidden";


            /* Button animation */

            const originalText = button.textContent;

            button.textContent = "Added ✓";

            button.style.background = "#fff";

            setTimeout(function () {

                button.textContent = originalText;
                button.style.background = "";

            }, 1000);

        });

    });


    /* =================================================
       UPDATE CART
    ================================================= */

    function updateCart() {

        cartItemsContainer.innerHTML = "";

        let total = 0;
        let quantityTotal = 0;


        if (cart.length === 0) {

            emptyCart.classList.remove("hidden");

        } else {

            emptyCart.classList.add("hidden");

        }


        cart.forEach(function (item, index) {

            total += item.price * item.quantity;

            quantityTotal += item.quantity;


            const cartItem = document.createElement("div");

            cartItem.classList.add("cart-item");


            cartItem.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <div class="cart-item-price">
                        Rs. ${formatPrice(item.price)}
                    </div>

                    <div style="
                        color:#888;
                        font-size:11px;
                        margin-top:5px;
                    ">
                        Quantity: ${item.quantity}
                    </div>

                    <button
                        class="remove-item"
                        data-index="${index}"
                    >
                        Remove
                    </button>

                </div>

            `;


            cartItemsContainer.appendChild(cartItem);

        });


        totalPrice.textContent =
            "Rs. " + formatPrice(total);


        cartCount.textContent = quantityTotal;


        /* Remove buttons */

        const removeButtons =
            document.querySelectorAll(".remove-item");


        removeButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(button.dataset.index);

                cart.splice(index, 1);

                updateCart();

            });

        });

    }


    /* =================================================
       PRICE FORMAT
    ================================================= */

    function formatPrice(price) {

        return price.toLocaleString("en-PK");

    }


    /* =================================================
       CHECKOUT
    ================================================= */

    if (checkoutBtn) {

        checkoutBtn.addEventListener("click", function () {

            if (cart.length === 0) {

                alert("Your cart is empty!");

                return;

            }


            let message =
                "Order Summary:\n\n";


            cart.forEach(function (item) {

                message +=
                    item.name +
                    " x " +
                    item.quantity +
                    " = Rs. " +
                    formatPrice(
                        item.price * item.quantity
                    ) +
                    "\n";

            });


            let total = cart.reduce(
                function (sum, item) {

                    return sum +
                        item.price * item.quantity;

                },
                0
            );


            message +=
                "\nTotal: Rs. " +
                formatPrice(total);


            alert(message);

        });

    }


    /* =================================================
       ESC KEY
    ================================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeCartSidebar();

            mobileMenu.classList.remove("active");

            dropdown.classList.remove("active");

        }

    });


    /* =================================================
       WINDOW RESIZE
    ================================================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {

            mobileMenu.classList.remove("active");
            dropdown.classList.remove("active");

        }

    });


    /* =================================================
       INITIAL CART
    ================================================= */

    updateCart();

});

