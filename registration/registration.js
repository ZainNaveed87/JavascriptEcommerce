var username = document.getElementById("Username");
var email = document.getElementById("email");
var password = document.getElementById("pass");
var email_label = document.getElementById("email_label");
var username_label = document.getElementById("user_label");
var password_label = document.getElementById("pass_label");

function registration() {
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
        let seller_or_buyer = prompt("Are you a seller or buyer? (Enter 'seller' or 'buyer')").toLowerCase();
        if(seller_or_buyer == "buyer")
        {
        var existingUsers = JSON.parse(localStorage.getItem("user")) || [];

        var user = {
            username: username.value,
            email: email.value,
            password: password.value,
            seller_or_buyer: seller_or_buyer
        };
       
        var IsEmailExist = existingUsers.some(function(existingUsers)
        {
            return existingUsers.email === user.email
        }
    )
       

        if(IsEmailExist)
        {
            email_label.innerHTML = "Email already exists";
            email_label.style.color = "red"; 
        }
        else
        {

        

            existingUsers.push(user);
            localStorage.setItem("user", JSON.stringify(existingUsers));
            alert("Registration successful");
            window.location.href = "login.html";
            
    }
}
else if(seller_or_buyer == "seller")
{
    
    let seller_or_buyer = prompt("Are you a seller or buyer? (Enter 'seller' or 'buyer')").toLowerCase();
    if(seller_or_buyer == "seller")
    {
    var existingUsers = JSON.parse(localStorage.getItem("seller")) || [];

    var user = {
        username: username.value,
        email: email.value,
        password: password.value,
        seller_or_buyer: seller_or_buyer
    };
   
    var IsEmailExist = existingUsers.some(function(existingUsers)
    {
        return existingUsers.email === user.email
    }
)
   

    if(IsEmailExist)
    {
        email_label.innerHTML = "Email already exists";
        email_label.style.color = "red"; 
    }
    else
    {

    

        existingUsers.push(user);
        localStorage.setItem("seller", JSON.stringify(existingUsers));
        alert("Registration successful");
        window.location.href = "login.html";
        
}
}

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