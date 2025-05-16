document.addEventListener("DOMContentLoaded", function () {
    displayProducts();

    function displayProducts() {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const container = document.getElementById("productCardsContainer");
        container.innerHTML = ""; 
        products.forEach((product) => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.style.border = "1px solid #ccc";
            card.style.padding = "15px";
            card.style.margin = "10px";
            card.style.width = "250px";

           card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <div class="product-card-content">
        <h3>${product.name}</h3>
        <div class="product-desc">${product.description}</div>
        <div class="product-qty"><strong>Quantity:</strong> ${product.quantity}</div>
        <div class="product-price">Rs. ${product.price}</div>
    </div>
`;

            container.appendChild(card);
        });
    }
});
