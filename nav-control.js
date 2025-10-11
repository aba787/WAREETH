
// Navigation Arrow Control - ملف مشترك لجميع الصفحات
document.addEventListener('DOMContentLoaded', function() {
    const navArrow = document.getElementById('navArrow');
    const navDropdown = document.getElementById('navDropdown');

    if (navArrow && navDropdown) {
        // Toggle dropdown
        navArrow.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            navArrow.classList.remove('active');
            navDropdown.classList.remove('active');
        });

        // Prevent dropdown from closing when clicking inside it
        navDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Close dropdown when clicking on a link
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function() {
                navArrow.classList.remove('active');
                navDropdown.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.99) 0%, rgba(20, 20, 20, 0.99) 100%)';
                header.style.backdropFilter = 'blur(25px)';
            } else {
                header.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(20, 20, 20, 0.98) 100%)';
                header.style.backdropFilter = 'blur(20px)';
            }
        }
    });

    // Language toggle functionality
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            // Add language switching logic here
            console.log('Language toggle clicked');
        });
    }

    // User menu toggle functionality
    const userMenuToggle = document.getElementById('userMenuToggle');
    if (userMenuToggle) {
        userMenuToggle.addEventListener('click', function() {
            // Add user menu logic here
            console.log('User menu toggle clicked');
        });
    }
});
