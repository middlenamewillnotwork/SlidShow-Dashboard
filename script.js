document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const adminPreview = document.getElementById('adminPreview');
    const dashboardNameInput = document.getElementById('dashboardName');
    const slideshowDuration = document.getElementById('slideshowDuration');
    const updateSettingsButton = document.getElementById('updateSettingsButton');
    const openDashboardButton = document.getElementById('openDashboardButton');
    


    // Function to load admin data from localStorage
    const loadAdminData = () => {
        const images = JSON.parse(localStorage.getItem('images')) || [];
        const dashboardName = localStorage.getItem('dashboardName') || 'Team Performance Dashboard';
        const duration = localStorage.getItem('slideshowDuration') || '5000';

        if (dashboardNameInput) dashboardNameInput.value = dashboardName;
        if (slideshowDuration) slideshowDuration.value = duration;

        if (adminPreview) {
            adminPreview.innerHTML = '';
            images.forEach((image, index) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'image-wrapper';

                const img = document.createElement('img');
                img.src = image;
                img.alt = `Image ${index + 1}`;
                img.className = 'admin-image';

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'X';
                deleteButton.className = 'delete-button';
                deleteButton.onclick = () => {
                    images.splice(index, 1);
                    localStorage.setItem('images', JSON.stringify(images));
                    loadAdminData();
                };

                wrapper.appendChild(img);
                wrapper.appendChild(deleteButton);
                adminPreview.appendChild(wrapper);
            });
        }
    };

    // Handle file upload
    if (uploadButton) {
        uploadButton.addEventListener('click', () => {
            const files = fileInput.files;

            if (!files.length) {
                alert('Please select at least one image to upload.');
                return;
            }

            const images = JSON.parse(localStorage.getItem('images')) || [];

            Array.from(files).forEach(file => {
                if (!file.type.startsWith('image/')) {
                    alert(`${file.name} is not a valid image file.`);
                    return;
                }

                const reader = new FileReader();

                reader.onload = (e) => {
                    images.push(e.target.result);
                    localStorage.setItem('images', JSON.stringify(images));
                    loadAdminData();
                };

                reader.onerror = () => {
                    alert(`Error reading file ${file.name}. Please try again.`);
                };

                reader.readAsDataURL(file);
            });

            fileInput.value = '';
        });
    }

    // Update dashboard name and slideshow duration
    if (updateSettingsButton) {
        updateSettingsButton.addEventListener('click', () => {
            const dashboardName = dashboardNameInput.value.trim();
            const duration = slideshowDuration.value;

            if (!dashboardName) {
                alert('Please enter a valid dashboard name.');
                return;
            }

            localStorage.setItem('dashboardName', dashboardName);
            localStorage.setItem('slideshowDuration', duration);
            alert(`Settings updated successfully:\n- Dashboard Name: ${dashboardName}\n- Slideshow Duration: ${duration / 1000} seconds.`);
        });
    }

    // Open Dashboard in a new tab
    if (openDashboardButton) {
        openDashboardButton.addEventListener('click', () => {
            window.open('dashboard.html', '_blank');
        });
    }

    loadAdminData();
});
