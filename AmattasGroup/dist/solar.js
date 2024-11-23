// Countdown Timer Functionality
// function startCountdown(duration) {
//     let timer = duration, hours, minutes, seconds;
//     const timerDisplay = document.getElementById('timer');

//     const countdownInterval = setInterval(function () {
//         hours = parseInt(timer / 3600, 10);
//         minutes = parseInt((timer % 3600) / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         // Format hours, minutes, and seconds with two digits
//         hours = hours < 10 ? "0" + hours : hours;
//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         // Display updated time
//         timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;

//         // When time is up, stop the countdown and show "Time's up!"
//         if (--timer < 0) {
//             clearInterval(countdownInterval);
//             timerDisplay.textContent = "Time's up!";
//             document.querySelector('.whatsapp-button').style.display = 'none'; // Hide WhatsApp button
//         }
//     }, 1000);
// }

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
