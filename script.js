// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });

    // CV download animation
    const cvButton = document.getElementById('cvButton');
    if (cvButton) {
        cvButton.addEventListener('click', function(e) {
            this.style.animation = 'bounce 0.5s';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add scroll animation for skill cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.skill-card').forEach((card) => {
        observer.observe(card);
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        // Initialize first testimonial as active
        testimonials[currentTestimonial].classList.add('active');
        
        // Function to change testimonial
        function changeTestimonial(index) {
            // Remove active class from current testimonial
            testimonials[currentTestimonial].classList.remove('active');
            
            // Update current testimonial index
            currentTestimonial = index;
            
            // Make sure the index is within bounds
            if (currentTestimonial < 0) {
                currentTestimonial = testimonials.length - 1;
            } else if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            
            // Add active class to new current testimonial
            testimonials[currentTestimonial].classList.add('active');
        }
        
        // Add event listeners to prev/next buttons
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                changeTestimonial(currentTestimonial - 1);
            });
            
            nextButton.addEventListener('click', () => {
                changeTestimonial(currentTestimonial + 1);
            });
        }
        
        // Auto rotate testimonials
        setInterval(() => {
            changeTestimonial(currentTestimonial + 1);
        }, 5000);
    }
});