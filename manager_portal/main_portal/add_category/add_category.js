function Add_Category() {
    var category = document.getElementById("category");
    var email_label = document.getElementById("email_label"); 


    if (!category.value.trim()) {
        alert("Please enter a valid category.");
        return;
    }

    var existingCategories = JSON.parse(localStorage.getItem("categories")) || [];

    var user = {
        category: category.value.trim().toLowerCase(), 
    };

    var IsCategoryExist = existingCategories.some(function (existingCategory) {
        return existingCategory.category === user.category;
    });

    if (IsCategoryExist) {
        email_label.innerHTML = "Category already exists";
        email_label.style.color = "red";
    } else {
        existingCategories.push(user);
        localStorage.setItem("categories", JSON.stringify(existingCategories));
        alert("Category added successfully!");
        category.value = ""; 
        email_label.innerHTML = ""; 

        
        renderTable();
    }
}

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