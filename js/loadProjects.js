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

        document.getElementById('modal-title').innerText = project.title;
        const modalDescription = document.getElementById('modal-description');
        if (modalDescription) {
            modalDescription.innerHTML = project.description;
        }

        const externalLinkContainer = document.getElementById('modal-external-link');
        if (externalLinkContainer) {
            externalLinkContainer.innerHTML = project.externalLinkHtml || '';
        }

        swipableGallery.innerHTML = '';
        project.galleryImages.forEach(imgData => {
            const src = typeof imgData === 'string' ? imgData : imgData.src;
            const fileExtension = src.split('.').pop().toLowerCase();
            const item = document.createElement('div');
            item.classList.add('gallery-item');
            
            if (['mp4', 'webm', 'ogg', 'mov'].includes(fileExtension)) {
                item.innerHTML = `<video src="${src}" controls loop autoplay muted></video>`;
            } else {
                item.innerHTML = `<img src="${src}" alt="${project.title} gallery item" />`;
            }
            swipableGallery.appendChild(item);
        });

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