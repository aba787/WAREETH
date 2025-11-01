document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality
    initializeLanguageToggle();

    // Mobile navigation toggle and header scroll effects
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Header scroll effect
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        if (header) {
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        lastScrollY = currentScrollY;
    });

    // Smooth scroll for navigation links and handle external pages
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Handle internal anchors
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);

                if (targetSection) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // Handle external pages - let them navigate normally
            else if (href && href.endsWith('.html')) {
                // Allow normal navigation to external pages
                return true;
            }
            // Handle missing pages
            else if (href && !href.startsWith('#')) {
                e.preventDefault();
                showNotification('هذه الصفحة قيد الإنشاء وستكون متاحة قريباً', 'info');
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function setActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navigationLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);
    setActiveNav(); // Call once on load


    // Statistics Animation - Enhanced Version
    let statsAnimated = false; // Flag to prevent multiple animations

    function animateNumbers() {
      if (statsAnimated) return; // Prevent re-animation
      
      const numberElements = document.querySelectorAll('.stat-number');
      console.log('🎯 بدء تحريك الإحصائيات:', numberElements.length, 'عنصر');

      if (numberElements.length === 0) {
        console.warn('⚠️ لم يتم العثور على عناصر الإحصائيات');
        return;
      }

      numberElements.forEach((element, index) => {
        const target = parseInt(element.getAttribute('data-target'));
        if (isNaN(target)) {
          console.warn(`⚠️ قيمة غير صحيحة للعنصر ${index + 1}`);
          return;
        }
        
        console.log(`📊 تحريك الرقم ${index + 1}: من 0 إلى ${target}`);
        
        const duration = 2500; // مدة التحريك
        const steps = 80; // عدد الخطوات
        const stepValue = target / steps;
        let current = 0;
        
        // إضافة تأخير تدريجي لكل رقم
        setTimeout(() => {
          const timer = setInterval(() => {
            current += stepValue;
            if (current >= target) {
              current = target;
              clearInterval(timer);
              element.textContent = target.toLocaleString('ar-SA') + '+';
              console.log(`✅ انتهى تحريك الرقم: ${target}`);
            } else {
              element.textContent = Math.floor(current).toLocaleString('ar-SA');
            }
          }, duration / steps);
        }, index * 200); // تأخير 200ms لكل رقم

        element.classList.add('animated');
      });
      
      statsAnimated = true; // تحديد أن التحريك تم
    }

    // تحسين Intersection Observer للإحصائيات
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      console.log('🔍 تم العثور على قسم الإحصائيات');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !statsAnimated) {
            console.log('👁️ قسم الإحصائيات أصبح مرئياً - بدء التحريك');
            // تأخير قصير قبل بدء التحريك
            setTimeout(() => {
              animateNumbers();
            }, 300);
          }
        });
      }, { 
        threshold: 0.3, // بدء التحريك عندما يكون 30% من القسم مرئي
        rootMargin: '0px 0px -50px 0px' // هامش إضافي
      });

      observer.observe(statsSection);
    } else {
      console.warn('⚠️ لم يتم العثور على قسم الإحصائيات');
    }

    // إضافة إمكانية إعادة تشغيل التحريك عند النقر على قسم الإحصائيات
    if (statsSection) {
      statsSection.addEventListener('dblclick', function() {
        statsAnimated = false;
        const numbers = statsSection.querySelectorAll('.stat-number');
        numbers.forEach(num => {
          num.textContent = '0';
          num.classList.remove('animated');
        });
        console.log('🔄 إعادة تعيين الإحصائيات');
        setTimeout(() => animateNumbers(), 100);
      });
    }


    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });

    // Partners marquee functionality
    duplicatePartners();

    // Initialize news loading when page loads
    loadNews();

    // Initialize news slider
    initializeNewsSlider();

    // Initialize user menu
    initializeUserMenu();

    // Load and display saved content on initial load
    loadSavedContent();

    // Initialize CTA and other buttons
    initializeCTAButtons();

    // Listen for localStorage changes (news updates from admin page)
    window.addEventListener('storage', function(e) {
        if (e.key === 'warithNews') {
            // Reload news when updated from members page
            loadNews();
            console.log('News updated from admin panel');
        }
    });

    // Listen for custom events from admin panel
    window.addEventListener('statsUpdated', function(e) {
        const stats = e.detail;
        updateStatsDisplay(stats);
        console.log('Statistics updated from admin panel');
    });

    window.addEventListener('partnersUpdated', function(e) {
        const partners = e.detail;
        updatePartnersDisplay(partners);
        console.log('Partners updated from admin panel');
    });

    window.addEventListener('contentUpdated', function(e) {
        const content = e.detail;
        updateContentDisplay(content);
        console.log('Content updated from admin panel');
    });

    // Navigation Arrow Control
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
});

