document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    // For demo purposes - in a real app, you would validate against a server
    // Default admin credentials (in a real app, this would be server-side)
    const adminUsername = 'admin';
    const adminPassword = 'admin123';
    
    if (username === adminUsername && password === adminPassword) {
        // Success
        errorMessage.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Simulate redirect after successful login
        setTimeout(function() {
            alert('In a real application, you would be redirected to the admin dashboard.');
            window.location.href = 'http://127.0.0.1:5500/Admin_Dashboards/Admin_Dashboard.html';
        }, 2000);
    } else {
        // Failed login
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        document.getElementById('password').value = '';
    }
});