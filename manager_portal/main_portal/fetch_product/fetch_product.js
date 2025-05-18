document.addEventListener("DOMContentLoaded", function () {
    displayProducts();

    function displayProducts() {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const container = document.getElementById("productCardsContainer");
        container.innerHTML = "";
        products.forEach((product, index) => {
            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <div class="product-card-content">
        <h3>${product.name}</h3>
        <div class="product-desc">${product.description}</div>
        <div class="product-qty"><strong>Quantity:</strong> ${product.quantity}</div>
        <div class="product-price">Rs. ${product.price}</div>
        <div class="product-actions" style="margin-top:14px; display:flex; gap:10px; justify-content:center;">
            <button class="edit-btn" style="padding:5px 14px; border-radius:6px; border:none; background:#1976d2; color:#fff; cursor:pointer;">Edit</button>
            <button class="delete-btn" style="padding:5px 14px; border-radius:6px; border:none; background:#e53935; color:#fff; cursor:pointer;">Delete</button>
        </div>
    </div>
`;

            // Delete functionality
            card.querySelector(".delete-btn").onclick = function () {
                if (confirm("Are you sure you want to delete this product?")) {
                    products.splice(index, 1);
                    localStorage.setItem("products", JSON.stringify(products));
                    displayProducts();
                }
            };

            // Edit functionality with image update
            card.querySelector(".edit-btn").onclick = function () {
                const newName = prompt("Edit Product Name:", product.name);
                if (newName !== null && newName.trim() !== "") product.name = newName;

                const newPrice = prompt("Edit Product Price:", product.price);
                if (newPrice !== null && newPrice.trim() !== "") product.price = newPrice;

                const newDesc = prompt("Edit Product Description:", product.description);
                if (newDesc !== null && newDesc.trim() !== "") product.description = newDesc;

                const newQty = prompt("Edit Product Quantity:", product.quantity);
                if (newQty !== null && newQty.trim() !== "") product.quantity = newQty;

                const newCategory = prompt("Edit Product Category:", product.category);
                if (newCategory !== null && newCategory.trim() !== "") product.category = newCategory;

                // Image edit: create a hidden file input
                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";
                fileInput.style.display = "none";
                document.body.appendChild(fileInput);

                fileInput.onchange = function (e) {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (event) {
                            product.image = event.target.result;
                            products[index] = product;
                            localStorage.setItem("products", JSON.stringify(products));
                            displayProducts();
                            document.body.removeChild(fileInput);
                        };
                        reader.readAsDataURL(file);
                    } else {
                        products[index] = product;
                        localStorage.setItem("products", JSON.stringify(products));
                        displayProducts();
                        document.body.removeChild(fileInput);
                    }
                };

                if (confirm("Do you want to change the product image?")) {
                    fileInput.click();
                } else {
                    products[index] = product;
                    localStorage.setItem("products", JSON.stringify(products));
                    displayProducts();
                    document.body.removeChild(fileInput);
                }
            };

            container.appendChild(card);
        });
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