// Dynamic content update functions
function updateStatsDisplay(stats) {
    // Update statistics on main page
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[0].setAttribute('data-target', stats.volunteerHours || 3200);
        statNumbers[1].setAttribute('data-target', stats.volunteersCount || 200);
        statNumbers[2].setAttribute('data-target', stats.placesCount || 29);
        statNumbers[3].setAttribute('data-target', stats.beneficiariesCount || 8040);

        // Reset animation flag and re-animate numbers
        statsAnimated = false;
        setTimeout(() => animateNumbers(), 100);
    }
}

function updatePartnersDisplay(partners) {
    const marqueeTrack = document.getElementById('marqueeTrack');
    if (marqueeTrack && partners && partners.length > 0) {
        const partnersHTML = partners.map(partner => `
            <div class="partner-item" ${partner.website ? `onclick="window.open('${partner.website}', '_blank')"` : ''} style="${partner.website ? 'cursor: pointer;' : ''}">
                <div class="partner-logo">
                    ${partner.logo ? 
                        `<img src="${partner.logo}" alt="${partner.name}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%;">` :
                        (partner.icon || '🤝')
                    }
                </div>
                <div class="partner-name">${partner.name || 'شريك'}</div>
            </div>
        `).join('');

        marqueeTrack.innerHTML = partnersHTML + partnersHTML; // Duplicate for smooth scrolling
    }
}

function updateContentDisplay(content) {
    // Update hero text
    const heroTitle = document.querySelector('.hero-content h1'); // Assuming h1 is used for hero title
    if (heroTitle && content.heroText) {
        heroTitle.textContent = content.heroText;
    }

    // Update about section
    if (content.aboutTitle) {
        const aboutTitle = document.querySelector('#about h2');
        if (aboutTitle) aboutTitle.textContent = content.aboutTitle;
    }

    if (content.aboutText) {
        const aboutText = document.querySelector('.about-text');
        if (aboutText) {
            const paragraphs = content.aboutText.split('\n').filter(p => p.trim());
            aboutText.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
        }
    }

    // Update vision
    if (content.visionText) {
        const visionText = document.querySelector('.vision-text');
        if (visionText) visionText.textContent = content.visionText;
    }

    // Update mission
    if (content.missionText) {
        const missionText = document.querySelector('.mission-text');
        if (missionText) missionText.textContent = content.missionText;
    }
}

function updateSettingsDisplay(settings) {
    // Update site title and subtitle
    const logo = document.querySelector('.logo h2');
    const logoSubtitle = document.querySelector('.logo-subtitle');

    if (logo && settings.siteTitle) {
        logo.textContent = settings.siteTitle.split(' - ')[0] || settings.siteTitle;
    }

    if (logoSubtitle && settings.siteSubtitle) {
        logoSubtitle.textContent = settings.siteSubtitle;
    }

    // Update contact info in footer
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach(section => {
        if (section.querySelector('h3')?.textContent === 'معلومات الاتصال') {
            const contactInfo = section.querySelectorAll('p');
            if (contactInfo.length >= 2) {
                if (settings.contactEmail) {
                    contactInfo[0].textContent = `📧 ${settings.contactEmail}`;
                }
                if (settings.contactPhone) {
                    contactInfo[1].textContent = `📞 ${settings.contactPhone}`;
                }
            }
        }
    });
}

function loadSavedContent() {
    // Load and apply saved content
    const savedStats = JSON.parse(localStorage.getItem('warithStats') || '{}');
    const savedPartners = JSON.parse(localStorage.getItem('warithPartners') || '[]');
    const savedContent = JSON.parse(localStorage.getItem('warithContent') || '{}');
    const savedSettings = JSON.parse(localStorage.getItem('warithSettings') || '{}');

    if (Object.keys(savedStats).length > 0) {
        updateStatsDisplay(savedStats);
    }

    if (savedPartners.length > 0) {
        updatePartnersDisplay(savedPartners);
    }

    if (Object.keys(savedContent).length > 0) {
        updateContentDisplay(savedContent);
    }

    if (Object.keys(savedSettings).length > 0) {
        updateSettingsDisplay(savedSettings);
    }
}


// Duplicate partners to create a continuous scrolling effect
function duplicatePartners() {
    const marqueeTrack = document.getElementById('marqueeTrack');
    if (marqueeTrack) {
        const originalItems = marqueeTrack.innerHTML;
        marqueeTrack.innerHTML = originalItems + originalItems;
    }
}

