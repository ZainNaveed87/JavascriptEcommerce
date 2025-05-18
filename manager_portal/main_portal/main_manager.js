window.onload = function () {



    var users = JSON.parse(localStorage.getItem("user")) || [];
    var cards = document.getElementById("cards");

    if (!cards) {
        console.log("Element with id 'cards' not found in the DOM.");
    } else {
        if (users.length === 0) {
        } else {
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                var card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <div class="cards">
                        <img src="./user.png" class="user_image" alt=""> <br>
                        <h2 class="user_name">Name : <span>${user.username}</span></h2><br>
                        <h2 class="user_gender">Gender : <span>${user.gender || "N/A"}</span></h2><br>
                        <h2 class="user_region">Email : <span>${user.email || "N/A"}</span></h2><br>
                        <h2 class="user_status">Status : <span>${user.seller_or_buyer || "N/A"}</span></h2><br>
                        <button class="User_delete" data-index="${i}">Delete</button><br>
                        <button class="User_edit" data-index="${i}">Edit</button>
                    </div>
                `;
                cards.appendChild(card);
            }
        }
    }

    var deleteButtons = document.getElementsByClassName("User_delete");
    for (var j = 0; j < deleteButtons.length; j++) {
        deleteButtons[j].addEventListener("click", function () {
            var index = this.getAttribute("data-index");
            if (confirm("Are you sure you want to delete this user?")) {
                users.splice(index, 1);
                localStorage.setItem("user", JSON.stringify(users));
                location.reload();
            }
        });
    }

    var editButtons = document.getElementsByClassName("User_edit");
    for (var k = 0; k < editButtons.length; k++) {
        editButtons[k].addEventListener("click", function () {
            var index = this.getAttribute("data-index");

            var newUsername = prompt("Enter new username:", users[index].username);
            var newEmail = prompt("Enter new email:", users[index].email);

            if (newUsername !== null && newEmail !== null) {
                users[index].username = newUsername;
                users[index].email = newEmail;

                localStorage.setItem("user", JSON.stringify(users));
                alert("User updated successfully!");
                location.reload();
            } else {
                alert("Edit cancelled or empty value.");
            }
        });
    }


    var seller = JSON.parse(localStorage.getItem("seller")) || [];
    var cards = document.getElementById("cards");

    if (!cards) {
        console.log("Element with id 'cards' not found in the DOM.");
    } else {
        if (seller.length === 0) {
            cards.innerHTML = "<p>No users found.</p>";
        } else {
            for (var i = 0; i < seller.length; i++) {
                var user = seller[i];
                var card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <div class="cards">
                        <img src="./user.png" class="user_image" alt=""> <br>
                        <h2 class="user_name">Name : <span>${user.username}</span></h2><br>
                        <h2 class="user_gender">Gender : <span>${user.gender || "N/A"}</span></h2><br>
                        <h2 class="user_region">Email : <span>${user.email || "N/A"}</span></h2><br>
                        <h2 class="user_status">Status : <span>${user.seller_or_buyer || "N/A"}</span></h2><br>
                        <button class="User_delete" data-index="${i}">Delete</button><br>
                        <button class="User_edit" data-index="${i}">Edit</button>
                    </div>
                `;
                cards.appendChild(card);
            }
        }
    }

    var deleteButtons = document.getElementsByClassName("User_delete");
    for (var j = 0; j < deleteButtons.length; j++) {
        deleteButtons[j].addEventListener("click", function () {
            var index = this.getAttribute("data-index");
            if (confirm("Are you sure you want to delete this user?")) {
                users.splice(index, 1);
                localStorage.setItem("seller", JSON.stringify(seller));
                location.reload();
                return false;
            }
        });
    }

    var editButtons = document.getElementsByClassName("User_edit");
    for (var k = 0; k < editButtons.length; k++) {
        editButtons[k].addEventListener("click", function () {
            var index = this.getAttribute("data-index");

            var newUsername = prompt("Enter new username:", seller[index].username);
            var newEmail = prompt("Enter new email:", seller[index].email);

            if (newUsername !== null && newEmail !== null) {
                seller[index].username = newUsername;
                seller[index].email = newEmail;

                localStorage.setItem("seller", JSON.stringify(seller));
                alert("User updated successfully!");
                location.reload();
            } else {
                alert("Edit cancelled or empty value.");
            }
        });
    }

    var managers = JSON.parse(localStorage.getItem("manager")) || [];
    var adminNameElement = document.getElementById("admin_name");

    if (managers.length > 0 && managers[0].username) {
        adminNameElement.innerHTML = `Hello, ${managers[0].username}`;
    } else {
        adminNameElement.innerHTML = "Hello, Manager";
    }

    var usercount = users.length + seller.length;
    var user_counts = document.getElementById("user_count");
    if (user_counts) {
        user_counts.innerHTML = usercount;
    } else {
        console.log("Element with id 'user_count' not found in the DOM.");
    }

    var usercount = users.length;
    var user_counts = document.getElementById("Buyer_count");
    if (user_counts) {
        user_counts.innerHTML = usercount;
    } else {
        console.log("Element with id 'user_count' not found in the DOM.");
    }


    var usercount = seller.length;
    var user_counts = document.getElementById("seller_count");
    if (user_counts) {
        user_counts.innerHTML = usercount;
    } else {
        console.log("Element with id 'user_count' not found in the DOM.");
    }




    var get_manager_for_count = JSON.parse(localStorage.getItem("manager")) || [];
    var manager_count = get_manager_for_count.length;
    var manager_counts = document.getElementById("manager_count");
    if (manager_counts) {
        manager_counts.innerHTML = manager_count;
    } else {
        console.log("Element with id 'manager_count' not found in the DOM.");
    }

    var get_manager_for_count = JSON.parse(localStorage.getItem("categories")) || [];
    var manager_count = get_manager_for_count.length;
    var manager_counts = document.getElementById("Categories_count");
    if (manager_counts) {
        manager_counts.innerHTML = manager_count;
    } else {
        console.log("Element with id 'manager_count' not found in the DOM.");
    }


    var get_coupon_for_count = JSON.parse(localStorage.getItem("coupons")) || [];
    var coupon_count = get_coupon_for_count.length;
    var coupon_counts = document.getElementById("Coupon_count");
    if (coupon_counts) {
        coupon_counts.innerHTML = coupon_count;
    } else {
        console.log("Element with id 'manager_count' not found in the DOM.");
    }


    var get_products_for_count = JSON.parse(localStorage.getItem("products")) || [];
    var products_count = get_products_for_count.length;
    var products_counts = document.getElementById("product_count");
    if (products_counts) {
        products_counts.innerHTML = products_count;
    } else {
        console.log("Element with id 'Product_count' not found in the DOM.");
    }


};




