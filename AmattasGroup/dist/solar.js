
// Initialize the countdown on page load (3 hours = 10800 seconds)
window.onload = function () {
    startCountdown(10800);
};

// WhatsApp Button Interaction
document.addEventListener('DOMContentLoaded', function () {
    const whatsappButton = document.querySelector('.whatsapp-button');

    if (whatsappButton) {
        whatsappButton.addEventListener('click', function () {
            alert("Thank you for joining our WhatsApp group! Our team is excited to support you on your solar journey.");
        });
    }
});
