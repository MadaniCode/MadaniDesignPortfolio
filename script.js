
document.addEventListener('DOMContentLoaded', () => {
    // Basic fade-in for main content on load
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('fade-in-active'); // Add a class to trigger fade-in
    }

    // Add any other global script functionality here
    // Example: mobile menu toggles, general animations, etc.
});