// News management functions
function loadMoreNews() {
    // This function will load more news items
    // For now, it just shows an alert
    alert('سيتم تحميل المزيد من الأخبار');
}

// Load news from localStorage or database
function loadNews() {
    const newsTrack = document.getElementById('newsTrack');
    if (!newsTrack) return;

    // Get news from localStorage (this will be populated by admin from members page)
    const savedNews = JSON.parse(localStorage.getItem('warithNews') || '[]');

    if (savedNews.length > 0) {
        // Clear existing news slides and replace with dynamic content
        newsTrack.innerHTML = '';

        savedNews.slice(0, 5).forEach(news => { // Show only first 5 news items
            const newsSlide = createNewsSlide(news);
            newsTrack.appendChild(newsSlide);
        });

        // Re-initialize slider after loading new content
        currentNewsSlide = 0;
        totalNewsSlides = savedNews.slice(0, 5).length;
        const indicatorsContainer = document.getElementById('newsIndicators');
        if (indicatorsContainer) {
            createNewsIndicators(indicatorsContainer);
        }
        updateNewsSlider();
    }
}

// Create news slide HTML element for slider
function createNewsSlide(news) {
    const newsSlide = document.createElement('div');
    newsSlide.className = 'news-slide';

    const imageSection = news.image ?
        `<div class="news-image">
            <img src="${news.image}" alt="${news.title}" loading="lazy">
         </div>` :
        `<div class="news-image">
            <img src="https://via.placeholder.com/400x250/8B4513/F5F5DC?text=${encodeURIComponent(news.title)}" alt="${news.title}" loading="lazy">
         </div>`;

    newsSlide.innerHTML = `
        <div class="news-item">
            ${imageSection}
            <div class="news-content">
                <div class="news-date">${news.date}</div>
                <h3>${news.title}</h3>
                <p>${news.summary}</p>
                <a href="#" class="read-more">اقرأ المزيد</a>
            </div>
        </div>
    `;
    return newsSlide;
}

// Create news item HTML element (for grid layout if needed)
function createNewsItem(news) {
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';

    const imageSection = news.image ?
        `<div class="news-image">
            <img src="${news.image}" alt="${news.title}" loading="lazy">
         </div>` :
        `<div class="news-image">
            <img src="https://via.placeholder.com/400x250/8B4513/F5F5DC?text=${encodeURIComponent(news.title)}" alt="${news.title}" loading="lazy">
         </div>`;

    newsItem.innerHTML = `
        ${imageSection}
        <div class="news-content">
            <div class="news-date">${news.date}</div>
            <h3>${news.title}</h3>
            <p>${news.summary}</p>
            <a href="#" class="read-more">اقرأ المزيد</a>
        </div>
    `;
    return newsItem;
}

// Language toggle functions
function initializeLanguageToggle() {
    const languageToggle = document.getElementById('languageToggle');
    if (!languageToggle) return;

    // Check saved language preference
    const savedLanguage = localStorage.getItem('siteLanguage') || 'ar';
    setLanguage(savedLanguage);

    languageToggle.addEventListener('click', function() {
        const currentLang = document.body.classList.contains('english') ? 'en' : 'ar';
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
        localStorage.setItem('siteLanguage', newLang);
    });
}

function setLanguage(language) {
    const body = document.body;
    const languageToggle = document.getElementById('languageToggle');

    if (language === 'en') {
        body.classList.add('english');
        body.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
        if (languageToggle) languageToggle.textContent = 'العربية';
        translateContent('en');
    } else {
        body.classList.remove('english');
        body.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
        if (languageToggle) languageToggle.textContent = 'English';
        translateContent('ar');
    }
}

