// User data storage
const users = {
    admin: {
        email: 'admin@lhu.edu.vn',
        password: 'admin123',
        role: 'admin',
        name: 'Administrator'
    },
    salesman: {
        email: 'salesman@lhu.edu.vn',
        password: 'salesman123',
        role: 'salesman',
        name: 'Salesman A'
    },
    user: {
        email: 'user@lhu.edu.vn',
        password: 'user123',
        role: 'user',
        name: 'User A'
    }
};

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'templates/login.html';
    }
    return JSON.parse(user);
}

// Login handler
function handleLogin(email, password) {
    const user = Object.values(users).find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('user', JSON.stringify({
            name: user.name,
            role: user.role,
            id: user.role === 'salesman' ? 'salesmanId' : 'userId'
        }));
        window.location.href = '../index.html';
        return true;
    }
    return false;
}

// Register handler
function handleRegister(userData) {
    // Validate user data
    if (!userData.email || !userData.password || !userData.name) {
        return { success: false, message: 'Vui lòng điền đầy đủ thông tin' };
    }

    // Check if email exists
    if (Object.values(users).some(u => u.email === userData.email)) {
        return { success: false, message: 'Email đã tồn tại' };
    }

    // Store new user (in real app, this would be a database operation)
    const newUser = {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: userData.role,
    };

    // Add to users object (temporary storage)
    users[userData.email] = newUser;

    return { success: true, message: 'Đăng ký thành công' };
}

// Initialize auth listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    checkSession();
    
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (handleLogin(email, password)) {
                showSuccess('Đăng nhập thành công');
            } else {
                showError('Email hoặc mật khẩu không đúng');
            }
        });
    }

    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userData = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                role: document.getElementById('role') ? document.getElementById('role').value : 'user', // Default role
            };

            const result = handleRegister(userData);
            if (result.success) {
                showSuccess(result.message);
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                showError(result.message);
            }
        });
    }
});

// Utility Functions
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Remove any existing error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Add new error message
    const form = document.querySelector('form');
    form.insertBefore(errorDiv, form.firstChild);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    // Remove any existing messages
    document.querySelectorAll('.error-message, .success-message').forEach(el => el.remove());
    
    // Add success message
    const form = document.querySelector('form');
    form.insertBefore(successDiv, form.firstChild);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function checkSession() {
    const user = localStorage.getItem('user');
    if (user) {
        window.location.href = '../index.html';
    }
} 