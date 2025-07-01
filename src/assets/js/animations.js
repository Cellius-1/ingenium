/**
 * InGenium Animation System
 * Modern, sleek animations for better user experience
 */

// Initialize page transition before DOM fully loads
(function() {
    // Create transition overlay element if it doesn't exist
    let transitionElement = document.querySelector('.page-transition');
    if (!transitionElement) {
        transitionElement = document.createElement('div');
        transitionElement.className = 'page-transition active'; // Start as active
        document.body.appendChild(transitionElement);
    }
    
    // Trigger transition out after a very short delay to ensure it's visible first
    setTimeout(() => {
        transitionElement.classList.add('fade-out');
        setTimeout(() => {
            transitionElement.classList.remove('active');
        }, 500);
    }, 100);
})();

// Wait for DOM to be fully loaded for the rest of the animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initializeScrollAnimations();
    initializeHeaderEffects();
    initializeHoverEffects();
    initializePageTransitions();
    initializeFloatingElements();
    initializeParticleBackground();
});

/**
 * Handle scroll-based animations
 */
function initializeScrollAnimations() {
    // Get all elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.scroll-animated');
    
    // If there are no elements to animate, return
    if (animatedElements.length === 0) return;
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Check on initial load
    handleScrollAnimation();
}

/**
 * Handle header scroll effects
 */
function initializeHeaderEffects() {
    const header = document.querySelector('header');
    if (!header) return;
    
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();
    
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            const mobileNav = document.querySelector('.mobile-nav');
            if (mobileNav) {
                mobileNav.classList.toggle('active');
            }
        });
    }
}

/**
 * Add hover animation effects
 */
function initializeHoverEffects() {
    // Magnetic buttons effect
    const magneticButtons = document.querySelectorAll('.cta-button, .feature-button');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const buttonRect = this.getBoundingClientRect();
            const mouseX = e.clientX - buttonRect.left;
            const mouseY = e.clientY - buttonRect.top;
            
            const centerX = buttonRect.width / 2;
            const centerY = buttonRect.height / 2;
            
            const deltaX = (mouseX - centerX) / 10;
            const deltaY = (mouseY - centerY) / 10;
            
            this.style.transform = `translateY(-2px) translateX(${deltaX}px) translateY(${deltaY}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = "1";
        });
        
        card.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.style.zIndex = "";
            }, 300);
        });
    });
}

/**
 * Initialize page transition effects
 */
function initializePageTransitions() {
    // Make sure transition element exists
    let transitionElement = document.querySelector('.page-transition');
    if (!transitionElement) {
        transitionElement = document.createElement('div');
        transitionElement.className = 'page-transition';
        document.body.appendChild(transitionElement);
    }
    
    // Add click event to all internal links
    document.querySelectorAll('a[href^="/"]:not([target]), a[href^="./"]:not([target]), a[href^="../"]:not([target]), a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't transition for hash links on the same page
            if (href.startsWith('#') || href === '#') return;
            
            e.preventDefault();
            
            // Activate transition
            transitionElement.classList.add('active');
            
            // Navigate after transition
            setTimeout(() => {
                window.location.href = href;
            }, 300); // Shorter delay for better UX
        });
    });
}

/**
 * Initialize floating animation effects
 */
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.float');
    
    // Randomize the animation delay for floating elements
    floatingElements.forEach(element => {
        const randomDelay = Math.random() * 2;
        element.style.animationDelay = `${randomDelay}s`;
    });
    
    // Add float class to elements that should float
    document.querySelectorAll('.feature-icon, .step-number, .hero img').forEach(element => {
        if (!element.classList.contains('float')) {
            element.classList.add('float');
        }
    });
}

/**
 * Initialize particle background for hero section
 */
function initializeParticleBackground() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.5';
    
    // Insert canvas as first child of hero section
    heroSection.insertBefore(canvas, heroSection.firstChild);
    
    // Canvas setup
    const ctx = canvas.getContext('2d');
    let width = canvas.width = heroSection.offsetWidth;
    let height = canvas.height = heroSection.offsetHeight;
    
    // Particle settings
    const particleCount = 30;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            color: `rgba(123, 104, 238, ${Math.random() * 0.5 + 0.1})`,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25
        });
    }
    
    // Draw and animate particles
    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(particle => {
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > height) particle.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        // Draw connections between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(123, 104, 238, ${0.2 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(drawParticles);
    }
    
    // Handle resize
    window.addEventListener('resize', function() {
        width = canvas.width = heroSection.offsetWidth;
        height = canvas.height = heroSection.offsetHeight;
    });
    
    // Start animation
    drawParticles();
}

/**
 * Initialize scroll reveal animations for specific sections
 */
function initScrollReveal() {
    // Add scroll-animated classes to elements
    const sections = [
        { selector: '.feature-card', type: 'scroll-fade-in', stagger: true },
        { selector: '.testimonial', type: 'scroll-fade-in', stagger: true },
        { selector: '.step', type: 'scroll-fade-left', stagger: true },
        { selector: '.pricing-plan', type: 'scroll-scale', stagger: true },
        { selector: '.team-member', type: 'scroll-fade-in', stagger: true },
        { selector: '.info-card', type: 'scroll-fade-in', stagger: true }
    ];
    
    sections.forEach(section => {
        const elements = document.querySelectorAll(section.selector);
        
        elements.forEach((element, index) => {
            element.classList.add('scroll-animated', section.type);
            
            if (section.stagger) {
                element.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    });
}

// Run scroll reveal initialization
initScrollReveal();
