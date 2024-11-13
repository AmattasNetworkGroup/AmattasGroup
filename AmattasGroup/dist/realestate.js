// Countdown Timer Functionality
document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById("timer");
    let timeRemaining = 3 * 60 * 60; // Set timer (in seconds) - here, set to 3 hours (3 * 60 * 60)

    // Function to update the timer every second
    function startCountdown() {
        const countdownInterval = setInterval(() => {
            let hours = Math.floor(timeRemaining / 3600);
            let minutes = Math.floor((timeRemaining % 3600) / 60);
            let seconds = timeRemaining % 60;

            // Format the time display to always show two digits
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            // Display the formatted time
            timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;

            // Decrease time remaining by one second
            timeRemaining--;

            // Stop the countdown when time is up
            if (timeRemaining < 0) {
                clearInterval(countdownInterval);
                timerDisplay.textContent = "00:00:00"; // Display when time is up
                alert("Time's up! Please join our WhatsApp group for exclusive benefits.");
            }
        }, 1000); // Update every second
    }

    startCountdown(); // Start the countdown timer

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
});
