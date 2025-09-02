// js/loadProjects.js (Updated to handle in-page modal)

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('.portfolio-grid');
    const projectModal = document.getElementById('project-modal');
    const modalContent = projectModal.querySelector('.modal-content');
    const modalCloseBtn = document.getElementById('modal-close');
    const swipableGallery = document.getElementById('swipable-gallery');

    if (projectsContainer) {
        projectsContainer.innerHTML = '';
        projects.forEach(project => {
            renderProjectCard(project, projectsContainer);
        });
    } else {
        console.error('Element with class .portfolio-grid not found.');
    }

    function renderProjectCard(project, container) {
        const projectCard = document.createElement('div');
        projectCard.classList.add('portfolio-item');
        projectCard.dataset.projectId = project.id;

        const mainImagePath = project.mainImage ? `${project.mainImage}` : 'placeholder.png';

        projectCard.innerHTML = `
            <a href="#" class="project-link">
                <h2>${project.title}</h2>
                <div class="tags-container">
                    ${project.tags.map(tag => `<span class="tag no-underline">${tag}</span>`).join('')}
                </div>
                <div class="project-thumbnail">
                    <img src="${mainImagePath}" alt="${project.title} main image" />
                </div>
            </a>
        `;
        container.appendChild(projectCard);

        projectCard.addEventListener('click', (e) => {
            e.preventDefault();
            openProjectModal(project.id);
        });
    }

    function openProjectModal(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project) {
            console.error(`Project with ID "${projectId}" not found.`);
            return;
        }

        // Title + Description
        document.getElementById('modal-title').innerText = project.title;
        const modalDescription = document.getElementById('modal-description');
        if (modalDescription) {
            modalDescription.innerHTML = project.description;
        }

        // External Link
        const externalLinkContainer = document.getElementById('modal-external-link');
        if (externalLinkContainer) {
            externalLinkContainer.innerHTML = project.externalLinkHtml || '';
        }

        // Gallery
        swipableGallery.innerHTML = '';
        project.galleryImages.forEach(imgData => {
            const src = typeof imgData === 'string' ? imgData : imgData.src;
            const fileExtension = src.split('.').pop().toLowerCase();
            const item = document.createElement('div');
            item.classList.add('gallery-item');

            if (['mp4', 'webm', 'ogg', 'mov'].includes(fileExtension)) {
                // Create video element
                const video = document.createElement('video');
                video.src = src;
                video.controls = true;
                video.loop = true;
                video.muted = true;
                video.preload = "metadata";  // lightweight loading
                video.playsInline = true;    // prevents fullscreen autoplay on iOS
                video.setAttribute("loading", "lazy");

                // Click-to-play toggle
                video.addEventListener('click', () => {
                    if (video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });

                item.appendChild(video);
            } else {
                // Create image element
                const img = document.createElement('img');
                img.src = src;
                img.alt = `${project.title} gallery item`;
                img.setAttribute("loading", "lazy");
                item.appendChild(img);
            }

            swipableGallery.appendChild(item);
        });

        // Show modal
        projectModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        projectModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    projectModal.addEventListener('click', (e) => {
        if (!modalContent.contains(e.target) && e.target !== modalContent) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
      if (projectModal.classList.contains('show') && e.key === 'Escape') {
        closeModal();
      }
    });
});