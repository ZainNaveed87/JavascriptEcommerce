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