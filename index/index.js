document.addEventListener("DOMContentLoaded", function () {
    displayCategories();
displayProducts();
displayDeals();
    function displayCategories() {
        const categories = JSON.parse(localStorage.getItem("categories")) || [];
        const container = document.getElementById("popular_category");
        if (!container) return;
        container.innerHTML = "";
        categories.forEach((category) => {
            if (category.image && category.category) {
                const card = document.createElement("div");
                card.className = "popular-card";
                card.innerHTML = `
                    <img class="popular-card-image" src="${category.image}" alt="">
                    <div class="product-head">${category.category}</div>
                `;
                container.appendChild(card);
            }
        });
    }



    function displayProducts() {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const container = document.getElementById("recentlylaunched-product-container");
        if (!container) return;
        container.innerHTML = "";
        products.forEach((product) => {
            if (product.image && product.name) {
                const card = document.createElement("div");
                card.className = "popular-card";
                card.innerHTML = `
                    <div class="recentlylaunched-product">
                        <img src="${product.image}" alt="${product.name}" class="recentlylaunched-product-image">
                        <div class="recentlylaunched-product-head">${product.name}</div>
                        <div class="recentlylaunched-product-stars">⭐⭐⭐⭐⭐</div>
                        <div class="recentlylaunched-product-para">Price: Rs. ${product.price}</div>
                                <button class="add-to-cart-btn" onclick="add_to_cart()">Add to Cart</button>

                    </div>
                `;
                container.appendChild(card);
            }
        });
    }



    function displayDeals() {
    const products = JSON.parse(localStorage.getItem("discountedProducts")) || [];
    const container = document.getElementById("deals-row");
    if (!container) return;
    container.innerHTML = "";
    products.forEach((product) => {
        if (product.image && product.name && product.discountedPrice && product.price) {
            const card = document.createElement("div");
            card.className = "popular-card";
            card.innerHTML = `
                <div class="deals-sec1">
                    <img src="${product.image}" alt="${product.name}" class="deals-image">
                    <div class="deals-head-2">${product.name}</div>
                    <div class="deals-stars">⭐⭐⭐⭐⭐</div>
                    <div class="deals-para">
                        Price:
                        <span class="discount" style="text-decoration:line-through;color:#e53935;margin-right:8px;">
                            Rs. ${product.price}
                        </span>
                        Rs. ${product.discountedPrice}
                        ${product.discountPercent ? `<span style="color:#fff;background:#388e3c;padding:2px 8px;border-radius:6px;font-size:13px;margin-left:8px;">
                            -${product.discountPercent}%
                        </span>` : ""}
                    </div>
                </div>
            `;
            container.appendChild(card);
        }
    });
}






});



function add_to_cart()
{
        let recentBuyers = JSON.parse(localStorage.getItem("recentbuyer")) || [];

        if(recentBuyers.length == 0)
        {
            alert("Please login to add items to cart");
            window.location.href = "../../Desktop/JavascriptEcommerce/login.html";
            return;
        }
        else
        {
            alert("Item added to cart");
        }
}