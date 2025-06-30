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
    if (document.getElementById('footer-placeholder')) {
        loadComponent('footer-placeholder', '../components/footer.html');
    }
    
    if (document.getElementById('footer')) {
        loadComponent('footer', '../components/footer.html');
    }
    
    // Load testimonial component
    if (document.getElementById('testimonial-placeholder')) {
        loadComponent('testimonial-placeholder', '../components/testimonial-card.html');
    }
});