// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const backToTopBtn = document.querySelector('.back-to-top');
const currentYear = document.getElementById('current-year');
const contactForm = document.getElementById('contact-form');

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80; // Height of your navbar
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        try {
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual form submission)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            showAlert('Oops! Something went wrong. Please try again later.', 'error');
            console.error('Form submission error:', error);
            
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Show alert message
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Add styles
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.padding = '15px 25px';
    alertDiv.style.borderRadius = '4px';
    alertDiv.style.color = 'white';
    alertDiv.style.fontWeight = '500';
    alertDiv.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.transform = 'translateX(120%)';
    alertDiv.style.transition = 'transform 0.3s ease-in-out';
    
    // Set background color based on type
    if (type === 'success') {
        alertDiv.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        alertDiv.style.backgroundColor = '#ef4444';
    } else {
        alertDiv.style.backgroundColor = '#3b82f6';
    }
    
    // Add to DOM
    document.body.appendChild(alertDiv);
    
    // Trigger reflow
    alertDiv.offsetHeight;
    
    // Slide in
    alertDiv.style.transform = 'translateX(0)';
    
    // Remove after delay
    setTimeout(() => {
        alertDiv.style.transform = 'translateX(120%)';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 5000);
}

// Intersection Observer for scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('animate-on-scroll');
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Add animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${0.2 + (index * 0.1)}s`;
    });
    
    // Add animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.animationDelay = `${0.1 + (index * 0.05)}s`;
    });
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page is visible again, reinitialize animations
        animateOnScroll();
    }
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    });
});

// Add loading animation to images
const lazyLoadImages = () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
};

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = `#${section.id}`;
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
});
