document.addEventListener("DOMContentLoaded", function () {

    /* ================= MOBILE MENU ================= */

    const menuBtn = document.querySelector(".sectioncol-3 .menu");
    const navigation = document.querySelector(".sectioncol-2");

    if (menuBtn && navigation) {
        menuBtn.addEventListener("click", function () {
            navigation.classList.toggle("active");
        });
    }


    /* ================= CART ELEMENTS ================= */

    const cartSidebar = document.querySelector(".cart-sidebar");
    const cartOverlay = document.querySelector(".cart-overlay");
    const closeCart = document.querySelector(".close-cart");
    const cartItemsContainer = document.querySelector(".cart-items");
    const emptyCart = document.querySelector(".empty-cart");
    const totalPrice = document.querySelector(".total-price");

    let cart = [];


    /* ================= OPEN CART ================= */

    function openCart() {
        if (cartSidebar) {
            cartSidebar.classList.add("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.add("active");
        }

        document.body.style.overflow = "hidden";
    }


    /* ================= CLOSE CART ================= */

    function closeCartSidebar() {
        if (cartSidebar) {
            cartSidebar.classList.remove("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }

        document.body.style.overflow = "";
    }


    if (closeCart) {
        closeCart.addEventListener("click", closeCartSidebar);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener("click", closeCartSidebar);
    }


    /* ================= CART ICON ================= */

    const cartIcon = document.querySelector(
        '.sectioncol-3 img[src*="bag-shopping"]'
    );

    if (cartIcon) {
        cartIcon.style.cursor = "pointer";

        cartIcon.addEventListener("click", function () {
            openCart();
        });
    }


    /* ================= BUY NOW BUTTONS ================= */

    const buyButtons = document.querySelectorAll(".watch-btn");

    buyButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const card = button.closest(".watch-box");

            if (!card) return;

            const nameElement = card.querySelector("h2");
            const priceElement = card.querySelector(".watch-price");
            const imageElement = card.querySelector(".watch-image img");

            const name = nameElement
                ? nameElement.textContent.trim()
                : "Watch";

            const priceText = priceElement
                ? priceElement.textContent.trim()
                : "Rs. 0";

            const image = imageElement
                ? imageElement.getAttribute("src")
                : "";

            const price = parseInt(
                priceText.replace(/[^0-9]/g, "")
            ) || 0;


            /* Check if already exists */

            const existingProduct = cart.find(
                product => product.name === name
            );

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

            renderCart();
            openCart();

        });

    });


    /* ================= RENDER CART ================= */

    function renderCart() {

        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {

            if (emptyCart) {
                emptyCart.style.display = "block";
            }

            if (totalPrice) {
                totalPrice.textContent = "Rs. 0";
            }

            return;
        }


        if (emptyCart) {
            emptyCart.style.display = "none";
        }


        let total = 0;


        cart.forEach(function (product, index) {

            const productTotal =
                product.price * product.quantity;

            total += productTotal;


            const productElement =
                document.createElement("div");

            productElement.className = "cart-product";

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">

                <div class="cart-product-info">
                    <h4>${product.name}</h4>

                    <div class="cart-product-price">
                        Rs. ${product.price.toLocaleString()}
                    </div>

                    <div style="
                        margin-top:8px;
                        display:flex;
                        align-items:center;
                        gap:8px;
                    ">
                        <button 
                            class="quantity-btn"
                            data-index="${index}"
                            data-action="minus"
                            style="
                                width:25px;
                                height:25px;
                                border:1px solid #ccc;
                                background:#fff;
                                cursor:pointer;
                            ">
                            -
                        </button>

                        <span>${product.quantity}</span>

                        <button 
                            class="quantity-btn"
                            data-index="${index}"
                            data-action="plus"
                            style="
                                width:25px;
                                height:25px;
                                border:1px solid #ccc;
                                background:#fff;
                                cursor:pointer;
                            ">
                            +
                        </button>
                    </div>
                </div>

                <button 
                    class="remove-cart"
                    data-index="${index}">
                    Remove
                </button>
            `;

            cartItemsContainer.appendChild(productElement);

        });


        if (totalPrice) {
            totalPrice.textContent =
                "Rs. " + total.toLocaleString();
        }


        /* ================= REMOVE PRODUCT ================= */

        const removeButtons =
            document.querySelectorAll(".remove-cart");

        removeButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(button.dataset.index);

                cart.splice(index, 1);

                renderCart();

            });

        });


        /* ================= QUANTITY BUTTONS ================= */

        const quantityButtons =
            document.querySelectorAll(".quantity-btn");

        quantityButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(button.dataset.index);

                const action =
                    button.dataset.action;


                if (action === "plus") {

                    cart[index].quantity += 1;

                }


                if (action === "minus") {

                    cart[index].quantity -= 1;

                    if (cart[index].quantity <= 0) {
                        cart.splice(index, 1);
                    }

                }

                renderCart();

            });

        });

    }


    /* ================= CHECKOUT ================= */

    const checkoutBtn =
        document.querySelector(".checkout-btn");

    if (checkoutBtn) {

        checkoutBtn.addEventListener("click", function () {

            if (cart.length === 0) {

                alert("Your cart is empty!");

                return;

            }

            alert(
                "Thank you for your order!\n\n" +
                "Your total is " +
                totalPrice.textContent
            );

        });

    }


    /* ================= SEARCH ICON ================= */

    const searchIcon = document.querySelector(
        '.sectioncol-3 img[src*="sistrix"]'
    );

    if (searchIcon) {

        searchIcon.addEventListener("click", function () {

            const searchTerm =
                prompt("What watch are you looking for?");

            if (searchTerm && searchTerm.trim() !== "") {

                const term =
                    searchTerm.toLowerCase().trim();

                const products =
                    document.querySelectorAll(".watch-box");

                let found = false;

                products.forEach(function (product) {

                    const title =
                        product.querySelector("h2");

                    if (!title) return;

                    const name =
                        title.textContent.toLowerCase();

                    if (name.includes(term)) {

                        product.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                        product.style.outline =
                            "3px solid #9c7c38";

                        setTimeout(function () {
                            product.style.outline = "";
                        }, 2500);

                        found = true;
                    }

                });

                if (!found) {
                    alert(
                        "Sorry, no watch found for: " +
                        searchTerm
                    );
                }

            }

        });

    }


    /* ================= USER ICON ================= */

    const userIcon = document.querySelector(
        '.sectioncol-3 img[src*="user-solid"]'
    );

    if (userIcon) {

        userIcon.addEventListener("click", function () {

            alert(
                "Customer Account\n\n" +
                "Login / Register feature can be connected here."
            );

        });

    }


    /* ================= ESC KEY ================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeCartSidebar();
        }

    });

});