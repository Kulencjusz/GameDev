document.addEventListener('DOMContentLoaded', function() {
    // Check user session
    fetch('/checkSession')
    .then(response => response.json())
    .then(data => {
        const loginRegisterSection = document.getElementById('login-register-section');
        const userSection = document.getElementById('user-section');

        if (data.loggedIn) {
            // User is logged in
            loginRegisterSection.style.display = 'none';
            userSection.style.display = 'block';
            document.getElementById('username').innerText = data.nickname;
        } else {
            // User is not logged in
            loginRegisterSection.style.display = 'block';
            userSection.style.display = 'none';
        }
    })
    .catch(error => console.error('Error checking user session:', error));
});

function logout() {
    fetch('/logout')
    .then(response => {
        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            alert('Logout failed');
        }
    })
    .catch(error => console.error('Error:', error));
}
