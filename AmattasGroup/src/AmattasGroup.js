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
                event.preventDefault(); 
                const option = clickedCard.dataset.option;

                // Trigger Systeme.io popup based on the option
                if (option === 'Real Estate') {
                    systemeio.showPopup('15513494'); // Replace with actual Systeme.io function
                } else if (option === 'Telecommunications') {
                    systemeio.showPopup('15513236');
                } else if (option === 'Solar') {
                    systemeio.showPopup('15513637');
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

     // Overlay and Systeme.io form handling
    //  const overlay = document.getElementById('overlay');
    //  const clickMeButtons = document.querySelectorAll('.systeme-show-popup-15513494, .systeme-show-popup-15513236, .systeme-show-popup-15513637');
     
    //  if (overlay) {
    //      let systemeIframe = null;
     
    //      function closeForm() {
    //          overlay.style.display = 'none';
    //          document.body.style.overflow = 'auto'; 
     
    //          if (systemeIframe) {
    //              systemeIframe.style.display = 'none'; 
    //              systemeIframe = null; 
    //          }
    //      }
     
    //      clickMeButtons.forEach(button => {
    //          button.addEventListener('click', () => {
    //              document.body.style.overflow = 'hidden';
    //              overlay.style.display = 'block';
     
    //              const popupId = button.dataset.popupId;
     
    //              if (popupId) {  
    //                  systemeio.showPopup(popupId).then((iframe) => {
    //                     systemeIframe = iframe; 
    //                  });
    //              } else {
    //                  console.error("No popup ID found on the button!");
    //              }
     
    //          });
    //      });
     
    //      overlay.addEventListener('click', (event) => {
    //          // Check if the click target is within the systemeIframe
    //          if (systemeIframe && systemeIframe.contains(event.target)) {
    //              // Click is inside the iframe, do nothing
    //             return; 
    //          } else {
    //             // Click is outside the iframe, close the form
    //             closeForm();
    //          }
    //      });
     
     
    //      document.addEventListener('systemePopupClose', closeForm); 
     
    //  } else {
    //      console.error("Overlay element not found!");
    //  }
     

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
        disable: 'mobile',
        offset: 50 // Adjust this value if needed
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

function scrollToSection(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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


    window.closeForm = function() {
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

    // Overlay click to close form
    // const overlay = document.getElementById('overlay');
    // if (overlay) {
    //     overlay.addEventListener('click', closeForm);
    // }

    // Close button click to close form
    const closeButton = document.querySelector('button[type="button"]');
    if (closeButton) {
        closeButton.addEventListener('click', closeForm);
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(reg) {
        console.log('Service worker registered!', reg);
      }).catch(function(err) {
        console.error('Service worker registration failed: ', err);
      });
    });
  }
  
  