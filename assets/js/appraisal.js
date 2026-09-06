const appraisalForm = document.getElementById("appraisalForm");
const successMessage = document.getElementById("successMessage");

appraisalForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const brand = document.getElementById("brand").value;
    const condition = document.getElementById("condition").value;

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        brand === "" ||
        condition === ""
    ) {
        alert("Please fill all required fields.");
        return;
    }

    successMessage.style.display = "block";

    appraisalForm.reset();

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});