// Timer Function (Reusable)
function startCountdown(durationInSeconds, displayElementId) {
    let countdownDate = new Date().getTime() + (durationInSeconds * 1000);
    let timerInterval = setInterval(function () {
        let now = new Date().getTime();
        let distance = countdownDate - now;

        let hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        let minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        let seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

        document.getElementById(displayElementId).innerHTML = `${hours}:${minutes}:${seconds}`;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById(displayElementId).innerHTML = "Expired";
        }
    }, 1000);

    return timerInterval; // Return the interval ID 
}

window.onload = function () {
    // Countdown Timer (5-hour countdown)
    startCountdown(5 * 60 * 60, 'time'); // 5 hours in seconds
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
}


