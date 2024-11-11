function closeForm() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.style.display = 'none';
    } else {
        console.error("Overlay element not found!");
    }
}
// Listen for Systeme.io's Popup Close Event
document.addEventListener('systemePopupClose', () => {
    console.log("Systeme.io popup closed."); 

    // Add any logic here that should run AFTER the popup closes.
});
// Function to handle form submission 
function handleFormSubmission(event) {
    event.preventDefault();
    // Add your form submission logic here, if necessary.  This might involve sending data to a server.
    console.log("Form submitted!");
}
//  event listener for form submission if a form exists
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmission);
});

