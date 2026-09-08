document.addEventListener("DOMContentLoaded", function () {
/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.querySelector(".sectioncol-3 .menu");
const nav = document.querySelector(".sectioncol-2");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
        nav.classList.toggle("active");
    });
}


/* =========================
   GENERATE PURCHASE YEARS
========================= */

const yearSelect = document.getElementById("year");

if (yearSelect) {

    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1950; year--) {

        const option = document.createElement("option");

        option.value = year;
        option.textContent = year;

        yearSelect.appendChild(option);
    }
}


/* =========================
   ELEMENTS
========================= */

const form = document.getElementById("appraisalForm");

const brand = document.getElementById("brand");
const model = document.getElementById("model");
const condition = document.getElementById("condition");
const year = document.getElementById("year");

const showBrand = document.getElementById("showBrand");
const showModel = document.getElementById("showModel");
const showCondition = document.getElementById("showCondition");
const showYear = document.getElementById("showYear");

const estimatedValue =
    document.getElementById("estimatedValue");


/* =========================
   CONDITION VALUES
========================= */

const conditionValues = {
    excellent: 1.00,
    "very-good": 0.85,
    good: 0.70,
    fair: 0.50,
    poor: 0.30
};


/* =========================
   ESTIMATE CALCULATION
========================= */

function calculateEstimate() {

    let basePrice = 50000;

    const selectedCondition =
        condition ? condition.value : "";

    const selectedYear =
        year ? parseInt(year.value) : 0;

    const currentYear =
        new Date().getFullYear();

    /*
     * Demo valuation system.
     * Replace these values with your
     * actual appraisal/price database.
     */

    if (selectedYear) {

        const age = currentYear - selectedYear;

        if (age <= 2) {
            basePrice = 150000;
        } else if (age <= 5) {
            basePrice = 120000;
        } else if (age <= 10) {
            basePrice = 90000;
        } else if (age <= 20) {
            basePrice = 70000;
        } else {
            basePrice = 50000;
        }
    }

    const multiplier =
        conditionValues[selectedCondition] || 1;

    const finalValue =
        Math.round(basePrice * multiplier);

    return finalValue;
}


/* =========================
   FORMAT CURRENCY
========================= */

function formatPKR(value) {

    return "PKR " +
        value.toLocaleString("en-PK");
}


/* =========================
   UPDATE ESTIMATE
========================= */

function updateEstimate() {

    if (brand && brand.value.trim() !== "") {
        showBrand.textContent =
            brand.value.trim();
    } else {
        showBrand.textContent = "---";
    }

    if (model && model.value.trim() !== "") {
        showModel.textContent =
            model.value.trim();
    } else {
        showModel.textContent = "---";
    }

    if (condition && condition.value !== "") {

        showCondition.textContent =
            condition.options[
                condition.selectedIndex
            ].text;

    } else {
        showCondition.textContent = "---";
    }

    if (year && year.value !== "") {
        showYear.textContent = year.value;
    } else {
        showYear.textContent = "---";
    }

    const value = calculateEstimate();

    estimatedValue.textContent =
        formatPKR(value);
}


/* =========================
   LIVE UPDATE
========================= */

if (brand) {
    brand.addEventListener("input", updateEstimate);
}

if (model) {
    model.addEventListener("input", updateEstimate);
}

if (condition) {
    condition.addEventListener("change", updateEstimate);
}

if (year) {
    year.addEventListener("change", updateEstimate);
}


/* =========================
   IMAGE UPLOAD PREVIEW
========================= */

const imageInput =
    document.getElementById("watchImages");

const imagePreview =
    document.getElementById("imagePreview");

if (imageInput && imagePreview) {

    imageInput.addEventListener("change", function () {

        imagePreview.innerHTML = "";

        const files = Array.from(this.files);

        files.forEach(function (file) {

            if (!file.type.startsWith("image/")) {
                return;
            }

            const reader = new FileReader();

            reader.onload = function (event) {

                const preview =
                    document.createElement("div");

                preview.className =
                    "preview-item";

                preview.innerHTML = `
                    <img src="${event.target.result}" alt="Watch Preview">
                    <button type="button" class="remove-image">×</button>
                `;

                const removeBtn =
                    preview.querySelector(".remove-image");

                removeBtn.addEventListener(
                    "click",
                    function () {
                        preview.remove();
                    }
                );

                imagePreview.appendChild(preview);
            };

            reader.readAsDataURL(file);
        });
    });
}


/* =========================
   FORM SUBMIT
========================= */

if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const brandValue =
            brand.value.trim();

        const modelValue =
            model.value.trim();

        const conditionValue =
            condition.value;

        const yearValue =
            year.value;

        if (
            brandValue === "" ||
            modelValue === "" ||
            conditionValue === "" ||
            yearValue === ""
        ) {

            alert(
                "Please complete all required watch details."
            );

            return;
        }

        const value =
            calculateEstimate();

        alert(
            "Appraisal submitted successfully!\n\n" +
            "Watch: " + brandValue + " " + modelValue +
            "\nEstimated Value: " + formatPKR(value) +
            "\n\nOur appraisal team will review your information."
        );

        form.reset();

        imagePreview.innerHTML = "";

        updateEstimate();
    });
}


/* =========================
   INPUT ERROR CLEAR
========================= */

document
    .querySelectorAll(
        ".form-group input, .form-group select, .form-group textarea"
    )
    .forEach(function (element) {

        element.addEventListener("input", function () {
            this.style.borderColor = "";
        });

        element.addEventListener("change", function () {
            this.style.borderColor = "";
        });

    });


/* =========================
   HEADER SHADOW
========================= */

const header =
    document.querySelector(".headercol-sec");

if (header) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 60) {

            header.style.boxShadow =
                "0 4px 18px rgba(0,0,0,.08)";

        } else {

            header.style.boxShadow = "none";
        }
    });
}


/* =========================
   CLOSE MOBILE MENU
========================= */

document
    .querySelectorAll(".header-text > a")
    .forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 768) {
                nav.classList.remove("active");
            }

        });

    });


// Initial state
updateEstimate();

});
