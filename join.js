
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Header scroll effect
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
    
    // Join form handling
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(joinForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!validateJoinForm(data)) {
                return;
            }
            
            // Process the application
            processJoinApplication(data);
        });
    }
    
    // Smooth animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.benefit-card, .step, .form-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form validation function
function validateJoinForm(data) {
    let isValid = true;
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
    
    // Check required fields
    const requiredFields = [
        { field: 'fullName', message: 'الاسم الثلاثي مطلوب' },
        { field: 'phone', message: 'رقم الجوال مطلوب' },
        { field: 'email', message: 'البريد الإلكتروني مطلوب' },
        { field: 'age', message: 'العمر مطلوب' },
        { field: 'university', message: 'الجامعة مطلوبة' },
        { field: 'major', message: 'التخصص الجامعي مطلوب' },
        { field: 'volunteer_experience', message: 'يرجى اختيار إجابة حول التجربة التطوعية' },
        { field: 'skills', message: 'يرجى ذكر المهارات التي تمتلكها' },
        { field: 'why_join', message: 'يرجى ذكر أسباب رغبتك في الانضمام' },
        { field: 'how_heard', message: 'يرجى اختيار كيف سمعت عن الفريق' }
    ];
    
    requiredFields.forEach(item => {
        if (!data[item.field] || data[item.field].trim() === '') {
            showError(item.field, item.message);
            isValid = false;
        }
    });
    
    // Validate email
    if (data.email && !isValidEmail(data.email)) {
        showError('email', 'البريد الإلكتروني غير صحيح');
        isValid = false;
    }
    
    // Validate phone
    if (data.phone && !isValidPhone(data.phone)) {
        showError('phone', 'رقم الجوال غير صحيح');
        isValid = false;
    }
    
    // Validate age
    if (data.age && (data.age < 16 || data.age > 60)) {
        showError('age', 'العمر يجب أن يكون بين 16 و 60 سنة');
        isValid = false;
    }
    
    return isValid;
}

// Show error message
function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (!field) return;
    
    let formGroup;
    if (fieldName === 'interests') {
        formGroup = document.querySelector('.checkbox-grid').parentNode;
    } else if (fieldName === 'terms') {
        formGroup = document.querySelector('#terms').closest('.checkbox-group');
    } else {
        formGroup = field.parentNode;
    }
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.style.fontWeight = '600';
    errorDiv.textContent = message;
    
    formGroup.appendChild(errorDiv);
    
    if (field.tagName !== 'INPUT' || field.type !== 'checkbox') {
        field.style.borderColor = '#e74c3c';
    }
    
    // Smooth scroll to error field
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => field.focus(), 100);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (Saudi format)
function isValidPhone(phone) {
    const phoneRegex = /^(\+966|966|0)?5[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("YOUR_PUBLIC_KEY"); // ستحتاج لاستبدال هذا بمفتاحك العام من EmailJS
});

// Process join application
function processJoinApplication(data) {
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Send email notification
    sendEmailNotification(data)
        .then(() => {
            // Save application to localStorage
            saveJoinApplication(data);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            document.getElementById('joinForm').reset();
            
            // Reset submit button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Clear any error styles
            document.querySelectorAll('input, select, textarea').forEach(field => {
                field.style.borderColor = '';
            });
        })
        .catch((error) => {
            console.error('خطأ في إرسال الإيميل:', error);
            
            // Still save locally and show success (email failure shouldn't stop the process)
            saveJoinApplication(data);
            showSuccessMessage();
            
            // Reset form and button
            document.getElementById('joinForm').reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show warning about email
            setTimeout(() => {
                alert('تم حفظ طلبك بنجاح، ولكن حدث خطأ في إرسال الإشعار الإلكتروني. سيتم مراجعة طلبك قريباً.');
            }, 1000);
        });
}

// Save join application
function saveJoinApplication(data) {
    // Get existing applications
    const existingApplications = JSON.parse(localStorage.getItem('joinApplications') || '[]');
    
    // Add timestamp and ID
    const application = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'pending',
        ...data
    };
    
    // Add to applications array
    existingApplications.push(application);
    
    // Save to localStorage
    localStorage.setItem('joinApplications', JSON.stringify(existingApplications));
    
    // Send email notification (simulate)
    sendEmailNotification(application);
}

// Send email notification using EmailJS
function sendEmailNotification(application) {
    const templateParams = {
        to_email: 'Wareethofficial@gmail.com',
        from_name: application.fullName,
        from_email: application.email,
        phone: application.phone,
        message: application.message || 'لم يتم إضافة رسالة',
        subject: 'طلب انضمام جديد - فريق وريث',
        reply_to: application.email,
        application_date: new Date().toLocaleDateString('ar-SA'),
        application_time: new Date().toLocaleTimeString('ar-SA')
    };

    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then((response) => {
            console.log('تم إرسال الإيميل بنجاح:', response.status, response.text);
            return response;
        })
        .catch((error) => {
            console.error('خطأ في إرسال الإيميل:', error);
            throw error;
        });
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    const joinForm = document.getElementById('joinForm');
    
    // Hide form and show success message
    joinForm.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto hide after 10 seconds and show form again
    setTimeout(() => {
        successMessage.style.display = 'none';
        joinForm.style.display = 'block';
        joinForm.reset();
    }, 10000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .error-message {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none !important;
    }
    
    .submit-btn .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
