// Navigation Arrow Control - ملف مشترك لجميع الصفحات
function initializeNavigation() {
    const navArrow = document.getElementById('navArrow');
    const navDropdown = document.getElementById('navDropdown');

    if (navArrow && navDropdown) {
        console.log('✅ تم تحميل سهم القائمة بنجاح');

        // إزالة أي مستمعات أحداث موجودة مسبقاً لمنع التكرار
        navArrow.replaceWith(navArrow.cloneNode(true));
        navDropdown.replaceWith(navDropdown.cloneNode(true));

        // الحصول على العناصر الجديدة
        const newNavArrow = document.getElementById('navArrow');
        const newNavDropdown = document.getElementById('navDropdown');

        // Toggle dropdown
        newNavArrow.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🟡 تم الضغط على السهم');

            // فحص الحالة الحالية
            const isActive = this.classList.contains('active');

            if (isActive) {
                // إغلاق القائمة
                this.classList.remove('active');
                newNavDropdown.classList.remove('active');
                console.log('الحالة الجديدة: مغلق');
            } else {
                // فتح القائمة
                this.classList.add('active');
                newNavDropdown.classList.add('active');
                console.log('الحالة الجديدة: مفتوح');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!newNavArrow.contains(e.target) && !newNavDropdown.contains(e.target)) {
                newNavArrow.classList.remove('active');
                newNavDropdown.classList.remove('active');
                console.log('🔴 تم إغلاق القائمة (نقر خارجي)');
            }
        });

        // Prevent dropdown from closing when clicking inside it
        newNavDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Close dropdown when clicking on a link
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function() {
                newNavArrow.classList.remove('active');
                newNavDropdown.classList.remove('active');
                console.log('🔴 تم إغلاق القائمة (نقر على رابط)');
            });
        });

        // Close dropdown when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                newNavArrow.classList.remove('active');
                newNavDropdown.classList.remove('active');
                console.log('🔴 تم إغلاق القائمة (مفتاح Escape)');
            }
        });
    } else {
        console.error('❌ لم يتم العثور على السهم أو القائمة:', {
            navArrow: !!navArrow,
            navDropdown: !!navDropdown
        });
    }
}

// تهيئة كل شيء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 تهيئة الصفحة...');
    initializeNavigation();
});

// وإذا فشل DOMContentLoaded، جرب load
window.addEventListener('load', function() {
    console.log('🔄 تهيئة الصفحة (بعد التحميل الكامل)...');
    initializeNavigation();
});

// Language functionality removed

// User Menu Functionality removed

// دالة لإغلاق جميع القوائم المنسدلة
function closeAllDropdowns() {
    const navArrow = document.getElementById('navArrow');
    const navDropdown = document.getElementById('navDropdown');

    if (navArrow) navArrow.classList.remove('active');
    if (navDropdown) navDropdown.classList.remove('active');
}

// Language switching functions removed - using Google Translate instead


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