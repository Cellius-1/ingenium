/**
 * Animation for the business impact graph
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get all graph bars
    const graphBars = document.querySelectorAll('.graph-bar');
    if (graphBars.length === 0) return;
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to animate graph bars
    function animateGraphBars() {
        const graphContainer = document.querySelector('.graph-container');
        
        if (graphContainer && isInViewport(graphContainer)) {
            graphBars.forEach(bar => {
                const growthValue = bar.getAttribute('data-growth');
                const heightPercentage = (growthValue / 150) * 100; // 150% is max on y-axis
                
                // Add animation after a small delay
                setTimeout(() => {
                    bar.style.height = `${heightPercentage}%`;
                    bar.classList.add('animated');
                }, 100 + Math.random() * 400); // Stagger animations
            });
            
            // Remove scroll listener once animation is triggered
            window.removeEventListener('scroll', animateGraphBars);
        }
    }
    
    // Add hover effects to show business details
    graphBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            const business = this.getAttribute('data-business');
            const growth = this.getAttribute('data-growth');
            
            // Create or update tooltip
            let tooltip = document.querySelector('.graph-tooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.className = 'graph-tooltip';
                document.querySelector('.graph-container').appendChild(tooltip);
            }
            
            tooltip.innerHTML = `
                <strong>${business}</strong>
                <span>${growth}% Growth</span>
            `;
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            const container = document.querySelector('.graph-container').getBoundingClientRect();
            
            tooltip.style.left = `${rect.left - container.left + rect.width/2}px`;
            tooltip.style.bottom = `${rect.height + 10}px`;
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.opacity = '1';
        });
        
        bar.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.graph-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
            }
        });
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', animateGraphBars);
    
    // Run immediately to check if in viewport on page load
    animateGraphBars();
    
    // Add tooltip styles
    const style = document.createElement('style');
    style.textContent = `
        .graph-tooltip {
            position: absolute;
            background-color: var(--dark-secondary);
            color: var(--text-primary);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.9rem;
            z-index: 10;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            text-align: center;
            min-width: 120px;
        }
        
        .graph-tooltip strong {
            display: block;
            margin-bottom: 4px;
            white-space: nowrap;
        }
        
        .graph-tooltip span {
            color: var(--purple-primary);
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
});
