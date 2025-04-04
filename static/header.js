// Header functionality
function toggleMenu() {
    const nav = document.getElementById('main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = '/login.html';
}

// Highlight active menu item
document.addEventListener('DOMContentLoaded', function() {
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Remove all active classes
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Set active class based on current path
    if (currentPath.includes('about')) {
        document.getElementById('aboutLink').classList.add('active');
    } else if (currentPath.includes('stored')) {
        document.getElementById('storeLink').classList.add('active');
    } else if (currentPath.includes('contact')) {
        document.getElementById('contactLink').classList.add('active');
    } else if (currentPath === '/' || currentPath.includes('index')) {
        document.getElementById('homeLink').classList.add('active');
    }
    
    // Check user login status
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userProfile').style.display = 'block';
        document.getElementById('registerLink').parentElement.style.display = 'none';
        document.getElementById('loginLink').parentElement.style.display = 'none';
        document.getElementById('notification').style.display = 'block';
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const nav = document.getElementById('main-nav');
        const menuToggle = document.querySelector('.menu-toggle');
        if (nav && menuToggle && !nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('main-nav');
            const menuToggle = document.querySelector('.menu-toggle');
            if (nav && menuToggle) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
}); 