/**
 * Hippocampus Academy - Main JavaScript File
 * Provides interactivity for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMobileMenu();
    initFaqAccordion();
    initTestimonialSlider();
    initContactForm();
    initDarkMode();
    
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    
    // If menu toggle button doesn't exist, add it for mobile
    if (!menuToggle && window.innerWidth <= 768) {
        const header = document.querySelector('header .container');
        const nav = document.querySelector('nav');
        
        if (header && nav) {
            // Create menu toggle button
            const toggle = document.createElement('div');
            toggle.className = 'menu-toggle';
            toggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Insert before nav
            header.insertBefore(toggle, nav);
            
            // Hide nav initially on mobile
            nav.style.display = 'none';
            
            // Add click event
            toggle.addEventListener('click', function() {
                if (nav.style.display === 'none') {
                    nav.style.display = 'block';
                    toggle.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    nav.style.display = 'none';
                    toggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInside = header.contains(event.target);
                
                if (!isClickInside && nav.style.display === 'block' && window.innerWidth <= 768) {
                    nav.style.display = 'none';
                    toggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        }
    }
}

/**
 * FAQ Accordion Functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * Testimonial Slider Functionality
 * Simple manual testimonial rotation
 */
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider && testimonialSlider.children.length > 2) {
        let currentIndex = 0;
        const testimonials = Array.from(testimonialSlider.children);
        const totalTestimonials = testimonials.length;
        
        // Only show 2 testimonials at a time
        const updateVisibleTestimonials = () => {
            testimonials.forEach((testimonial, index) => {
                if (index === currentIndex || index === (currentIndex + 1) % totalTestimonials) {
                    testimonial.style.display = 'block';
                } else {
                    testimonial.style.display = 'none';
                }
            });
        };
        
        // Add navigation buttons
        const navButtons = document.createElement('div');
        navButtons.className = 'testimonial-nav';
        navButtons.innerHTML = `
            <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        `;
        
        testimonialSlider.parentNode.appendChild(navButtons);
        
        // Add click events
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
                updateVisibleTestimonials();
            });
            
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalTestimonials;
                updateVisibleTestimonials();
            });
        }
        
        // Initialize
        updateVisibleTestimonials();
    }
}

/**
 * Contact Form Validation and Submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const consent = document.getElementById('consent');
            
            let isValid = true;
            
            // Clear previous error states
            const formElements = contactForm.querySelectorAll('input, textarea, select');
            formElements.forEach(element => {
                element.classList.remove('error');
            });
            
            // Validate required fields
            if (!name.value.trim()) {
                name.classList.add('error');
                isValid = false;
            }
            
            if (!email.value.trim()) {
                email.classList.add('error');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                email.classList.add('error');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                message.classList.add('error');
                isValid = false;
            }
            
            if (consent && !consent.checked) {
                consent.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                // In a real implementation, this would send the form data to a server
                // For now, we'll just show a success message
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                
                // Hide form and show success message
                contactForm.style.display = 'none';
                contactForm.parentNode.appendChild(successMessage);
                
                // Reset form for possible future use
                contactForm.reset();
                
                // For demo purposes, restore the form after 5 seconds
                setTimeout(() => {
                    contactForm.style.display = 'block';
                    successMessage.remove();
                }, 5000);
            } else {
                // Scroll to the first error
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    window.scrollTo({
                        top: firstError.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
}

/**
 * Email validation helper function
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Dark Mode Functionality
 */
function initDarkMode() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Function to update the theme and icon styles
    const switchTheme = (theme) => {
        // Update HTML data attribute
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update local storage
        localStorage.setItem('theme', theme);
        
        // Update toggle switch
        toggleSwitch.checked = (theme === 'dark');
    };
    
    // Set initial theme
    if (currentTheme) {
        switchTheme(currentTheme);
    } else {
        // Check system preference if no stored preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkScheme) {
            switchTheme('dark');
        } else {
            switchTheme('light');
        }
    }
    
    // Add event listener for theme toggle
    toggleSwitch.addEventListener('change', function(e) {
        if (this.checked) {
            switchTheme('dark');
        } else {
            switchTheme('light');
        }
    });
    
    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) { // Only auto-switch if user hasn't set a preference
            switchTheme(e.matches ? 'dark' : 'light');
        }
    });
}

/**
 * Handle fixed header on scroll
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

/**
 * Update copyright year automatically
 */
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    
    copyrightElements.forEach(element => {
        if (element.textContent.includes('Hippocampus Academy')) {
            element.textContent = `© ${currentYear} Hippocampus Academy. All rights reserved.`;
        }
    });
});
