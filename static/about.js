document.addEventListener('DOMContentLoaded', () => {
    // Hiển thị tên người dùng và Avatar nếu đã đăng nhập
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userProfile').style.display = 'block';
        document.getElementById('registerLink').style.display = 'none';
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('notification').style.display = 'block'; // Hiện chuông thông báo
    }

    // Xử lý sự kiện cho liên kết về trang chủ
    document.getElementById('homeLink').addEventListener('click', function() {
        window.location.href = 'index.html'; // Điều hướng đến trang chính
    });

    // Xử lý sự kiện cho dropdown
    const dropdown = document.getElementById('dropdown');
    if (dropdown) {
        dropdown.addEventListener('click', function() {
            this.style.display = this.style.display === 'none' ? 'block' : 'none';
        });
    }
}); 