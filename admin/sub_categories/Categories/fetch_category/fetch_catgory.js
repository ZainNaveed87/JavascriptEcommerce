window.onload = function () {
    var adminName = localStorage.getItem("adminName") || null;
    var adminNameElement = document.getElementById("admin_name");

    if (adminName) {
        adminNameElement.innerHTML = `Hello, ${adminName}`;
    } else {
        console.log("Admin name not found in localStorage.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var existingCategories = JSON.parse(localStorage.getItem("categories")) || [];
    var tableBody = document.querySelector("#category_table tbody");
    tableBody.innerHTML = "";

    existingCategories.forEach(function (item, index) {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.category}</td>
            <td>
                ${item.image ? `<img src="${item.image}" alt="Category Image" style="width:40px;height:40px;object-fit:cover;border-radius:8px;">` : "No Image"}
            </td>
            <td>
                <button class="edit" onclick="editRow(${index})">Edit</button>
                <button class="delete" onclick="deleteRow(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
});

function renderTable() {
    const tableBody = document.querySelector("#category_table tbody");
    tableBody.innerHTML = "";

    var existingCategories = JSON.parse(localStorage.getItem("categories")) || [];

    existingCategories.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.category}</td>
            <td>
                ${item.image ? `<img src="${item.image}" alt="Category Image" style="width:40px;height:40px;object-fit:cover;border-radius:8px;">` : "No Image"}
            </td>
            <td>
                <button class="edit" onclick="editRow(${index})">Edit</button>
                <button class="delete" onclick="deleteRow(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function editRow(index) {
    var existingCategories = JSON.parse(localStorage.getItem("categories")) || [];
    var categoryToEdit = existingCategories[index];

    var newCategory = prompt("Enter new category name:", categoryToEdit.category);

    if (newCategory && newCategory.trim()) {
        existingCategories[index].category = newCategory.trim().toLowerCase();
        localStorage.setItem("categories", JSON.stringify(existingCategories));
        alert("Category updated successfully!");
        renderTable();
    } else {
        alert("Invalid category name.");
    }
}

function deleteRow(index) {
    var existingCategories = JSON.parse(localStorage.getItem("categories")) || [];

    if (confirm("Are you sure you want to delete this category?")) {
        existingCategories.splice(index, 1);
        localStorage.setItem("categories", JSON.stringify(existingCategories));
        alert("Category deleted successfully!");
        renderTable();
    }
}

renderTable();
function logout() {
    var confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        localStorage.removeItem("adminName");
        window.location.href = "../../../login.html";
    }

    return false;
}