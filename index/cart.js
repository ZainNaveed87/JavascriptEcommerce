function updateCartIcon() {
    var cart_icon = document.getElementById("cart_icon");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart_icon) {
        cart_icon.innerHTML = `${cart.length}`;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateCartIcon();
});
updateCartIcon();


function cart_products() {
    var cartproducts = document.getElementById("cart_products");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length != 0) {
        // Table header
        cartproducts.innerHTML = `
            <table class="cart-table" style="width:100%; border-collapse:collapse;">
              
                <tbody id="cart-table-body"></tbody>
            </table>
        `;
        let tbody = document.getElementById("cart-table-body");
        cart.forEach(product => {
            tbody.innerHTML += `
                <tr>
                    <td>
                        <div class="cart-product-details">
                            <img class="cart-product-image" src="${product.image}" alt="product">
                            <div>
                                <h1 class="cart-product-name-head">${product.name}</h1>
                                <p class="cart-product-name-para">Product Description</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="cart-product-price">
                            <h1 class="cart-product-cart-price">Rs. ${product.price}</h1>
                        </div>
                    </td>
                    <td>
                        <div class="cart-product-quantity">
                            <button class="qty-btn" onclick="decreaseQty(this)">-</button>
                            <input type="number" value="1" min="1" max="100" class="qty-input">
                            <button class="qty-btn" onclick="increaseQty(this)">+</button>
                        </div>
                    </td>
                    <td>
                        <div class="cart-product-subtotal">
                            <h1 class="cart-subtotal">Rs. ${product.price}</h1>
                        </div>
                    </td>
                </tr>
            `;
        });
    } else {
        cartproducts.innerHTML = "<p>Your cart is empty.</p>";
    }
}
cart_products();
updateSubtotalAll();

function clear_cart() {
    localStorage.removeItem("cart");
    cart_products();
    updateCartIcon();
}

function increaseQty(btn) {
    const input = btn.parentElement.querySelector('.qty-input');
    let value = parseInt(input.value) || 1;
    if (input.max && value >= parseInt(input.max)) return;
    input.value = value + 1;
    updateSubtotalAll();
}

function decreaseQty(btn) {
    const input = btn.parentElement.querySelector('.qty-input');
    let value = parseInt(input.value) || 1;
    if (input.min && value <= parseInt(input.min)) return;
    input.value = value - 1;
    updateSubtotalAll();
}

function updateSubtotal(button) {
    let row = button.closest('tr');
    let price = parseInt(row.querySelector('.cart-product-cart-price').textContent.replace(/\D/g, ''));
    let qty = parseInt(row.querySelector('.qty-input').value);
    let subtotal = price * qty;
    row.querySelector('.cart-subtotal').textContent = `Rs. ${subtotal}`;
}

function subtotal() {

}

function updateSubtotalAll() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let rows = document.querySelectorAll("#cart_products .cart-product-quantity .qty-input");
    let total = 0;

    rows.forEach((input, idx) => {
        let qty = parseInt(input.value) || 1;
        let price = cart[idx]?.price || 0;
        total += qty * price;
    });

    document.getElementById("subtotal").textContent = total;
    document.getElementById("full_total").textContent = total; // Default
}

function coupon() {
    let coupon = document.getElementById("coupon").value;

}

function applyCoupon() {
    const code = document.getElementById("coupon_input").value.trim();
    if (!code) {
        alert("Please enter a coupon code.");
        return;
    }
    const coupons = JSON.parse(localStorage.getItem("coupons")) || [];
    const found = coupons.find(c => c.couponName && c.couponName.toLowerCase() === code.toLowerCase());
    if (!found) {
        alert("Invalid coupon code!");
        return;
    }
    const subtotal = parseInt(document.getElementById("subtotal").textContent) || 0;
    const percent = parseInt(found.discount); // "10%" => 10
    const discount = Math.round(subtotal * (percent / 100));
    const total = subtotal - discount;

    // Show coupon discount row
    document.getElementById("coupon_discount_row").style.display = "flex";
    document.getElementById("coupon_label").textContent = `Coupon (${found.couponName.toUpperCase()} )`;
    document.getElementById("coupon_discount").textContent = discount;

    // Update total
    document.getElementById("full_total").textContent = total;
    alert(`Coupon applied! You got ${percent}% off.`);
}