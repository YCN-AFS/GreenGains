document.getElementById('recyclingForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của biểu mẫu

    const location = document.getElementById('location').value;
    const wasteType = document.getElementById('wasteType').value;
    const quantity = document.getElementById('quantity').value;
    const condition = document.getElementById('condition').value;
    const imageUpload = document.getElementById('imageUpload').files[0];
    const commitment = document.getElementById('commitment').checked;
    const rewardType = document.getElementById('rewardType').value;

    // Kiểm tra xem người dùng đã chọn hình ảnh chưa
    if (!imageUpload) {
        alert('Vui lòng chọn hình ảnh!');
        return;
    }

    // Kiểm tra cam kết
    if (!commitment) {
        alert('Bạn cần cam kết rằng rác thải đạt tiêu chuẩn đã quy định.');
        return;
    }

    // Xử lý dữ liệu (gửi đến server hoặc lưu trữ)
    let rewardMessage = '';
    if (rewardType === 'points') {
        rewardMessage = 'Bạn sẽ nhận được điểm thưởng.';
    } else if (rewardType === 'tree') {
        rewardMessage = 'Bạn sẽ nhận được cây tại cơ sở.';
    } else if (rewardType === 'money') {
        rewardMessage = 'Bạn sẽ nhận được tiền.';
    }

    alert(`Đăng ký thành công!\nĐịa điểm: ${location}\nLoại rác: ${wasteType}\nKhối lượng: ${quantity} kg\nTình trạng: ${condition}\n${rewardMessage}`);
    
    // Reset biểu mẫu
    this.reset();
}); 