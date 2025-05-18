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
            seller.splice(index, 1); // users ki jagah seller
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
function userLogout() {
    var confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        window.location.href = "../../../login.html";
    }
    return false;

}

var currentManager = JSON.parse(localStorage.getItem("currentManager")) || null;
var adminNameElement = document.getElementById("admin_name");

if (currentManager && currentManager.username) {
    adminNameElement.innerHTML = `Hello, ${currentManager.username}`;
} else {
    adminNameElement.innerHTML = "Hello, Manager";
}

function logout() {
    var confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        localStorage.removeItem("currentManager"); // Sirf session hatayein
        window.location.href = "../../login.html";
    }
    return false;
}