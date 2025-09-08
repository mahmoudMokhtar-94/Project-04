let email = document.getElementById("email");
let password = document.getElementById("password");
let loginBtn = document.getElementById("loginBtn");

// Fetching Data From Local Storage
let registeredEmail = localStorage.getItem("email");
let registeredPassword = localStorage.getItem("password");

loginBtn.addEventListener("click", function (myEvent) {
    myEvent.preventDefault();
    if (email.value === "" || password.value === "") {
        alert("Kindly, Fill In All Fields");
    }
    else {
        if (email.value.trim() === registeredEmail && password.value.trim() === registeredPassword) {
            /* This means that this is a trusted user,
               So navigate him/her to the Main Page (Index.html) After 1.5 [s]
            */
            setTimeout(function () { window.location = "index.html" }, 1500);
        }
        else {
            alert("Incorrect Email or Password");
        }
    }

})