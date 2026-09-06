const yearSelect = document.getElementById("year");
        for (let year = new Date().getFullYear(); year >= 1980; year--) {
            const option = document.createElement("option");
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }

        const images = document.getElementById("watchImages");
        const preview = document.getElementById("imagePreview");

        images.addEventListener("change", function () {

            preview.innerHTML = "";

            Array.from(this.files).forEach(file => {

                const reader = new FileReader();

                reader.onload = function (e) {

                    const img = document.createElement("img");

                    img.src = e.target.result;

                    preview.appendChild(img);
                };

                reader.readAsDataURL(file);
            });

        });

        const brand = document.getElementById("brand");
        const model = document.getElementById("model");
        const condition = document.getElementById("condition");
        const year = document.getElementById("year");

        function updateEstimate() {

            document.getElementById("showBrand").textContent =
                brand.value || "---";

            document.getElementById("showModel").textContent =
                model.value || "---";

            document.getElementById("showCondition").textContent =
                condition.options[condition.selectedIndex]?.text || "---";

            document.getElementById("showYear").textContent =
                year.value || "---";

            let baseValue = 25000;

            if (condition.value === "excellent") {
                baseValue = 75000;
            } else if (condition.value === "very-good") {
                baseValue = 60000;
            } else if (condition.value === "good") {
                baseValue = 45000;
            } else if (condition.value === "fair") {
                baseValue = 30000;
            } else if (condition.value === "poor") {
                baseValue = 15000;
            }

            document.getElementById("estimatedValue").textContent =
                "PKR " + baseValue.toLocaleString();
        }

        brand.addEventListener("input", updateEstimate);
        model.addEventListener("input", updateEstimate);
        condition.addEventListener("change", updateEstimate);
        year.addEventListener("change", updateEstimate);

        document.getElementById("appraisalForm").addEventListener("submit", function(e) {

            e.preventDefault();

            alert("Your appraisal request has been submitted successfully!");

        });

        function toggleMenu() {
            document.getElementById("navLinks").classList.toggle("active");
        }

        