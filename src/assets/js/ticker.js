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
    tickerTrack.style.width = `${totalWidth}px`;
    
    // Animation function
    function animateTicker() {
        // Initial position
        let position = 0;
        let isPaused = false;
        
        // Animation loop
        function moveText() {
            if (!isPaused) {
                position -= 0.5; // Reduced speed from 1.5 to 0.5 for slower movement
                
                // Reset position when the first set of items has scrolled through
                if (position <= -totalWidth/2) {
                    position = 0;
                }
                
                // Apply the position
                tickerTrack.style.transform = `translateX(${position}px)`;
            }
            
            // Continue the animation
            requestAnimationFrame(moveText);
        }
        
        // Start the animation
        moveText();
        
        // Add pause on hover functionality
        const tickerWrapper = document.querySelector('.ticker-wrapper');
        if (tickerWrapper) {
            tickerWrapper.addEventListener('mouseenter', function() {
                isPaused = true;
            });
            
            tickerWrapper.addEventListener('mouseleave', function() {
                isPaused = false;
            });
        }
    }
    
    // Start animation with a small delay to ensure DOM is fully rendered
    setTimeout(animateTicker, 500);
    
    // Optional: Simulate real-time stock updates
    function simulateStockUpdates() {
        // Only run simulation every 10-15 seconds
        setInterval(() => {
            const stockItems = document.querySelectorAll('.ticker-item');
            
            // Randomly select one stock to update
            const randomIndex = Math.floor(Math.random() * (tickerItems.length));
            const stockToUpdate = stockItems[randomIndex];
            
            if (stockToUpdate) {
                const priceElement = stockToUpdate.querySelector('.price');
                const changeElement = stockToUpdate.querySelector('.change');
                const changeAmountElement = stockToUpdate.querySelector('.change-amount');
                
                if (priceElement && changeElement && changeAmountElement) {
                    // Get current price
                    let currentPrice = parseFloat(priceElement.textContent.replace('$', ''));
                    
                    // Generate a random change (-1.5% to +1.5%)
                    const percentChange = (Math.random() * 3 - 1.5) / 100;
                    const newPrice = currentPrice * (1 + percentChange);
                    const priceChange = newPrice - currentPrice;
                    
                    // Update the elements
                    priceElement.textContent = `$${newPrice.toFixed(2)}`;
                    
                    // Handle positive or negative changes
                    if (priceChange >= 0) {
                        changeElement.className = 'change positive';
                        changeElement.innerHTML = `<span class="arrow">↑</span>+${(percentChange * 100).toFixed(2)}%`;
                        changeAmountElement.className = 'change-amount positive';
                        changeAmountElement.textContent = `+$${Math.abs(priceChange).toFixed(2)}`;
                    } else {
                        changeElement.className = 'change negative';
                        changeElement.innerHTML = `<span class="arrow">↓</span>${(percentChange * 100).toFixed(2)}%`;
                        changeAmountElement.className = 'change-amount negative';
                        changeAmountElement.textContent = `-$${Math.abs(priceChange).toFixed(2)}`;
                    }
                    
                    // Add a flash effect to the updated item
                    stockToUpdate.style.transition = 'background-color 0.5s ease';
                    stockToUpdate.style.backgroundColor = priceChange >= 0 ? 'rgba(76, 217, 100, 0.1)' : 'rgba(255, 59, 48, 0.1)';
                    
                    setTimeout(() => {
                        stockToUpdate.style.backgroundColor = 'transparent';
                    }, 500);
                }
            }
        }, 12000); // Update a random stock every 12 seconds
    }
    
    // Uncomment the line below to enable simulated stock updates
    // simulateStockUpdates();
});
