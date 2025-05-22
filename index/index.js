document.addEventListener("DOMContentLoaded", function () {
    displayCategories();
    displayProducts();
    displayDeals();
    updateCartIcon(); // Cart icon update on page load
    updateUserProfileIcon();

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
        products.forEach((product, index) => {
            if (product.image && product.name) {
                const card = document.createElement("div");
                card.className = "popular-card";
                card.innerHTML = `
                    <div class="recentlylaunched-product">
                        <img src="${product.image}" alt="${product.name}" class="recentlylaunched-product-image">
                        <div class="recentlylaunched-product-head">${product.name}</div>
                        <div class="recentlylaunched-product-stars">⭐⭐⭐⭐⭐</div>
                        <div class="recentlylaunched-product-para">Price: Rs. ${product.price}</div>
                        <button class="add-to-cart-btn" onclick="add_to_cart(${index})">Add to Cart</button>
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



function add_to_cart(productIndex) {
    let recentBuyers = JSON.parse(localStorage.getItem("recentbuyer")) || [];
    if (recentBuyers.length == 0) {
        alert("Please login to add items to cart");
        window.location.href = "../../login.html";
        return;
    } else {
        // Product fetch karo
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const product = products[productIndex];

        // Cart array me add karo
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");

        // Cart icon update karo
        updateCartIcon();
    }
}

// Cart icon update function
function updateCartIcon() {
    var cart_icon = document.getElementById("cart-icon");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart_icon) {
        cart_icon.innerHTML = `${cart.length}`;
    }
}

function updateUserProfileIcon() {
    const userContainer = document.getElementById("user-profile-container");
    const recentBuyers = JSON.parse(localStorage.getItem("recentbuyer")) || [];
    if (!userContainer) return;

    // Get uploaded image from recentbuyer, fallback to dummy if not available
    const profileImage =
        (recentBuyers.length > 0 && recentBuyers[0].profileImage)
            ? recentBuyers[0].profileImage
            : "https://ui-avatars.com/api/?name=User&background=388e3c&color=fff&rounded=true&size=64";

    if (recentBuyers.length > 0) {
        userContainer.innerHTML = `
            <div class="profile-dropdown">
                <img src="${profileImage}" class="profile-circle" id="profile-img" alt="Profile" />
                <div class="logout-btn" id="logout-btn" style="display:none;">Logout</div>
            </div>
        `;

        const dropdown = userContainer.querySelector('.profile-dropdown');
        const logoutBtn = document.getElementById("logout-btn");
        const profileImg = document.getElementById("profile-img");
        let hideTimeout;

        // Profile image click event
        profileImg.addEventListener('click', function () {
            window.location.href = "./index/profile/profile.html";
        });

        // Show logout on hover
        dropdown.addEventListener('mouseover', () => {
            clearTimeout(hideTimeout);
            logoutBtn.style.display = 'block';
        });

        dropdown.addEventListener('mouseout', (e) => {
            if (!dropdown.contains(e.relatedTarget)) {
                hideTimeout = setTimeout(() => {
                    logoutBtn.style.display = 'none';
                }, 3000); // 3 seconds
            }
        });

        logoutBtn.addEventListener('mouseover', () => {
            clearTimeout(hideTimeout);
            logoutBtn.style.display = 'block';
        });

        logoutBtn.addEventListener('mouseout', (e) => {
            if (!dropdown.contains(e.relatedTarget)) {
                hideTimeout = setTimeout(() => {
                    logoutBtn.style.display = 'none';
                }, 3000);
            }
        });

        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem("recentbuyer");
            window.location.reload();
        });
    } else {
        userContainer.innerHTML = `<a href="./login.html" id="login-link"><i class="fa-solid fa-user"></i></a>`;
    }
}


