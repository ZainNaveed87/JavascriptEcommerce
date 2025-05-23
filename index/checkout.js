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
});