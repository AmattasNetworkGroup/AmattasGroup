// Countdown Timer for the Exclusive Offer
document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('timer');
    const targetDate = new Date(); 
    targetDate.setHours(targetDate.getHours() + 5); // Countdown for 5 hours

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            timerElement.innerHTML = "Offer expired";
            clearInterval(timerInterval);
            return;
        }

        const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

        timerElement.innerHTML = `${hours}:${minutes}:${seconds}`;
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call
});


// Lazy Loading for Sections and Images
document.addEventListener('DOMContentLoaded', () => {
    const lazySections = document.querySelectorAll('.lazy-section');
    
    const lazyLoad = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    lazySections.forEach(section => lazyLoad.observe(section));
});

// Add Hover Effect to Images
const images = document.querySelectorAll('.picture-section img');
images.forEach(img => {
    img.addEventListener('mouseover', () => img.classList.add('hovered'));
    img.addEventListener('mouseout', () => img.classList.remove('hovered'));
});

// WhatsApp Button Smooth Scroll (in case there are anchors on the page)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
