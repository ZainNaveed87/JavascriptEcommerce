let forget_email = document.getElementById("email")
let email_label = document.getElementById("email_label")
function forgot()
{
    if (forget_email.value == "") {
        email_label.innerHTML = "Please enter an email";
        email_label.style.color = "red";
    }
    else if (forget_email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
        email_label.innerHTML = "Please enter a valid email address";
        email_label.style.color = "red";
    }
    else if (forget_email.value == "admin@gmail.com")
    {
        alert("Don't Try to hack the system")
        window.location.href = "./login.html";
    }
else
{
  


var existingUsers = JSON.parse(localStorage.getItem("user")) || [];
var userFound = existingUsers.find(function(user) {
    return user.email === forget_email.value ;
});

}

if (userFound) {
    alert(`Your Passowrd is:  ${userFound.password}`)
    window.location.href = "./login.html";
}
else {
email_label.innerHTML = "Email not found"
email_label.style.color = "red"
}
}