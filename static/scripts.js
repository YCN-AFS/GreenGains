// JavaScript code can be added here for interactivity
console.log("Welcome to the homepage!");

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

    // Xử lý sự kiện cho dropdown
    const dropdown = document.getElementById('dropdown');
    if (dropdown) {
        dropdown.addEventListener('click', function() {
            this.style.display = this.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Xử lý sự kiện cho liên kết về trang chủ
    document.getElementById('homeLink').addEventListener('click', function() {
        window.location.href = 'index.html'; // Điều hướng đến trang chính
    });
});

// Hàm để thêm sản phẩm vào giỏ hàng
function addToCart(productName) {
    alert(productName + " đã được thêm vào giỏ hàng!");
}

// Thêm sự kiện cho các nút "Thêm vào giỏ hàng"
document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h3').innerText;
        addToCart(productName);
    });
});
