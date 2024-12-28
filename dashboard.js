document.addEventListener('DOMContentLoaded', () => {
    const slideshow = document.getElementById('slideshow');
    const dashboardTitle = document.getElementById('dashboardTitle');
    const fullscreenButton = document.getElementById('fullscreenButton');

    // Function to load and update the dashboard
    const loadDashboard = () => {
        const images = JSON.parse(localStorage.getItem('images')) || [];
        const dashboardName = localStorage.getItem('dashboardName') || 'Team Performance Dashboard';
        const duration = parseInt(localStorage.getItem('slideshowDuration')) || 5000;

        dashboardTitle.textContent = dashboardName;

        if (!images.length) {
            slideshow.innerHTML = '<p>No images available for the slideshow.</p>';
            return;
        }

        slideshow.innerHTML = '';
        images.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image;
            img.style.display = index === 0 ? 'block' : 'none';
            img.className = 'slideshow-image';
            slideshow.appendChild(img);
        });

        let currentIndex = 0;
        const imageElements = slideshow.children;

        setInterval(() => {
            imageElements[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % images.length;
            imageElements[currentIndex].style.display = 'block';
        }, duration);
    };

    loadDashboard();

    // Function to toggle fullscreen mode
    const goFullScreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    };

    // Listen for the "▶️" button click to go fullscreen
    fullscreenButton.addEventListener('click', goFullScreen);

    // Listen for the ESC key to exit fullscreen
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && document.fullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
        }
    });
});
