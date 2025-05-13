function Add_Category() {
    var category = document.getElementById("category");
    var email_label = document.getElementById("email_label"); // Ensure this element exists

    // Validate input
    if (!category.value.trim()) {
        alert("Please enter a valid category.");
        return;
    }

    var existingCategories = JSON.parse(localStorage.getItem("categories")) || [];

    var user = {
        category: category.value.trim().toLowerCase(), // Normalize input
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
        category.value = ""; // Clear input field
        email_label.innerHTML = ""; // Clear error message

        // Re-render the table
        renderTable();
    }
}

// Function to render table rows
function renderTable() {
    const tableBody = document.querySelector("#category_table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

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

// Function to edit a category
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

// Function to delete a category
function deleteRow(index) {
    var existingCategories = JSON.parse(localStorage.getItem("categories")) || [];

    if (confirm("Are you sure you want to delete this category?")) {
        existingCategories.splice(index, 1);
        localStorage.setItem("categories", JSON.stringify(existingCategories));
        alert("Category deleted successfully!");
        renderTable();
    }
}

// Initial render
renderTable();