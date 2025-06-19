document.addEventListener('DOMContentLoaded', function() {
    const downloadButtonDiv = document.getElementById('android-download-button');

    // Function to check if it's an Android device
    function isAndroid() {
        return /Android/i.test(navigator.userAgent);
    }

    // Function to check if it's *not* an iPhone/iPad/iPod
    function isNotIOS() {
        return !/iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    // Function to check if it's not a PWA (standalone mode)
    function isNotPWA() {
        // Modern PWA detection (display-mode: standalone)
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return false; // It IS a PWA
        }
        // Fallback for older iOS PWA detection (less reliable for Android, but good to include)
        if (navigator.standalone) {
            return false; // It IS a PWA
        }
        return true; // NOT a PWA
    }

    // Function to check if it's not a desktop OS
    function isNotDesktop() {
        // Common desktop OS user agents
        return !/Macintosh|Windows|Linux x86_64/i.test(navigator.userAgent);
    }

    // Function to check if it's a tablet (more robust than just user agent for Android)
    function isTablet() {
        // Basic check: If it's Android AND doesn't contain 'Mobile' in userAgent,
        // it's likely a tablet. Also check for 'iPad' or 'Tablet'.
        // This is still heuristic and not 100% perfect.
        return (isAndroid() && !/Mobile|Mobi/i.test(navigator.userAgent)) || /iPad|Tablet/i.test(navigator.userAgent);
    }

    // Combine all conditions to determine if the button should be shown
    if (isAndroid() && isNotIOS() && isNotPWA() && isNotDesktop() && !isTablet()) {
        downloadButtonDiv.style.display = 'block'; // Show the div
    }

    // Optional: Add an event listener to the button itself for more complex actions
    // (Though for a simple link, the `onclick` in HTML is sufficient)
    const downloadButton = document.querySelector('#android-download-button button');
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            console.log('Android download button was clicked!');
            // You can add more logic here, like tracking the click
            // The actual navigation is handled by the `onclick` attribute in HTML
        });
    }
});