function translateContent(language) {
    const translations = {
        ar: {
            // Navigation
            'Home': 'الرئيسية',
            'About Us': 'من نحن',
            'Our Vision': 'رؤيتنا',
            'Our Mission': 'رسالتنا',
            'Organization': 'الهيكل التنظيمي',
            'Programs': 'البرامج',
            'Awards & Recognition': 'التكريمات والجوائز',
            'Our Partners': 'شركاؤنا',
            'Articles': 'المقالات',
            'Members': 'الأعضاء',
            'Contact Us': 'تواصل معنا',
            'Join Us': 'انضم إلينا',

            // Hero section
            'Welcome to Wareeth': 'حياكم الله في وريث',
            'Living Heritage & Lasting Traditions': 'إرثٌ باقٍ و تقاليدُ حية',
            'Get Started': 'ابدأ الآن',

            // Sections
            'Wareeth': 'وريث',
            'Vision': 'الرؤية',
            'Mission': 'الرسالة',
            'News and Announcements': 'الأخبار والإعلانات',
            'Wareeth Team Statistics': 'إحصائيات فريق وريث',
            'Our Partners and Supporters': 'شركاؤنا والداعمون',
            'Join Wareeth Volunteer Team': 'انضم إلى فريق وريث التطوعي',

            // Statistics
            'Total Volunteer Hours': 'إجمالي ساعات التطوع',
            'Number of Volunteers': 'عدد المتطوعين',
            'Number of Places': 'عدد الأماكن',
            'Program Beneficiaries': 'المستفيدون من البرامج والمساهمات',

            // News
            'Read More': 'اقرأ المزيد',
            'View All News': 'عرض جميع الأخبار',

            // Join section
            'Be part of our journey in preserving heritage and spreading authentic Arab culture': 'كن جزءاً من رحلتنا في حفظ التراث ونشر الثقافة العربية الأصيلة',
            'Join the Team': 'الانضمام للفريق',

            // Footer
            'Contact Information': 'معلومات الاتصال',
            'Useful Links': 'روابط مفيدة',
            'Follow us on social media': 'تابعنا على وسائل التواصل الاجتماعي',
            'Privacy Policy': 'سياسة الخصوصية',
            'Terms of Use': 'شروط الاستخدام',
            'Technical Support': 'الدعم الفني',
            'All rights reserved - Wareeth': 'جميع الحقوق محفوظة - وريث'
        },
        en: {
            // Navigation  
            'الرئيسية': 'Home',
            'من نحن': 'About Us',
            'رؤيتنا': 'Our Vision',
            'رسالتنا': 'Our Mission',
            'الهيكل التنظيمي': 'Organization',
            'البرامج': 'Programs',
            'التكريمات والجوائز': 'Awards & Recognition',
            'شركاؤنا': 'Our Partners',
            'المقالات': 'Articles',
            'الأعضاء': 'Members',
            'تواصل معنا': 'Contact Us',
            'انضم إلينا': 'Join Us',

            // Hero section
            'حياكم الله في وريث': 'Welcome to Wareeth',
            'إرثٌ باقٍ و تقاليدُ حية': 'Living Heritage & Lasting Traditions',
            'ابدأ الآن': 'Get Started',

            // Sections
            'وريث': 'Wareeth',
            'الرؤية': 'Vision',
            'الرسالة': 'Mission',
            'الأخبار والإعلانات': 'News and Announcements',
            'إحصائيات فريق وريث': 'Wareeth Team Statistics',
            'شركاؤنا والداعمون': 'Our Partners and Supporters',
            'انضم إلى فريق وريث التطوعي': 'Join Wareeth Volunteer Team',

            // Statistics
            'إجمالي ساعات التطوع': 'Total Volunteer Hours',
            'عدد المتطوعين': 'Number of Volunteers',
            'عدد الأماكن': 'Number of Places',
            'المستفيدون من البرامج والمساهمات': 'Program Beneficiaries',

            // News
            'اقرأ المزيد': 'Read More',
            'عرض جميع الأخبار': 'View All News',

            // Join section
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
        }
    };

    // Function to translate element text
    function translateElement(element, translations) {
        const text = element.textContent.trim();
        if (translations[text]) {
            element.textContent = translations[text];
            element.setAttribute('data-translated', 'true');
        }
    }

    // Get current translations
    const currentTranslations = translations[language] || {};

    // Translate navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => translateElement(link, currentTranslations));

    // Translate user menu items
    const userMenuItems = document.querySelectorAll('.user-menu-item');
    userMenuItems.forEach(item => translateElement(item, currentTranslations));

    // Translate buttons
    const buttons = document.querySelectorAll('button, .btn, .cta-button, .join-btn, .view-all-btn');
    buttons.forEach(button => {
        if (!button.querySelector('i')) { // Skip buttons with icons only
            translateElement(button, currentTranslations);
        }
    });

    // Translate headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => translateElement(heading, currentTranslations));

    // Translate paragraphs in specific sections
    const paragraphs = document.querySelectorAll('.about-text p, .vision-text, .mission-text, .join-section p');
    paragraphs.forEach(p => translateElement(p, currentTranslations));

    // Translate footer content
    const footerSections = document.querySelectorAll('.footer-section h3, .footer-bottom p');
    footerSections.forEach(section => translateElement(section, currentTranslations));

    // Translate statistics labels
    const statLabels = document.querySelectorAll('.stat-label');
    statLabels.forEach(label => translateElement(label, currentTranslations));

    // Translate read more links
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => translateElement(link, currentTranslations));

    // Translate footer links
    const footerLinks = document.querySelectorAll('.footer-section ul li a');
    footerLinks.forEach(link => translateElement(link, currentTranslations));

    // Translate logo subtitle if needed
    const logoSubtitle = document.querySelector('.logo-subtitle');
    if (logoSubtitle) {
        const subtitleText = logoSubtitle.textContent.trim();
        if (language === 'en' && subtitleText === 'فريق تطوعي - إرث باقٍ وتاريخ حي') {
            logoSubtitle.textContent = 'Volunteer Team - Living Heritage & History';
        } else if (language === 'ar' && subtitleText === 'Volunteer Team - Living Heritage & History') {
            logoSubtitle.textContent = 'فريق تطوعي - إرث باقٍ وتاريخ حي';
        }
    }

    // Update placeholder texts for forms if they exist
    const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    inputs.forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        if (currentTranslations[placeholder]) {
            input.setAttribute('placeholder', currentTranslations[placeholder]);
        }
    });
}

