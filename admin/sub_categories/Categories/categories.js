function Add_Category() {
    var category = document.getElementById("category");
    var email_label = document.getElementById("email_label");
    var imageInput = document.getElementById("Product_Image");

    if (!category.value.trim()) {
        alert("Please enter a valid category.");
        return;
    }

    var existingCategories = JSON.parse(localStorage.getItem("categories")) || [];

    var user = {
        category: category.value.trim().toLowerCase(),
        image: "" // image property add ki
    };

    var IsCategoryExist = existingCategories.some(function (existingCategory) {
        return existingCategory.category === user.category;
    });

    if (IsCategoryExist) {
        email_label.innerHTML = "Category already exists";
        email_label.style.color = "red";
    } else {
        // Agar image select ki gayi hai to usko read karo
        if (imageInput && imageInput.files && imageInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                user.image = event.target.result;
                existingCategories.push(user);
                localStorage.setItem("categories", JSON.stringify(existingCategories));
                alert("Category added successfully!");
                category.value = "";
                imageInput.value = "";
                email_label.innerHTML = "";
                renderTable();
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            existingCategories.push(user);
            localStorage.setItem("categories", JSON.stringify(existingCategories));
            alert("Category added successfully!");
        
        }
    }
}

