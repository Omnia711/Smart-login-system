// variables
var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

var signUpArray = JSON.parse(localStorage.getItem('users')) || [];

// check if input fields are empty
function isEmpty(value) {
    return value.trim() === "";
}

// check if the email already exists
function isEmailExist(email) {
    return signUpArray.some(function(user) {
        return user.email.toLowerCase() === email.toLowerCase();
    });
}

// signup
function signUp() {
    if (isEmpty(signupName.value) || isEmpty(signupEmail.value) || isEmpty(signupPassword.value)) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return;
    }

    var email = signupEmail.value.trim();

    if (isEmailExist(email)) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>';
    } else {
        var newUser = {
            name: signupName.value.trim(),
            email: email,
            password: signupPassword.value
        };
        signUpArray.push(newUser);
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>';
    }
}

// check if login inputs are empty
function isLoginEmpty() {
    return isEmpty(signinEmail.value) || isEmpty(signinPassword.value);
}

// login
function login() {
    if (isLoginEmpty()) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return;
    }

    var email = signinEmail.value.trim();
    var password = signinPassword.value;

    var user = signUpArray.find(function(user) {
        return user.email.toLowerCase() === email.toLowerCase() && user.password === password;
    });

    if (user) {
        localStorage.setItem('sessionUsername', user.name);
        location.replace('home.html');
    } else {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">Incorrect email or password</span>';
    }
}

// welcome page (home.html)
var sessionUsername = localStorage.getItem('sessionUsername');

if (sessionUsername) {
    var welcomeUsername = document.getElementById('username');
    welcomeUsername.textContent = 'Welcome ' + sessionUsername;
} else {
    location.replace('index.html');}

