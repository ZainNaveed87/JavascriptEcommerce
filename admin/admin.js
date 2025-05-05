window.onload = function () {
    var adminName = localStorage.getItem("adminName");
    if (adminName) {
        document.getElementById("admin_name").innerHTML = `Hello ${adminName}`;
    }

    var users = JSON.parse(localStorage.getItem("user")) || [];
    var cards = document.getElementById("cards");

    if (!cards) {
        console.error("Element with id 'cards' not found in the DOM.");
        return;
    }

    if (users.length === 0) {
        cards.innerHTML = "<p>No users found.</p>";
        return;
    }

    // ✅ STEP 1: Make Cards
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
                <h2 class="user_status">Status : <span>${user.status || "Active"}</span></h2><br>
                <button class="User_delete" data-index="${i}">Delete</button><br>
                <button class="User_edit" data-index="${i}">Edit</button>
            </div>
        `;
        cards.appendChild(card);
    }

    // ✅ STEP 2: Attach Delete Events
    var deleteButtons = document.getElementsByClassName("User_delete");
    for (var j = 0; j < deleteButtons.length; j++) {
        deleteButtons[j].addEventListener("click", function () {
            var index = this.getAttribute("data-index");
            if (confirm("Are you sure you want to delete this user?")) {
                users.splice(index, 1);
                localStorage.setItem("user", JSON.stringify(users));
                location.reload();
                return;
            }
        });
    }

    // ✅ STEP 3: Attach Edit Events
    var editButtons = document.getElementsByClassName("User_edit");
    for (var k = 0; k < editButtons.length; k++) {
        editButtons[k].addEventListener("click", function () {
            var index = this.getAttribute("data-index");

            // 👇 prompt values lo
            var newUsername = prompt("Enter new username:", users[index].username);
            var newEmail = prompt("Enter new email:", users[index].email);

            // 👇 null check
            if (newUsername !== null && newEmail !== null) {
                users[index].username = newUsername;
                users[index].email = newEmail;

                localStorage.setItem("user", JSON.stringify(users));
                alert("User updated successfully!");
                location.reload();
                return;
            } else {
                alert("Edit cancelled or empty value.");
                return;
            }
        });
    }

   
};
function logout() {
    localStorage.removeItem("adminName");
    window.location.href = "login.html";
}

function userLogout() {
    localStorage.removeItem("userName");
    window.location.href = "https://zainnaveed87.github.io/JavascriptEcommerce/login.html";
}