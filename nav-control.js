
// Navigation Arrow Control - ملف مشترك لجميع الصفحات
document.addEventListener('DOMContentLoaded', function() {
    const navArrow = document.getElementById('navArrow');
    const navDropdown = document.getElementById('navDropdown');

    if (navArrow && navDropdown) {
        // Toggle dropdown
        navArrow.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = this.classList.contains('active');
            
            // إغلاق جميع القوائم المنسدلة الأخرى أولاً
            closeAllDropdowns();
            
            // تبديل حالة السهم والقائمة
            if (!isActive) {
                this.classList.add('active');
                navDropdown.classList.add('active');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!navArrow.contains(e.target) && !navDropdown.contains(e.target)) {
                closeAllDropdowns();
            }
        });

        // Prevent dropdown from closing when clicking inside it
        navDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Close dropdown when clicking on a link
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function() {
                closeAllDropdowns();
            });
        });

        // Close dropdown when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllDropdowns();
            }
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
        // تحديد اللغة المحفوظة أو الافتراضية
        const savedLanguage = localStorage.getItem('siteLanguage') || 'ar';
        setLanguage(savedLanguage);

        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Language toggle clicked');
            const currentLang = document.body.classList.contains('english') ? 'en' : 'ar';
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            setLanguage(newLang);
            localStorage.setItem('siteLanguage', newLang);
        });
    }

    // User menu toggle functionality
    const userMenuToggle = document.getElementById('userMenuToggle');
    if (userMenuToggle) {
        userMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            // Add user menu logic here
            console.log('User menu toggle clicked');
        });
    }

    // Initialize user menu
    initializeUserMenu();
});

// Language switching functions
function setLanguage(language) {
    const body = document.body;
    const languageToggle = document.getElementById('languageToggle');

    if (language === 'en') {
        body.classList.add('english');
        body.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
        if (languageToggle) {
            languageToggle.innerHTML = '<i class="fas fa-globe"></i> العربية';
        }
        translateContent('en');
    } else {
        body.classList.remove('english');
        body.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
        if (languageToggle) {
            languageToggle.innerHTML = '<i class="fas fa-globe"></i> EN';
        }
        translateContent('ar');
    }
    
    // حفظ اللغة المختارة
    localStorage.setItem('siteLanguage', language);
}

