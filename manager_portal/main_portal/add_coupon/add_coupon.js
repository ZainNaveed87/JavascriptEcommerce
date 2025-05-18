function Add_Coupon() {
    var coupon = document.getElementById("coupon");
    var email_label = document.getElementById("email_label"); // Ensure this element exists

    // Validate input
    if (!coupon.value.trim()) {
        alert("Please enter a valid coupon name.");
        return;
    }

    var existingCoupons = JSON.parse(localStorage.getItem("coupons")) || [];

    var IsCouponExist = existingCoupons.some(function (existingCoupon) {
        return existingCoupon.couponName === coupon.value.trim().toLowerCase();
    });

    if (IsCouponExist) {
        email_label.innerHTML = "Coupon already exists";
        email_label.style.color = "red";
    } else {
        var discount = prompt("Enter discount percentage for this coupon:");
        if (!discount || isNaN(discount) || discount <= 0) {
            alert("Invalid discount percentage. Please try again.");
            return;
        }

        var newCoupon = {
            couponName: coupon.value.trim().toLowerCase(),
            discount: discount.trim() + "%"
        };

        existingCoupons.push(newCoupon);
        localStorage.setItem("coupons", JSON.stringify(existingCoupons));
        alert("Coupon added successfully!");
        coupon.value = ""; 
        email_label.innerHTML = ""; 

        renderTable();
    }
}

function renderTable() {
    const tableBody = document.querySelector("#category_table tbody");
    tableBody.innerHTML = ""; 

    var existingCoupons = JSON.parse(localStorage.getItem("coupons")) || [];

    existingCoupons.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.couponName}</td>
            <td>${item.discount}</td>
            <td>
                <button class="edit" onclick="editRow(${index})">Edit</button>
                <button class="delete" onclick="deleteRow(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function editRow(index) {
    var existingCoupons = JSON.parse(localStorage.getItem("coupons")) || [];
    var couponToEdit = existingCoupons[index];

    var newCouponName = prompt("Enter new coupon name:", couponToEdit.couponName);
    var newDiscount = prompt("Enter new discount percentage:", couponToEdit.discount.replace("%", ""));

    if (newCouponName && newCouponName.trim() && newDiscount && !isNaN(newDiscount) && newDiscount > 0) {
        existingCoupons[index].couponName = newCouponName.trim().toLowerCase();
        existingCoupons[index].discount = newDiscount.trim() + "%";
        localStorage.setItem("coupons", JSON.stringify(existingCoupons));
        alert("Coupon updated successfully!");
        renderTable();
    } else {
        alert("Invalid coupon name or discount percentage.");
    }
}

function deleteRow(index) {
    var existingCoupons = JSON.parse(localStorage.getItem("coupons")) || [];

    if (confirm("Are you sure you want to delete this coupon?")) {
        existingCoupons.splice(index, 1);
        localStorage.setItem("coupons", JSON.stringify(existingCoupons));
        alert("Coupon deleted successfully!");
        renderTable();
    }
}

renderTable();
function Logout() {
    var confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        window.location.href = "../../../login.html";
    }
    return false;

}
 var managers = JSON.parse(localStorage.getItem("manager")) || [];
    var adminNameElement = document.getElementById("admin_name");

    if (managers.length > 0 && managers[0].username) {
        adminNameElement.innerHTML = `Hello, ${managers[0].username}`;
    } else {
        adminNameElement.innerHTML = "Hello, Manager";
    }