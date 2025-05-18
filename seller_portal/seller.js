 var managers = JSON.parse(localStorage.getItem("seller")) || [];
    var adminNameElement = document.getElementById("admin_name");

    if (managers.length > 0 && managers[0].username) {
        adminNameElement.innerHTML = `Hello, ${managers[0].username}`;
    } else {
        adminNameElement.innerHTML = "Hello, Admin";
    }
        var currentSeller = JSON.parse(localStorage.getItem("currentSeller")) || {};
    var adminNameElement = document.getElementById("admin_name");
    if (currentSeller && currentSeller.username) {
        adminNameElement.innerHTML = `Hello, ${currentSeller.username}`;
    } else {
        adminNameElement.innerHTML = "Hello, Seller";
    }
    var currentSeller = JSON.parse(localStorage.getItem("currentSeller")) || {};
var adminNameElement = document.getElementById("admin_name");
if (currentSeller && currentSeller.username) {
    adminNameElement.innerHTML = `Hello, ${currentSeller.username}`;
} else {
    adminNameElement.innerHTML = "Hello, Seller";
}

// Show current seller's product count
var products = JSON.parse(localStorage.getItem("products")) || [];
var sellerProducts = products.filter(
    p => p.sellerName === currentSeller.username
);
var productCountElement = document.getElementById("products_count");
if (productCountElement) {
    productCountElement.innerHTML = sellerProducts.length;
}
  function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("currentSeller");
        window.location.href = "../login.html";
    }
}