function translateContent(language) {
    console.log('Translating to:', language);
    
    const translations = {
        en: {
            // Navigation
            'الرئيسية': 'Home',
            'من نحن': 'About Us',
            'البرامج': 'Programs',
            'الهيكل التنظيمي': 'Organization',
            'التكريمات والجوائز': 'Awards & Recognition',
            'شركاؤنا': 'Our Partners',
            'المقالات': 'Articles',
            'الأعضاء': 'Members',
            'تواصل معنا': 'Contact Us',
            'انضم إلينا': 'Join Us',
            'حسابي': 'My Account',

            // Hero section
            'حياكم الله في وريث': 'Welcome to Wareeth',
            'إرث باقٍ وتاريخ حي': 'Living Heritage & Lasting History',

            // About section
            'وريث': 'Wareeth',
            'الرؤية': 'Vision',
            'الرسالة': 'Mission',
            'أن نكون الفريق الرائد في توثيق وحفظ التراث السعودي ونشره للأجيال القادمة بأساليب عصرية ومبتكرة': 'To be the leading team in documenting and preserving Saudi heritage and spreading it to future generations through modern and innovative methods',
            'الهدف الرئيسي والغاية من إنشاء الفريق': 'The main goal and purpose of establishing the team',
            'نعمل على توثيق التراث السعودي ونشره': 'We work to document and spread Saudi heritage',
            'انطلقت مسيرة فريقنا منذ عام 2021 م ولا تزال مستمرة إلى اليوم': 'Our team\'s journey began in 2021 and continues to this day',
            'تهدف إلى تعزيز الهوية السعودية والمساهمة في تسجيل الإرث وإعادة إحياء العادات والتقاليد': 'Aims to strengthen Saudi identity and contribute to recording heritage and reviving customs and traditions',
            'يمثل فريق وريث مجموعة من الأفراد الذين استثمروا بعمق في تعزيز الهوية السعودية والمساهمة في تسجيل التراث وإحياء العادات والتقاليد ذات القيمة الثقافية الكبرى': 'Wareeth team represents a group of individuals who have invested deeply in strengthening Saudi identity and contributing to recording heritage and reviving customs and traditions of great cultural value',

            // News section
            'الأخبار والإعلانات': 'News & Announcements',
            'إطلاق مبادرة جديدة لحفظ التراث': 'Launch of New Heritage Preservation Initiative',
            'ورشة عمل الحرف اليدوية التقليدية': 'Traditional Handicrafts Workshop',
            'تكريم المتطوعين المميزين': 'Honoring Outstanding Volunteers',
            'فعالية تراثية كبرى بالرياض': 'Major Heritage Event in Riyadh',
            'شراكة استراتيجية مع وزارة الثقافة': 'Strategic Partnership with Ministry of Culture',
            'اقرأ المزيد': 'Read More',
            'عرض جميع الأخبار': 'View All News',

            // Statistics
            'إحصائيات فريق وريث': 'Wareeth Team Statistics',
            'إجمالي ساعات التطوع': 'Total Volunteer Hours',
            'عدد المتطوعين': 'Number of Volunteers',
            'عدد الأماكن': 'Number of Places',
            'المستفيدون من البرامج والمساهمات': 'Program Beneficiaries',

            // Partners
            'شركاؤنا والداعمون': 'Our Partners & Supporters',
            'وزارة الثقافة': 'Ministry of Culture',
            'الهيئة العامة للتراث': 'Heritage Authority',
            'مؤسسة محمد بن سلمان': 'Mohammed bin Salman Foundation',
            'نادي الرياض': 'Riyadh Club',
            'جمعية وطن طموح': 'Watan Ambitious Association',
            'مجتمع حرفة': 'Hirfa Community',

            // Join section
            'انضم إلى فريق وريث التطوعي': 'Join Wareeth Volunteer Team',
            'كن جزءاً من رحلتنا في حفظ التراث ونشر الثقافة العربية الأصيلة': 'Be part of our journey in preserving heritage and spreading authentic Arab culture',
            'الانضمام للفريق': 'Join the Team',

            // Footer
            'معلومات الاتصال': 'Contact Information',
            'روابط مفيدة': 'Useful Links',
            'تابعنا على وسائل التواصل الاجتماعي': 'Follow us on social media',
            'سياسة الخصوصية': 'Privacy Policy',
            'شروط الاستخدام': 'Terms of Use',
            'الدعم الفني': 'Technical Support',
            'جميع الحقوق محفوظة - وريث': 'All rights reserved - Wareeth'
        },
        ar: {
            // English to Arabic translations
            'Home': 'الرئيسية',
            'About Us': 'من نحن',
            'Programs': 'البرامج',
            'Organization': 'الهيكل التنظيمي',
            'Awards & Recognition': 'التكريمات والجوائز',
            'Our Partners': 'شركاؤنا',
            'Articles': 'المقالات',
            'Members': 'الأعضاء',
            'Contact Us': 'تواصل معنا',
            'Join Us': 'انضم إلينا',
            'My Account': 'حسابي',

            'Welcome to Wareeth': 'حياكم الله في وريث',
            'Living Heritage & Lasting History': 'إرث باقٍ وتاريخ حي',

            'Wareeth': 'وريث',
            'Vision': 'الرؤية',
            'Mission': 'الرسالة',

            'News & Announcements': 'الأخبار والإعلانات',
            'Launch of New Heritage Preservation Initiative': 'إطلاق مبادرة جديدة لحفظ التراث',
            'Traditional Handicrafts Workshop': 'ورشة عمل الحرف اليدوية التقليدية',
            'Honoring Outstanding Volunteers': 'تكريم المتطوعين المميزين',
            'Major Heritage Event in Riyadh': 'فعالية تراثية كبرى بالرياض',
            'Strategic Partnership with Ministry of Culture': 'شراكة استراتيجية مع وزارة الثقافة',
            'Read More': 'اقرأ المزيد',
            'View All News': 'عرض جميع الأخبار',

            'Wareeth Team Statistics': 'إحصائيات فريق وريث',
            'Total Volunteer Hours': 'إجمالي ساعات التطوع',
            'Number of Volunteers': 'عدد المتطوعين',
            'Number of Places': 'عدد الأماكن',
            'Program Beneficiaries': 'المستفيدون من البرامج والمساهمات',

            'Our Partners & Supporters': 'شركاؤنا والداعمون',
            'Ministry of Culture': 'وزارة الثقافة',
            'Heritage Authority': 'الهيئة العامة للتراث',
            'Mohammed bin Salman Foundation': 'مؤسسة محمد بن سلمان',
            'Riyadh Club': 'نادي الرياض',
            'Watan Ambitious Association': 'جمعية وطن طموح',
            'Hirfa Community': 'مجتمع حرفة',

            'Join Wareeth Volunteer Team': 'انضم إلى فريق وريث التطوعي',
            'Be part of our journey in preserving heritage and spreading authentic Arab culture': 'كن جزءاً من رحلتنا في حفظ التراث ونشر الثقافة العربية الأصيلة',
            'Join the Team': 'الانضمام للفريق',

            'Contact Information': 'معلومات الاتصال',
            'Useful Links': 'روابط مفيدة',
            'Follow us on social media': 'تابعنا على وسائل التواصل الاجتماعي',
            'Privacy Policy': 'سياسة الخصوصية',
            'Terms of Use': 'شروط الاستخدام',
            'Technical Support': 'الدعم الفني',
            'All rights reserved - Wareeth': 'جميع الحقوق محفوظة - وريث',

            'To be the leading team in documenting and preserving Saudi heritage and spreading it to future generations through modern and innovative methods': 'أن نكون الفريق الرائد في توثيق وحفظ التراث السعودي ونشره للأجيال القادمة بأساليب عصرية ومبتكرة',
            'The main goal and purpose of establishing the team': 'الهدف الرئيسي والغاية من إنشاء الفريق',
            'We work to document and spread Saudi heritage': 'نعمل على توثيق التراث السعودي ونشره',
            'Our team\'s journey began in 2021 and continues to this day': 'انطلقت مسيرة فريقنا منذ عام 2021 م ولا تزال مستمرة إلى اليوم',
            'Aims to strengthen Saudi identity and contribute to recording heritage and reviving customs and traditions': 'تهدف إلى تعزيز الهوية السعودية والمساهمة في تسجيل الإرث وإعادة إحياء العادات والتقاليد',
            'Wareeth team represents a group of individuals who have invested deeply in strengthening Saudi identity and contributing to recording heritage and reviving customs and traditions of great cultural value': 'يمثل فريق وريث مجموعة من الأفراد الذين استثمروا بعمق في تعزيز الهوية السعودية والمساهمة في تسجيل التراث وإحياء العادات والتقاليد ذات القيمة الثقافية الكبرى'
        }
    };

    const currentTranslations = translations[language] || {};

    // Helper function to get clean text (removing extra spaces and icons)
    function getCleanText(element) {
        const clone = element.cloneNode(true);
        const icons = clone.querySelectorAll('i');
        icons.forEach(icon => icon.remove());
        return clone.textContent.trim();
    }

    // Helper function to preserve icons while translating
    function translateElementWithIcon(element, translation) {
        const iconElement = element.querySelector('i');
        if (iconElement) {
            const iconHTML = iconElement.outerHTML;
            element.innerHTML = `${iconHTML} ${translation}`;
        } else {
            element.textContent = translation;
        }
    }

    // ترجمة عناصر التنقل
    document.querySelectorAll('.dropdown-item').forEach(item => {
        const cleanText = getCleanText(item);
        if (currentTranslations[cleanText]) {
            translateElementWithIcon(item, currentTranslations[cleanText]);
        }
    });

    // ترجمة أزرار الهيدر
    document.querySelectorAll('.join-header-btn, .user-menu-toggle').forEach(btn => {
        const cleanText = getCleanText(btn);
        if (currentTranslations[cleanText]) {
            translateElementWithIcon(btn, currentTranslations[cleanText]);
        }
    });

    // ترجمة العناوين الرئيسية
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(element => {
        const text = element.textContent.trim();
        if (currentTranslations[text]) {
            element.textContent = currentTranslations[text];
        }
    });

    // ترجمة الفقرات بدقة أكثر
    document.querySelectorAll('p:not(.logo-subtitle)').forEach(element => {
        const text = element.textContent.trim();
        if (currentTranslations[text]) {
            element.textContent = currentTranslations[text];
        }
    });

    // ترجمة الأزرار والروابط
    document.querySelectorAll('button:not(.nav-arrow):not(.user-menu-toggle):not(.join-header-btn):not(.language-toggle), .btn, .join-btn, .view-all-btn').forEach(btn => {
        const cleanText = getCleanText(btn);
        if (currentTranslations[cleanText]) {
            translateElementWithIcon(btn, currentTranslations[cleanText]);
        }
    });

    // ترجمة الروابط العادية
    document.querySelectorAll('a:not(.dropdown-item):not(.social-link):not(.join-header-btn)').forEach(link => {
        const cleanText = getCleanText(link);
        if (currentTranslations[cleanText]) {
            translateElementWithIcon(link, currentTranslations[cleanText]);
        }
    });

    // ترجمة تسميات الإحصائيات
    document.querySelectorAll('.stat-label').forEach(label => {
        const text = label.textContent.trim();
        if (currentTranslations[text]) {
            label.textContent = currentTranslations[text];
        }
    });

    // ترجمة أسماء الشركاء
    document.querySelectorAll('.partner-name').forEach(partner => {
        const text = partner.textContent.trim();
        if (currentTranslations[text]) {
            partner.textContent = currentTranslations[text];
        }
    });

    // ترجمة عناوين الأخبار
    document.querySelectorAll('.news-content h3').forEach(title => {
        const text = title.textContent.trim();
        if (currentTranslations[text]) {
            title.textContent = currentTranslations[text];
        }
    });

    // ترجمة النماذج
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        if (currentTranslations[placeholder]) {
            input.setAttribute('placeholder', currentTranslations[placeholder]);
        }
    });

    // ترجمة خيارات القوائم المنسدلة
    document.querySelectorAll('option').forEach(option => {
        const text = option.textContent.trim();
        if (currentTranslations[text]) {
            option.textContent = currentTranslations[text];
        }
    });

    // إضافة ترجمة للشعار الفرعي
    const logoSubtitle = document.querySelector('.logo-subtitle');
    if (logoSubtitle) {
        const subtitleText = logoSubtitle.textContent.trim();
        if (language === 'en' && subtitleText === 'إرث باقٍ وتاريخ حي') {
            logoSubtitle.textContent = 'Living Heritage & Lasting History';
        } else if (language === 'ar' && subtitleText === 'Living Heritage & Lasting History') {
            logoSubtitle.textContent = 'إرث باقٍ وتاريخ حي';
        }
    }

    console.log('Translation completed for language:', language);
}

