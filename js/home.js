// welcome page (home.html)
var sessionUsername = localStorage.getItem('sessionUsername');
console.log(sessionUsername);
if (sessionUsername) {
    var welcomeUsername = document.getElementById('username');
    welcomeUsername.textContent = 'Welcome ' + sessionUsername;
} else {
    location.replace('index.html');
}
