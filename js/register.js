let firstName = document.getElementById("fName");
let lastName = document.getElementById("lName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", function (myEvent) {
    myEvent.preventDefault();

    if (firstName.value === "" || lastName.value === "" || email.value === "" || password.value === "") {
        alert("Kindly, Fill in all fields...");
    }

    else {
        // Registering (Storing Data Into Local Storage)
        localStorage.setItem("lastName", lastName.value);
        localStorage.setItem("firstName", firstName.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
        alert("Account created successfully!");
        // Waiting for 1.5[s] Before Navigating to the Login Page
        setTimeout(function () { window.location = "login.html" }, 1500);
    }
});