// دالة لإغلاق جميع القوائم المنسدلة
function closeAllDropdowns() {
    const navArrow = document.getElementById('navArrow');
    const navDropdown = document.getElementById('navDropdown');
    const userMenu = document.getElementById('userMenu');
    
    if (navArrow) navArrow.classList.remove('active');
    if (navDropdown) navDropdown.classList.remove('active');
    if (userMenu) userMenu.classList.remove('active');
}

// User Menu Functionality
function initializeUserMenu() {
    const userMenu = document.getElementById('userMenu');
    const userMenuToggle = document.getElementById('userMenuToggle');
    const userMenuDropdown = document.getElementById('userMenuDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!userMenuToggle) return;

    // Toggle user menu dropdown
    userMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = userMenu.classList.contains('active');
        
        // إغلاق القائمة الرئيسية أولاً
        closeAllDropdowns();
        
        // تبديل حالة قائمة المستخدم
        if (!isActive) {
            userMenu.classList.add('active');
        } else {
            userMenu.classList.remove('active');
        }
    });

    // Close user menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!userMenu.contains(e.target)) {
            userMenu.classList.remove('active');
        }
    });

    // Handle logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add logout logic here
            if (confirm('هل تريد تسجيل الخروج؟')) {
                // Clear any stored user data
                localStorage.removeItem('userLoggedIn');
                localStorage.removeItem('currentUser');

                // Show logout message
                alert('تم تسجيل الخروج بنجاح');

                // Close dropdown
                userMenu.classList.remove('active');

                // Redirect to home page or reload
                window.location.href = 'index.html';
            }
        });
    }

    // Close dropdown when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            userMenu.classList.remove('active');
        }
    });
}
