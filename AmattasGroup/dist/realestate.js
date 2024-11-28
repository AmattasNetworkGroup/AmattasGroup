// Lazy Loading Animation for Sections
    const lazySections = document.querySelectorAll('.lazy-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Stop observing once animated in
            }
        });
    }, { threshold: 0.1 }); // Trigger animation when 10% of section is visible

    lazySections.forEach(section => observer.observe(section));

    // Add Animation for WhatsApp Button Click
    const whatsappButton = document.querySelector(".whatsapp-button");
    whatsappButton.addEventListener("click", function() {
        whatsappButton.classList.add("clicked-animation");

        setTimeout(() => {
            whatsappButton.classList.remove("clicked-animation");
        }, 200); // Animation duration in milliseconds
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