function logout() {
    var confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        window.location.href = "../../login.html";
    }

    return false;
}

function userLogout() {
    var confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        window.location.href = "../../login.html";
    }
    return false;

}
var username = document.getElementById("Username");
var email = document.getElementById("email");
var password = document.getElementById("pass");
var email_label = document.getElementById("email_label");
var username_label = document.getElementById("user_label");
var password_label = document.getElementById("pass_label");
function Add_Manager() {
    if (username.value == "" && password.value == "" && email.value == "") {
        username_label.innerHTML = "Please enter a Username";
        username_label.style.color = "red";
        password_label.innerHTML = "Please enter a password";
        password_label.style.color = "red";
        email_label.innerHTML = "Please enter an email";
        email_label.style.color = "red";
    }
    else if (username.value == "" && email.value == "") {
        username_label.innerHTML = "Please enter a Username";
        username_label.style.color = "red";
        email_label.innerHTML = "Please enter an email";
        email_label.style.color = "red";
    }
    else if (password.value == "" && email.value == "") {
        password_label.innerHTML = "Please enter a password";
        password_label.style.color = "red";
        email_label.innerHTML = "Please enter an email";
        email_label.style.color = "red";
    }
    else if (username.value == "" && password.value == "") {
        username_label.innerHTML = "Please enter a Username";
        username_label.style.color = "red";
        password_label.innerHTML = "Please enter a password";
        password_label.style.color = "red";
    }
    else if (username.value == "") {
        username_label.innerHTML = "Please enter a Username";
        username_label.style.color = "red";
    }
    else if (password.value == "") {
        password_label.innerHTML = "Please enter a password";
        password_label.style.color = "red";
    }
    else if (email.value == "") {
        email_label.innerHTML = "Please enter an email";
        email_label.style.color = "red";
    }
    else if (email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
        email_label.innerHTML = "Please enter a valid email address";
        email_label.style.color = "red";
    }
    else if (password.value.length < 6) {
        password_label.innerHTML = "Password must be at least 6 characters long";
        password_label.style.color = "red";
    }
    else if (username.value.length < 3) {
        username_label.innerHTML = "Username must be at least 3 characters long";
        username_label.style.color = "red";
    }
    else {
        var existingUsers = JSON.parse(localStorage.getItem("manager")) || [];

        var user = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        var IsEmailExist = existingUsers.some(function (existingUsers) {
            return existingUsers.email === user.email
        }
        )


        if (IsEmailExist) {
            email_label.innerHTML = "Email already exists";
            email_label.style.color = "red";
        }
        else {



            existingUsers.push(user);
            localStorage.setItem("manager", JSON.stringify(existingUsers));
            alert("Registration successful");
            window.location.href = "manager.html";

        }
    }
}

function Change_icon() {
    var password = document.getElementById("pass");
    var icon = document.getElementById("eye_icon");

    if (password.type === "password") {
        password.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        password.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }


}