/**
 * Stock Ticker Animation for InGenium
 */

document.addEventListener('DOMContentLoaded', function() {
    const tickerTrack = document.querySelector('.ticker-track');
    if (!tickerTrack) return;
    
    // Clone ticker items to ensure continuous scrolling
    const tickerItems = document.querySelectorAll('.ticker-item');
    tickerItems.forEach(item => {
        const clone = item.cloneNode(true);
        tickerTrack.appendChild(clone);
    });
    
    // Calculate the total width of all ticker items
    let totalWidth = 0;
    const allItems = document.querySelectorAll('.ticker-item');
    allItems.forEach(item => {
        totalWidth += item.offsetWidth;
    });
    
    // Set the width of the ticker track
    tickerTrack.style.width = totalWidth + 'px';
    
    // Animation variables
    let currentPosition = 0;
    const tickerSpeed = 0.5; // pixels per frame
    
    // Animation function
    function animateTicker() {
        currentPosition -= tickerSpeed;
        
        // Reset position when all items have scrolled through
        if (currentPosition <= -totalWidth / 2) {
            currentPosition = 0;
        }
        
        tickerTrack.style.transform = `translateX(${currentPosition}px)`;
        requestAnimationFrame(animateTicker);
    }
    
    // Start animation
    animateTicker();
    
    // Pause on hover
    tickerTrack.addEventListener('mouseenter', function() {
        tickerTrack.style.animationPlayState = 'paused';
    });
    
    tickerTrack.addEventListener('mouseleave', function() {
        tickerTrack.style.animationPlayState = 'running';
    });
});