// News Slider Functionality
let currentNewsSlide = 0;
let totalNewsSlides = 0;

function initializeNewsSlider() {
    const newsTrack = document.getElementById('newsTrack');
    const prevBtn = document.getElementById('prevNewsBtn');
    const nextBtn = document.getElementById('nextNewsBtn');
    const indicatorsContainer = document.getElementById('newsIndicators');

    if (!newsTrack) return;

    // Count total slides
    const slides = newsTrack.querySelectorAll('.news-slide');
    totalNewsSlides = slides.length;

    // Create indicators
    createNewsIndicators(indicatorsContainer);

    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentNewsSlide > 0) {
                currentNewsSlide--;
                updateNewsSlider();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentNewsSlide < totalNewsSlides - 1) {
                currentNewsSlide++;
                updateNewsSlider();
            }
        });
    }

    // Auto-slide functionality (optional)
    startNewsAutoSlide();

    // Touch/swipe support for mobile
    addSwipeSupport(newsTrack);

    // Initial update
    updateNewsSlider();
}

function createNewsIndicators(container) {
    if (!container) return;

    container.innerHTML = '';
    for (let i = 0; i < totalNewsSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'news-indicator';
        indicator.addEventListener('click', () => {
            currentNewsSlide = i;
            updateNewsSlider();
        });
        container.appendChild(indicator);
    }
}

function updateNewsSlider() {
    const newsTrack = document.getElementById('newsTrack');
    const prevBtn = document.getElementById('prevNewsBtn');
    const nextBtn = document.getElementById('nextNewsBtn');
    const indicators = document.querySelectorAll('.news-indicator');

    if (!newsTrack) return;

    // Move the track
    const translateX = -currentNewsSlide * 100;
    newsTrack.style.transform = `translateX(${translateX}%)`;

    // Update button states
    if (prevBtn) {
        prevBtn.disabled = currentNewsSlide === 0;
    }
    if (nextBtn) {
        nextBtn.disabled = currentNewsSlide === totalNewsSlides - 1;
    }

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentNewsSlide);
    });
}

function startNewsAutoSlide() {
    const autoSlideInterval = 5000; // 5 seconds

    setInterval(() => {
        if (currentNewsSlide < totalNewsSlides - 1) {
            currentNewsSlide++;
        } else {
            currentNewsSlide = 0;
        }
        updateNewsSlider();
    }, autoSlideInterval);
}

function addSwipeSupport(element) {
    let startX = 0;
    let endX = 0;

    element.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    element.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentNewsSlide < totalNewsSlides - 1) {
                // Swipe left - next slide
                currentNewsSlide++;
                updateNewsSlider();
            } else if (diff < 0 && currentNewsSlide > 0) {
                // Swipe right - previous slide
                currentNewsSlide--;
                updateNewsSlider();
            }
        }
    }
}

// Initialize CTA and join buttons
function initializeCTAButtons() {
    // Handle CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .join-btn, .join-hero-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') {
                e.preventDefault();
                window.location.href = 'join.html';
            }
        });
    });

    // Handle view all news button
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            window.location.href = 'articles.html';
        });
    }

    // Handle read more links
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('ستتم إضافة تفاصيل المقال قريباً', 'info');
        });
    });

    // Handle social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('http')) {
                // Allow external links to work normally
                return true;
            } else {
                e.preventDefault();
                showNotification('رابط وسائل التواصل قيد التحديث', 'info');
            }
        });
    });
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
        userMenu.classList.toggle('active');
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

// Function to show notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => notification.remove());

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS for notifications
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(notificationStyle);