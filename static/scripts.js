// JavaScript code can be added here for interactivity
console.log("Welcome to the homepage!");

// Khởi tạo các biến toàn cục
const USER_KEY = 'user';

// Dữ liệu mẫu
const MOCK_NEWS = [
    {
        id: 1,
        title: "Greengains ra mắt linh vật đại diện",
        summary: "Greengains ra mắt linh vật dễ thương, đội mũ lá xanh, biểu tượng tái chế và bảo vệ môi trường, lan tỏa lối sống xanh",
        image: "image/news/mascot.png"
    },
    {
        id: 2,
        title: "Chương trình đổi rác lấy cây xanh",
        summary: "Hơn 1000kg rác tái chế đã được thu gom và đổi lấy cây xanh trong tháng qua",
        image: "image/news/mascot.png"
    },
    {
        id: 3,
        title: "Công nghệ xử lý rác thải mới",
        summary: "Ứng dụng công nghệ mới trong việc xử lý rác thải công nghiệp",
        image: "image/news/mascot.png"
    },
    {
        id: 4,
        title: "Greengains Lan Tỏa Phong Trào Sống Xanh",
        summary: "Greengains khởi xướng phong trào sống xanh, khuyến khích tái chế rác thải thành giá trị, hướng đến cộng đồng bền vững và môi trường xanh sạch đẹp",
        image: "image/news/mascot.png"
    }



];

const MOCK_PARTNERS = [
    {
        name: "Limloop - Plastic recycle bags",
        logo: "image/partners/limloop.png"
    },
    {
        name: "Đại học Lạc Hồng",
        logo: "image/partners/LacHong.png"
    },
    {
        name: "AI Robotic",
        logo: "image/partners/ai-robotic.png"
    },
    {
        name: "AI Robotic",
        logo: "image/partners/T&A-Lab.png"
    }
];

// Quản lý trạng thái người dùng
class UserManager {
    static getUser() {
        return JSON.parse(localStorage.getItem(USER_KEY));
    }

    static updateUI() {
        const user = this.getUser();
        const userProfile = document.getElementById('userProfile');
        const registerLink = document.getElementById('registerLink');
        const loginLink = document.getElementById('loginLink');
        const notification = document.getElementById('notification');
        const userName = document.getElementById('userName');

        if (user) {
            userProfile.style.display = 'block';
            userName.textContent = user.name;
            registerLink.style.display = 'none';
            loginLink.style.display = 'none';
            notification.style.display = 'block';
        }
    }

    static logout() {
        localStorage.removeItem(USER_KEY);
        window.location.href = 'templates/login.html';
    }
}

// Quản lý dropdown menu
class DropdownManager {
    static init() {
        const dropdown = document.getElementById('dropdown');
        if (dropdown) {
            document.addEventListener('click', (e) => {
                if (!e.target.closest('#userProfile')) {
                    dropdown.style.display = 'none';
                }
            });
        }
    }

    static toggle() {
        const dropdown = document.getElementById('dropdown');
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}

// Quản lý tin tức
class NewsManager {
    static async loadNews() {
        try {
            const newsGrid = document.getElementById('newsGrid');
            if (!newsGrid) return;

            // Sử dụng dữ liệu mẫu thay vì gọi API
            const news = MOCK_NEWS;

            // Kiểm tra chiều rộng cửa sổ
            const windowWidth = window.innerWidth;
            let newsCount = 3; // Mặc định hiển thị 3 tin tức

            // Nếu chiều rộng lớn hơn 768px, hiển thị tối đa 4 tin tức
            if (windowWidth > 768) {
                newsCount = Math.min(4, news.length); // Tối đa 4 tin tức
            }

            newsGrid.innerHTML = news
                .slice(0, newsCount)
                .map(item => this.createNewsCard(item))
                .join('');
        } catch (error) {
            console.error('Error loading news:', error);
        }
    }

    static createNewsCard(news) {
        return `
            <div class="news-card" onclick="location.href='/news/${news.id}'" style="cursor: pointer;">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
                <div class="news-content">
                    <h3>${news.title}</h3>
                    <p>${news.summary}</p>
                </div>
            </div>
        `;
    }
}

// Quản lý đối tác
class PartnersManager {
    static async loadPartners() {
        try {
            const partnerLogos = document.getElementById('partnerLogos');
            if (!partnerLogos) return;

            // Sử dụng dữ liệu mẫu thay vì gọi API
            const partners = MOCK_PARTNERS;

            partnerLogos.innerHTML = partners
                .map(partner => this.createPartnerLogo(partner))
                .join('');
        } catch (error) {
            console.error('Error loading partners:', error);
        }
    }

    static createPartnerLogo(partner) {
        return `
            <div class="partner-logo">
                <img src="${partner.logo}" alt="${partner.name}" loading="lazy">
            </div>
        `;
    }
}

// Quản lý số liệu thống kê
class StatsManager {
    static animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.count);
                    this.countUp(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    static countUp(element, target) {
        let current = 0;
        const increment = target / 50; // Chia thành 50 bước
        const duration = 2000; // 2 giây
        const interval = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, interval);
    }
}

// Quản lý form liên hệ
class ContactForm {
    static init() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    static async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (this.validateForm(data)) {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất!');
                    e.target.reset();
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Có lỗi xảy ra. Vui lòng thử lại sau!');
            }
        }
    }

    static validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

        if (!data.name || data.name.length < 2) {
            alert('Vui lòng nhập họ tên hợp lệ');
            return false;
        }

        if (!emailRegex.test(data.email)) {
            alert('Vui lòng nhập email hợp lệ');
            return false;
        }

        if (!phoneRegex.test(data.phone)) {
            alert('Vui lòng nhập số điện thoại hợp lệ');
            return false;
        }

        if (!data.message || data.message.length < 10) {
            alert('Vui lòng nhập nội dung tin nhắn (ít nhất 10 ký tự)');
            return false;
        }

        return true;
    }
}

class RecyclingStats extends StatsManager {
    static init() {
        this.animateStats();
        this.initializeStepAnimation();
    }

    static initializeStepAnimation() {
        const steps = document.querySelectorAll('.step');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 200);
                }
            });
        }, { threshold: 0.5 });

        steps.forEach(step => observer.observe(step));
    }
}

class AnimationManager {
    static init() {
        this.animateOnScroll();
        this.initParallax();
    }

    static animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .step, .stat-item, .news-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(el => {
            el.classList.add('animate-prepare');
            observer.observe(el);
        });
    }

    static initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', () => {
    UserManager.updateUI();
    DropdownManager.init();
    NewsManager.loadNews();
    PartnersManager.loadPartners();
    StatsManager.animateStats();
    ContactForm.init();
    RecyclingStats.init();
    AnimationManager.init();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Export các functions cần thiết
window.toggleDropdown = DropdownManager.toggle;
window.logout = UserManager.logout;
