let popuular_products = document.getElementById("popular");

document.addEventListener("DOMContentLoaded", function () {
    displayProducts();

    function displayProducts() {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const container = document.getElementById("productCardsContainer");
        products.forEach((product, index) => {
            popuular_products.className = "product-card";


popuular_products.innerHTML = `
<div class="popular-card">
        <img class="popular-card-image" src="${product.image}" alt="${product.name}">
        <div class="product-head">${product.name}</div>
        <div class="product-stars">Quanitity :${product.quantity}</div>
        <div class="product-para">Price: ${product.price}</div>
      </div>`;



          

            

        });
    }
});