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
    var deleteButtons = document.getElementsByClassName("User_delete");
var editButtons = document.getElementsByClassName("User_edit");
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="cards">
                <img src="./user.png" class="user_image" alt=""> <br>
                <h2 class="user_name">Name : <span>${user.username}</span></h2><br>
                <h2 class="user_gender">Gender : <span>${user.gender || "N/A"}</span></h2><br>
                <h2 class="user_region">Email : <span id="email">${user.email || "N/A"}</span></h2><br>
                <h2 class="user_status">Status : <span>${user.status || "Active"}</span></h2><br>
                <button class="User_delete" data-index="${i}" >Delete</button><br>
                <button class="User_edit" >Edit</button>
            </div>
        `;
        cards.appendChild(card);

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


    for(var k = 0; k < editButtons.length; k++){
        editButtons[k].addEventListener("click", function () {
            var index = this.getAttribute("data-index");
          var edit_username = prompt("Enter new username:", users[index].username);
          var edit_email = prompt("Enter new email:", users[index].email);
          if (newUsername !== null && newEmail !== null) {
            users[index].username = newUsername;
            users[index].email = newEmail;

            // Step 6: Update localStorage
            localStorage.setItem("user", JSON.stringify(users));

            // Step 7: Page refresh
            alert("User updated successfully!");
            location.reload();
        }
        else{
            alert("Please Enter Feilds")
        }
        });
    }
};
}
