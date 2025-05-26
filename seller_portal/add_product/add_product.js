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

        if (!imageInput.files || !imageInput.files[0]) {
            alert("Please select a product image.");
            imageInput.focus();
            return;
        }

        // Get current seller (last from recentseller array)
        const recentSellers = JSON.parse(localStorage.getItem("recentseller")) || [];
        const currentSeller = recentSellers.length > 0 ? recentSellers[recentSellers.length - 1] : {};

        const reader = new FileReader();
        reader.onload = function (event) {
            image = event.target.result;
            saveProduct({
                name,
                price,
                description,
                quantity,
                category,
                image,
                sellerName: currentSeller.username,
                sellerKey: currentSeller.sellerKey
            });
        };
        reader.readAsDataURL(imageInput.files[0]);
    });

    function saveProduct(product) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        alert("Product added successfully!");
        form.reset();
    }
});

// Show current seller name in header
var currentSeller = JSON.parse(localStorage.getItem("currentSeller")) || {};
var adminNameElement = document.getElementById("admin_name");
if (currentSeller && currentSeller.username) {
    adminNameElement.innerHTML = `Hello, ${currentSeller.username}`;
} else {
    adminNameElement.innerHTML = "Hello, Seller";
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("currentSeller");
        window.location.href = "../../login.html";
    }
}