document.addEventListener("DOMContentLoaded", function () {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const container = document.getElementById("shop-products"); // <div id="shop-products"></div> in HTML

    container.innerHTML = ""; // Clear previous

    products.forEach((product, idx) => {
        const card = document.createElement("div");
        card.className = "product-card";
    });
});

d