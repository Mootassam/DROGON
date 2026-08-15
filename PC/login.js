// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.innerHTML = '<span class="eye-icon">🙈</span>';
    } else {
        passwordInput.type = 'password';
        toggleButton.innerHTML = '<span class="eye-icon">👁️</span>';
    }
}

// Form submission
document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        console.log('Login attempt:', { email, password });
        alert('Login successful! (Demo mode)');
    } else {
        alert('Please fill in all fields');
    }
});

// Social button handlers
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
        console.log('Login with', provider);
        alert(`Login with ${provider} (Demo mode)`);
    });
});
