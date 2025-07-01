/**
 * Main JavaScript file for InGenium website
 */

// Function to load HTML components
function loadComponent(elementId, componentPath) {
    const element = document.getElementById(elementId);
    if (element) {
        fetch(componentPath)
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading component:', error);
                element.innerHTML = '<p>Error loading component</p>';
            });
    }
}

// When the DOM is fully loaded, initialize components
document.addEventListener('DOMContentLoaded', function() {
    // Only load the header if the placeholder exists and the page doesn't already have a header
    if (document.getElementById('header-placeholder') && !document.querySelector('body > header')) {
        loadComponent('header-placeholder', '../components/header.html');
    }
    
    // Load header into div#header elements
    if (document.getElementById('header')) {
        loadComponent('header', '../components/header.html');
    }
    
    // Load footer component
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('../components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }

    // Handle page-specific JavaScript
    initPageSpecificFunctionality();
});

/**
 * Initialize functionality specific to different pages
 */
function initPageSpecificFunctionality() {
    // Get the current page URL
    const currentPage = window.location.pathname.split('/').pop();
    
    // Apply active state to current navigation item
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Testimonials rotation (for pages that have testimonials)
    loadTestimonials();
}

/**
 * Load testimonials dynamically
 */
function loadTestimonials() {
    const testimonialPlaceholder = document.getElementById('testimonial-placeholder');
    if (!testimonialPlaceholder) return;
    
    // Sample testimonials data
    const testimonials = [
        {
            text: "InGenium helped me transform my business idea into reality. Their financial guidance and branding tools were exactly what I needed to get started.",
            author: "Sophia Chen",
            position: "Founder, Coders Over Borders",
            initial: "SC"
        },
        {
            text: "The business management tools save me hours every week. I can focus on growing my business instead of getting lost in spreadsheets.",
            author: "Marcus Johnson",
            position: "Owner, Pre-Kitchen",
            initial: "MJ"
        },
        {
            text: "As a first-time entrepreneur, I was overwhelmed until I found InGenium. Their step-by-step guidance made launching my business manageable and exciting.",
            author: "Ava Williams",
            position: "CEO, nutriLens",
            initial: "AW"
        }
    ];
    
    // Create HTML for testimonials
    let testimonialHTML = '';
    testimonials.forEach(testimonial => {
        testimonialHTML += `
            <div class="testimonial">
                <p>"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <div class="author-avatar">${testimonial.initial}</div>
                    <div>
                        <p class="author-name">${testimonial.author}</p>
                        <p class="author-location">${testimonial.position}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    // Insert testimonials into the placeholder
    testimonialPlaceholder.innerHTML = testimonialHTML;
}
