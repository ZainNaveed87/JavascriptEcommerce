document.addEventListener("DOMContentLoaded", function () {
    // Cart products ko tbody me show karna
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const tbody = document.getElementById("checkout-cart-tbody");
    if (!tbody) return;

    tbody.innerHTML = ""; // Clear old rows

    cart.forEach(product => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <img src="${product.image}" alt="product image" class="product-image" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">
            </td>
            <td>${product.name}</td>
            <td>Rs: ${product.price}</td>
            <td>
                <button class="product-order-remove-btn" data-id="${product.id}">Remove</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Sab fields ki value lo
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const address = document.getElementById("address").value.trim();
        const apartment = document.getElementById("apartment").value.trim();
        const city = document.getElementById("cities").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const postcode = document.getElementById("postcode").value.trim();

        // Required fields check
        if (!firstName || !lastName || !address || !city || !email || !phone || !postcode) {
            alert("Please fill all required fields!");
            return;
        }

        // Cart products
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Subtotal & total
        const summary = JSON.parse(localStorage.getItem("checkoutSummary")) || [];
        const subtotalObj = summary.find(item => item.label === "subtotal");
        const totalObj = summary.find(item => item.label === "total");

        // Final checkout object
        const checkoutData = {
            billingDetails: {
                firstName,
                lastName,
                address,
                apartment,
                city,
                email,
                phone,
                postcode
            },
            cartProducts: cart, // array of products (with image, name, price, etc.)
            subtotal: subtotalObj ? subtotalObj.value : "",
            total: totalObj ? totalObj.value : ""
        };

        localStorage.setItem("finalCheckout", JSON.stringify(checkoutData));
        alert("Checkout data saved successfully!");
        // Yahan aap next step ya page redirect bhi kar sakte hain
    });

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("product-order-remove-btn")) {
            const id = e.target.getAttribute("data-id");
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart = cart.filter(product => product.id != id);
            localStorage.setItem("cart", JSON.stringify(cart));
            // Row ko remove karein
            e.target.closest("tr").remove();
        }
    });

    // Fetch subtotal and total from localStorage
    const summary = JSON.parse(localStorage.getItem("checkoutSummary")) || [];
    const subtotalObj = summary.find(item => item.label === "subtotal");
    const totalObj = summary.find(item => item.label === "total");

    if (subtotalObj && document.getElementById("checkout-subtotal")) {
        document.getElementById("checkout-subtotal").textContent = subtotalObj.value;
    }
    if (totalObj && document.getElementById("checkout-total")) {
        document.getElementById("checkout-total").textContent = totalObj.value;
    }

    // Autofill email from recentbuyer and make it readonly
    const recentBuyers = JSON.parse(localStorage.getItem("recentbuyer")) || [];
    if (recentBuyers.length > 0) {
        const emailElem = document.getElementById("contact-email");
        if (emailElem) {
            emailElem.value = recentBuyers[0].email || "";
            emailElem.readOnly = true;
        }
    }

    // Call updateUserProfileIcon to show profile icon
    updateUserProfileIcon();

    // Update cart badge count
    updateCartBadge();
});

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
                <div class="logout-btn" id="logout-btn">Logout</div>
            </div>
        `;

        const dropdown = userContainer.querySelector('.profile-dropdown');
        const logoutBtn = document.getElementById("logout-btn");
        const profileImg = document.getElementById("profile-img");
        let hideTimeout;

        // Profile image click event
        profileImg.addEventListener('click', function () {
            window.location.href = "./profile.html";
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

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const badge = document.querySelector('.badge-cart');
    if (badge) {
        badge.textContent = cart.length;
    }
}