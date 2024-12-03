document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in effect on page load
window.addEventListener('load', function() {
    const heroSection = document.querySelector('.hero');
    const infoCards = document.querySelectorAll('.info-card');

    heroSection.style.opacity = 1; // Show hero section

    infoCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.animation = "fadeInUp 1.2s forwards"; // Trigger animation for info cards
        }, index * 200); // Delay each card's animation
    });
});