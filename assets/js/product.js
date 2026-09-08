// ================= MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}


// ================= SEARCH =================

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");

if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        searchBox.classList.toggle("show");

        if (searchBox.classList.contains("show")) {
            document.getElementById("searchInput").focus();
        }
    });
}


function searchProduct() {

    const searchInput =
        document.getElementById("searchInput").value.trim();

    if (searchInput === "") {
        alert("Please enter a product name.");
        return;
    }

    alert("Searching for: " + searchInput);
}


// ================= IMAGE GALLERY =================

function changeImage(element) {

    const mainImage =
        document.getElementById("mainProductImage");

    mainImage.src = element.src;

    document.querySelectorAll(".thumbnail")
        .forEach(img => {
            img.classList.remove("active-thumb");
        });

    element.classList.add("active-thumb");
}


// ================= COLOR =================

function selectColor(button, color) {

    document.querySelectorAll(".color")
        .forEach(item => {
            item.classList.remove("active-color");
        });

    button.classList.add("active-color");

    document.getElementById("selectedColor").textContent = color;
}


// ================= QUANTITY =================

let quantity = 1;

function increaseQuantity() {

    quantity++;

    document.getElementById("quantity")
        .textContent = quantity;
}


function decreaseQuantity() {

    if (quantity > 1) {
        quantity--;
    }

    document.getElementById("quantity")
        .textContent = quantity;
}


// ================= CART =================

let cartCount = 0;

function addToCart() {

    cartCount += quantity;

    document.getElementById("cartCount")
        .textContent = cartCount;

    alert(
        quantity +
        " item(s) added to your cart!"
    );
}


// ================= BUY NOW =================

function buyNow() {

    alert(
        "Thank you! Your order for " +
        quantity +
        " watch has been started."
    );
}


// ================= QUICK ADD =================

function quickAdd(productName) {

    cartCount++;

    document.getElementById("cartCount")
        .textContent = cartCount;

    alert(productName + " added to cart!");
}


// ================= TABS =================

function openTab(tabId, button) {

    document.querySelectorAll(".tab-content")
        .forEach(tab => {
            tab.classList.remove("active-content");
        });

    document.querySelectorAll(".tab")
        .forEach(tab => {
            tab.classList.remove("active-tab");
        });

    document.getElementById(tabId)
        .classList.add("active-content");

    button.classList.add("active-tab");
}


// ================= CART ICON =================

document.querySelector(".cart-icon")
    ?.addEventListener("click", () => {

        if (cartCount === 0) {
            alert("Your cart is empty.");
        } else {
            alert(
                "You have " +
                cartCount +
                " item(s) in your cart."
            );
        }

    });
