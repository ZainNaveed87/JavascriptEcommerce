document.addEventListener("DOMContentLoaded", function () {
    const recentBuyers = JSON.parse(localStorage.getItem("recentbuyer")) || [];
    if (recentBuyers.length > 0) {
        const user = recentBuyers[0];
        // Show user name
        const nameElem = document.getElementById("profile-userName");
        if (nameElem && user.username) {
            nameElem.textContent = user.username;
        }
        // Show user email
        const emailElem = document.getElementById("profile-userEmail");
        if (emailElem && user.email) {
            emailElem.textContent = user.email;
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Show current user info on profile page
    const recentBuyers = JSON.parse(localStorage.getItem("recentbuyer")) || [];
    if (recentBuyers.length > 0) {
        const user = recentBuyers[0];
        const nameElem = document.getElementById("profile-userName");
        const emailElem = document.getElementById("profile-userEmail");
        if (nameElem && user.username) nameElem.textContent = user.username;
        if (emailElem && user.email) emailElem.textContent = user.email;
    }

    // Modal logic
    window.openModal = function () {
        const recentBuyers = JSON.parse(localStorage.getItem("recentbuyer")) || [];
        const user = recentBuyers[0] || {};
        document.getElementById('profile-editModal').style.display = 'flex';
        document.getElementById('profile-name').value = user.username || '';
        document.getElementById('profile-email').value = user.email || '';
    };

    window.closeModal = function () {
        const newName = document.getElementById('profile-name').value;
        const newEmail = document.getElementById('profile-email').value;
        let recentBuyers = JSON.parse(localStorage.getItem("recentbuyer")) || [];
        let buyers = JSON.parse(localStorage.getItem("buyer")) || [];

        // Update recentbuyer
        if (recentBuyers.length > 0) {
            recentBuyers[0].name = newName;
            recentBuyers[0].email = newEmail;
            // username bhi update kar dein agar aap username use kar rahe hain
            recentBuyers[0].username = newName;
            localStorage.setItem("recentbuyer", JSON.stringify(recentBuyers));
        }

        // Update buyer array (find by email or id)
        if (buyers.length > 0 && recentBuyers.length > 0) {
            // Find user in buyers array by email (ya kisi unique id se)
            const idx = buyers.findIndex(b => b.email === recentBuyers[0].email);
            if (idx !== -1) {
                buyers[idx].name = newName;
                buyers[idx].email = newEmail;
                buyers[idx].username = newName;
                localStorage.setItem("buyer", JSON.stringify(buyers));
            }
        }

        // Update UI
        document.getElementById('profile-userName').textContent = newName;
        document.getElementById('profile-userEmail').textContent = newEmail;
        document.getElementById('profile-editModal').style.display = 'none';
    };
});
document.addEventListener("DOMContentLoaded", function () {
    // Fetch and show image from localStorage
    const recentBuyers = JSON.parse(localStorage.getItem("recentbuyer")) || [];
    if (recentBuyers.length > 0 && recentBuyers[0].profileImage) {
        const imgElem = document.getElementById("profile-img-preview");
        if (imgElem) {
            imgElem.src = recentBuyers[0].profileImage;
        }
    }
});

// Image upload and save to localStorage
function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function () {
        // Show image in UI
        const imgElem = document.getElementById("profile-img-preview");
        if (imgElem) {
            imgElem.src = reader.result;
        }
        // Save image in recentbuyer array in localStorage
        let recentBuyers = JSON.parse(localStorage.getItem("recentbuyer")) || [];
        if (recentBuyers.length > 0) {
            recentBuyers[0].profileImage = reader.result;
            localStorage.setItem("recentbuyer", JSON.stringify(recentBuyers));
        }
    };
    reader.readAsDataURL(file);
}


function add_to_cart(productIndex) {
    let recentBuyers = JSON.parse(localStorage.getItem("recentbuyer")) || [];
    if (recentBuyers.length == 0) {
        alert("Please login to add items to cart");
        window.location.href = "../../Desktop/JavascriptEcommerce/login.html";
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

document.addEventListener("DOMContentLoaded", function () {
    updateCartIcon();
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

document.addEventListener("DOMContentLoaded", function () {
    updateUserProfileIcon();
});
document.addEventListener("DOMContentLoaded", function () {
    // Show order count for current user
    const ordersElem = document.getElementById("orders_number");
    const recentBuyers = JSON.parse(localStorage.getItem("recentbuyer")) || [];
    const finalCheckout = JSON.parse(localStorage.getItem("finalCheckout"));
    if (ordersElem && recentBuyers.length > 0 && finalCheckout) {
        const userEmail = recentBuyers[0].email;
        // Check if this order belongs to the current user
        if (finalCheckout.billingDetails && finalCheckout.billingDetails.email === userEmail) {
            ordersElem.innerHTML = `<span>1</span> Orders`;
        } else {
            ordersElem.innerHTML = `<span>0</span> Orders`;
        }
    }
});