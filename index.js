function toggleMenu() {
    var menuDrawer = document.querySelector('.menu-drawer');
    if (menuDrawer.style.left === "-250px") {
        menuDrawer.style.left = "0";
    } else {
        menuDrawer.style.left = "-250px";
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// index.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const messageDiv = document.getElementById('register-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                messageDiv.textContent = 'User registered successfully';
                messageDiv.style.display = 'block';
                messageDiv.classList.remove('hidden');
                form.reset();
            } else {
                const errorText = await response.text();
                messageDiv.textContent = errorText;
                messageDiv.style.display = 'block';
                messageDiv.classList.remove('hidden');
            }
        } catch (error) {
            messageDiv.textContent = 'An error occurred while registering the user.';
            messageDiv.style.display = 'block';
            messageDiv.classList.remove('hidden');
        }

        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000); // Ukryj komunikat po 5 sekundach
    });
});
