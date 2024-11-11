// Function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
// Add click event listeners to clickable cards
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for the navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1); // Remove the '#'
            scrollToSection(targetId);
        });
        // Business Section Click Handling (using event delegation)
        const businessSection = document.getElementById('businessSection');

        businessSection.addEventListener('click', (event) => {
            const clickedCard = event.target.closest('.clickable-card');

            if (clickedCard) {
                const option = clickedCard.dataset.option;
                
                // Trigger Systeme.io popup based on the option
                if (option === 'Real Estate') {
                    systemeio.showPopup('15065818'); // Replace with actual Systeme.io function
                } else if (option === 'Telecommunications') {
                    systemeio.showPopup('15065298');
                } else if (option === 'Solar') {
                    systemeio.showPopup('15065655');
                    document.getElementById('overlay').style.display = 'block'; // Show the dummy overlay
                }
              // Then, display the corresponding form (you'll need to add logic for this)
                    // Example:
                    if (option === 'Real Estate') {
                        document.getElementById('real-estate-form').style.display = 'block';
                    } else if (option === 'Telecommunications') {
                        document.getElementById('telecommunications-form').style.display = 'block';
                    } else if (option === 'Solar') {
                        document.getElementById('solar-form').style.display = 'block';
                    }
            }
        })
        
        // Add an event listener to detect when the Systeme.io popup closes
        document.addEventListener('systemePopupClose', () => {
            console.log('Systeme.io popup closed.');
            document.getElementById('overlay').style.display = 'none'; // Hide the dummy overlay
        });
    });

    window.onload = function () {
        // Countdown Timer (5-hour countdown)
        let countdownDate = new Date().getTime() + (5 * 60 * 60 * 1000);
        let timerInterval = setInterval(function () {
            let now = new Date().getTime();
            let distance = countdownDate - now;
            let hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            let minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            let seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
            document.getElementById('time').innerHTML = `${hours}:${minutes}:${seconds}`;

            if (distance < 0) {
                clearInterval(timerInterval);
                document.getElementById('time').innerHTML = "Expired";
            }
        }, 1000);

        // Lazy Load Sections
        let lazySections = document.querySelectorAll('.lazy-section');
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        });
        lazySections.forEach(section => observer.observe(section));

        // Initialize AOS (Animate on Scroll)
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
        });

        function showPromptMessage() {
            const promptMessage = document.getElementById('promptMessage');
            if (promptMessage) {
                promptMessage.style.display = 'block';
                promptMessage.style.opacity = 0;

                const fadeInEffect = setInterval(() => {
                    if (promptMessage.style.opacity >= 1) {
                        clearInterval(fadeInEffect);
                    } else {
                        promptMessage.style.opacity = parseFloat(promptMessage.style.opacity) + 0.1;
                    }
                }, 50);

                setTimeout(() => {
                    hidePromptMessage(promptMessage);
                }, 8000);
            }
        }

        function hidePromptMessage(promptMessage) {
            promptMessage.style.display = 'none';
        }

        // Show prompt when business section is in view
        window.addEventListener('scroll', function () {
            const businessSection = document.getElementById('businessSection');
            if (businessSection.getBoundingClientRect().top < window.innerHeight) {
                showPromptMessage();
            }
        });

        // Overlay click to close form
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.addEventListener('click', closeForm);
        }

        // Close button click to close form
        const closeButton = document.querySelector('button[type="button"]');
        if (closeButton) {
            closeButton.addEventListener('click', closeForm);
        }
    };
});

   

    







