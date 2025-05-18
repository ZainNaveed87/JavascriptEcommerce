document.addEventListener("DOMContentLoaded", function () {
    // Get current seller info
    const currentSeller = JSON.parse(localStorage.getItem("currentSeller")) || {};
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const container = document.getElementById("productCardsContainer");
    container.innerHTML = "";

    // Filter products for this seller only
    const sellerProducts = products.filter(
        p => p.sellerName === currentSeller.username
    );

    if (sellerProducts.length === 0) {
        container.innerHTML = "<p style='color:#888;text-align:center;'>No products found for you.</p>";
        return;
    }

    sellerProducts.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width:100%;height:160px;object-fit:cover;border-radius:12px 12px 0 0;">
            <div class="product-card-content" style="padding:16px;">
                <h3 style="margin:0 0 8px 0;font-size:20px;color:#1976d2;">${product.name}</h3>
                <div class="product-desc" style="margin-bottom:8px;color:#444;">${product.description}</div>
                <div class="product-qty" style="margin-bottom:8px;"><strong>Quantity:</strong> ${product.quantity}</div>
                <div class="product-price" style="font-weight:700;color:#fff;background:#1976d2;padding:6px 14px;border-radius:8px;display:inline-block;">Rs. ${product.price}</div>
                <div class="product-actions" style="margin-top:14px; display:flex; gap:10px; justify-content:center;">
                    <button class="edit-btn" style="padding:5px 14px; border-radius:6px; border:none; background:#1976d2; color:#fff; cursor:pointer;">Edit</button>
                    <button class="delete-btn" style="padding:5px 14px; border-radius:6px; border:none; background:#e53935; color:#fff; cursor:pointer;">Delete</button>
                </div>
            </div>
        `;
        // Delete functionality
        card.querySelector(".delete-btn").onclick = function () {
            if (confirm("Are you sure you want to delete this product?")) {
                // Find the real index in the products array
                const realIndex = products.findIndex(
                    p => p.sellerName === currentSeller.username && p.name === product.name && p.price === product.price
                );
                if (realIndex !== -1) {
                    products.splice(realIndex, 1);
                    localStorage.setItem("products", JSON.stringify(products));
                    location.reload();
                }
            }
        };

        // Edit functionality (without image change)
        card.querySelector(".edit-btn").onclick = function () {
            const newName = prompt("Edit Product Name:", product.name);
            if (newName !== null && newName.trim() !== "") product.name = newName;

            const newPrice = prompt("Edit Product Price:", product.price);
            if (newPrice !== null && newPrice.trim() !== "") product.price = newPrice;

            const newDesc = prompt("Edit Product Description:", product.description);
            if (newDesc !== null && newDesc.trim() !== "") product.description = newDesc;

            const newQty = prompt("Edit Product Quantity:", product.quantity);
            if (newQty !== null && newQty.trim() !== "") product.quantity = newQty;

            // Update product in products array
            const realIndex = products.findIndex(
                p => p.sellerName === currentSeller.username && p.name === product.name && p.price === product.price
            );
            if (realIndex !== -1) {
                products[realIndex] = product;
                localStorage.setItem("products", JSON.stringify(products));
                location.reload();
            }
        };

        container.appendChild(card);
    });

    // Show current seller name in header
    var adminNameElement = document.getElementById("admin_name");
    if (currentSeller && currentSeller.username) {
        adminNameElement.innerHTML = `Hello, ${currentSeller.username}`;
    } else {
        adminNameElement.innerHTML = "Hello, Seller";
    }
});

// Logout function for seller
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("currentSeller");
        window.location.href = "../../login.html";
    }
}