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
    
        // Function to open the form popup and center it
        function openForm(businessOption, businessUrl, element) {
            const popupModal = document.getElementById('popupModal');
            const overlay = document.getElementById('overlay');
            const selectedOption = document.getElementById('selectedOption');
            const businessUrlField = document.getElementById('businessUrl');
    
            // Set form values
            selectedOption.value = businessOption;
            businessUrlField.value = businessUrl;
    
            // if (selectedOption && businessUrlField) {
            //     selectedOption.value = option;
            //     businessUrlField.value = url;
            // } else {
            //     console.error('Form elements not found!');
            //     return;
            // }
    
            // Smooth scroll to the form's position
            const rect = element.getBoundingClientRect();
            const offsetY = rect.top + window.scrollY - window.innerHeight / 2 + popupModal.offsetHeight / 2;
            window.scrollToSection({
                top: offsetY,
                behavior: 'smooth'
            });
    
            // Example calculation, adjust as needed
            const topPosition = window.innerHeight / 2 - popupModal.offsetHeight / 2;
            const leftPosition = window.innerWidth / 2 - popupModal.offsetWidth / 2;
    
    
    
            // Position the modal centrally on the page when clicked
            popupModal.style.top = `${window.scrollY + window.innerHeight / 2 - popupModal.offsetHeight / 2}px`;
            popupModal.style.left = `${window.innerWidth / 2 - popupModal.offsetWidth / 2}px`;
    
            // Center the form
            popupModal.style.top = '50%';
            popupModal.style.left = '50%';
            popupModal.style.transform = 'translate(-50%, -50%)';
    
    
            // Focus on the first input field
            // document.querySelector('input[name="name"]').focus();
    
            // Position the popup near the clicked card
            //  const rect = element.getBoundingClientRect();
            //  const topPosition = rect.top + window.scrollY + rect.height / 2 - popupModal.offsetHeight / 2; // Center vertically
            //  const leftPosition = rect.left + window.scrollX + rect.width / 2 - popupModal.offsetWidth / 2; // Center horizontally
    
            // Set the position of the modal
            popupModal.style.top = `${topPosition}px`;
            popupModal.style.left = `${leftPosition}px`;
    
            // Show the popup and overlay
            popupModal.style.display = 'block';
            overlay.style.display = 'block';
    
            // Add a slight delay to ensure the inputs are focusable before setting them as required
        setTimeout(() => {
            // Enable required fields for form interaction
            document.querySelectorAll('#signup-form input').forEach(input => {
                input.required = true;
            });
          }, 100);  // Adjust the delay time if needed
        }
    
    
        // Function to close the form
        function closeForm() {
            const popupModal = document.getElementById('popupModal');
            const overlay = document.getElementById('overlay');
    
    
            // Disable required fields to avoid focus errors
            document.querySelectorAll('#signup-form input').forEach(input => {
                input.required = false;
            });
    
            // Reset the form fields
            document.getElementById('signup-form').reset();
    
            popupModal.style.display = 'none';
            overlay.style.display = 'none';
        }
    
    
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
    
        // Show prompt message with fade-in
        function showPromptMessage() {
            const promptMessage = document.getElementById('promptMessage');
            if (promptMessage) {
                promptMessage.style.display = 'block';
                let opacity = 0;
                const fadeInEffect = setInterval(() => {
                    if (opacity >= 1) {
                        clearInterval(fadeInEffect);
                    } else {
                        promptMessage.style.opacity = opacity;
                        opacity += 0.1;
                    }
                }, 50);
    
                setTimeout(() => {
                    promptMessage.style.display = 'none';
                }, 8000);
            }
        }
    
        // Initial Prompt after delay
        setTimeout(showPromptMessage, 500);
    
        // Show prompt when business section is in view
        window.addEventListener('scroll', function () {
            const businessSection = document.getElementById('businessSection');
            if (businessSection.getBoundingClientRect().top < window.innerHeight) {
                showPromptMessage();
            }
        });
    
        // Form submission and redirection
        document.getElementById('signup-form').addEventListener('submit', function (event) {
            event.preventDefault();
            const businessUrl = document.getElementById('businessUrl').value;
            if (businessUrl) {
                window.location.href = businessUrl;
            } else {
                alert('Error: No business option selected.');
            }
        });
    
        // Clickable Card Event to open form
        // document.querySelectorAll('.clickable-card').forEach(card => {
        //     card.addEventListener('click', (event) => {
        //         event.preventDefault();
        //         const option = card.getAttribute('data-option');
        //         const url = card.getAttribute('data-url');
    
        //         if (option && url) {
        //             openForm(option, url, card); // Pass the card element to openForm
        //         } else {
        //             console.error('Error: Missing data attributes for option or URL');
        //         }
        //     });
        // });
    
        //Function to close the form popup
        // function closeForm() {
        //     document.getElementById('popupModal').style.display = 'none';
        //     document.getElementById('overlay').style.display = 'none';
        //  }
    
    
        document.querySelectorAll('.clickable-card').forEach(card => {
            card.addEventListener('click', (event) => {
                event.preventDefault();
                const option = card.getAttribute('data-option');
                const url = card.getAttribute('data-url');
    
                if (option && url) {
                    openForm(option, url, card);
                } else {
                    console.error('Error: Missing data attributes for option or URL');
                }
            });
        });
    
        // Overlay click to close form
        document.getElementById('overlay').addEventListener('click', closeForm);

        // Close button click to close form
    const closeButton = document.querySelector('button[type="button"]');
    if (closeButton) {
        closeButton.addEventListener('click', closeForm);
    }

 };    