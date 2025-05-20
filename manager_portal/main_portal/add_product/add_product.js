document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addProductForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("Product_Name").value;
        const price = parseFloat(document.getElementById("Product_Price").value);
        const description = document.getElementById("Product_Description").value;
        const quantity = document.getElementById("Product_Quantity").value;
        const category = document.getElementById("Product_Category").value;
        const imageInput = document.getElementById("Product_Image");
        let image = "";

        function handleDiscountAndSave(product) {
            // Prompt for discount
            const wantsDiscount = prompt("Kya aap is product par discount dena chahtay hain? (yes/no)").toLowerCase();
            if (wantsDiscount === "yes") {
                let discountPercent = prompt("Do you want to give a discount on this(e.g. 10 for 10%)");
                discountPercent = parseFloat(discountPercent);
                if (!isNaN(discountPercent) && discountPercent > 0 && discountPercent < 100) {
                    const discountAmount = Math.round((price * discountPercent) / 100);
                    const discountedPrice = price - discountAmount;
                    product.discountedPrice = discountedPrice;
                    product.discountPercent = discountPercent;

                    // Save to discountedProducts array
                    let discountedProducts = JSON.parse(localStorage.getItem("discountedProducts")) || [];
                    discountedProducts.push(product);
                    localStorage.setItem("discountedProducts", JSON.stringify(discountedProducts));
                }
            }
            saveProduct(product);
        }

        if (imageInput && imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (event) {
                image = event.target.result;
                const product = { name, price, description, quantity, category, image };
                handleDiscountAndSave(product);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            const product = { name, price, description, quantity, category, image };
            handleDiscountAndSave(product);
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
function Logout() {
    var confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        localStorage.removeItem("currentManager"); // Sirf session hatayein
        window.location.href = "../../../login.html";
    }
    return false;
}

 var currentManager = JSON.parse(localStorage.getItem("currentManager")) || null;
var adminNameElement = document.getElementById("admin_name");

if (currentManager && currentManager.username) {
    adminNameElement.innerHTML = `Hello, ${currentManager.username}`;
} else {
    adminNameElement.innerHTML = "Hello, Manager";
}
