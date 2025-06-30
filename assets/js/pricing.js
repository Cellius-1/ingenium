const pricingPlans = [
    {
        name: "Basic",
        price: 9.99,
        features: [
            "Local (city-level) financial aid assistance",
            "Personal branding ideas",
            "Content creation ideas"
        ]
    },
    {
        name: "Premiere",
        price: 19.99,
        features: [
            "All Basic features",
            "State-level financial aid support",
            "AI-enhanced personal branding",
            "Basic business planning tools"
        ]
    },
    {
        name: "Business",
        price: 49.99,
        features: [
            "Nationwide (U.S.) financial aid help",
            "Fully AI-generated content",
            "Comprehensive personal branding tools",
            "Advanced business analytics",
            "Priority support"
        ]
    }
];

function displayPricingPlans() {
    const pricingContainer = document.getElementById('pricing-plans');
    pricingPlans.forEach(plan => {
        const planElement = document.createElement('div');
        planElement.classList.add('pricing-plan');
        planElement.innerHTML = `
            <h3>${plan.name}</h3>
            <p>Price: $${plan.price.toFixed(2)}/month</p>
            <ul>
                ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button class="select-plan">Select Plan</button>
        `;
        pricingContainer.appendChild(planElement);
    });
}

document.addEventListener('DOMContentLoaded', displayPricingPlans);
