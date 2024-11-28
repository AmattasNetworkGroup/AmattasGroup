
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
