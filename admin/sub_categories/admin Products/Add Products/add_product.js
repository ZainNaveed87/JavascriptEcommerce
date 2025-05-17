document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addProductForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("Product_Name").value;
        const price = document.getElementById("Product_Price").value;
        const description = document.getElementById("Product_Description").value;
        const quantity = document.getElementById("Product_Quantity").value;
        const category = document.getElementById("Product_Category").value;
        const imageInput = document.getElementById("Product_Image");
        let image = "";

        if (imageInput && imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (event) {
                image = event.target.result;
                saveProduct({ name, price, description, quantity, category, image });
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            saveProduct({ name, price, description, quantity, category, image });
        }
    });

    function saveProduct(product) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        alert("Product added successfully!");
        form.reset();
    }
});

