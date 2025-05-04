var email = document.getElementById("email");
var password = document.getElementById("pass");
var email_label = document.getElementById("email_label");
var username_label = document.getElementById("user_label");
var password_label = document.getElementById("pass_label");
var admin_email = "admin@gmail.com"
var admin_password = "admin123";

function login() {
    if (  password.value == "" && email.value == "") {
        password_label.innerHTML = "Please enter a password";
        password_label.style.color = "red";
        email_label.innerHTML = "Please enter an email";
        email_label.style.color = "red";
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

    else if (email.value == admin_email && password.value == admin_password) {
var code = "123456789"
var name1 = "zain"
var name2 = "brhamdagh"
var input_code = prompt("Enter The Code Of Admin Panel")
var input_name = prompt("Enter The Name Of Admin Panel")

if (code == input_code && (name1 == input_name || name2 == input_name)) {
    localStorage.setItem("adminName", input_name);
    alert("Login successful as admin!");
    window.location.href = "./admin.html";
    
}

    else
    {
        alert("Itna Assan Nhi He Jani Hack Krna")
    }
}

    else
    {
        var existingUsers = JSON.parse(localStorage.getItem("user")) || [];
        var userFound = existingUsers.some(function(user) {
            return user.email === email.value && user.password === password.value;
        });

        if (userFound) {
            alert("Login successful!");
            window.location.href = "./index.html";
        } else {
            alert("Invalid email or password. Please try again.");
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


