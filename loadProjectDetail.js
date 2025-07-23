document.addEventListener('DOMContentLoaded', () => {
    const projectId = document.body.dataset.projectId; // Get project ID from body attribute

    if (!projectId) {
        console.error('Project ID not found in data-project-id attribute.');
        return;
    }

    fetch('data/projects.json') // Updated path to data/projects.json
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load projects.json');
            }
            return response.json();
        })
        .then(projects => {
            const project = projects.find(p => p.id === projectId);
            if (project) {
                renderProjectDetail(project);
            } else {
                console.error(`Project with ID "${projectId}" not found.`);
                // Fallback for production if project is missing from JSON
                renderProjectDetail(getFallbackProject(projectId));
            }
        })
        .catch(error => {
            console.error('Error loading projects from JSON, falling back:', error);
            renderProjectDetail(getFallbackProject(projectId));
        });

    function getFallbackProject(id) {
        const fallbackProjects = [
            {
                "id": "keep-magazine",
                "title": "Keep Magazine",
                "tags": ["Web", "Branding", "Content Design", "Editorial"],
                "description": "Keep Magazine is a digital first magazine aimed at creatives. We have interviewed the likes of Dan Alves and Alex Clayton. This is a fallback description as projects.json failed to load.",
                "mainImage": "KeepMagazineImage.png", // Path adjusted to root as per directory structure
                "galleryImages": [
                    "KeepMagazineImage.png", // Use the root image for gallery fallback too
                ],
                "externalLink": "https://keepmagazine.online/",
                "externalLinkText": "See more at keepmagazine.online"
            },
            {
                "id": "sui-generis",
                "title": "Sui Generis",
                "tags": ["Print", "Writing", "Type Design"],
                "description": "A self-published zine that flips inside out into a poster. A reminder to place ourselves in our work and embrace our individuality. Distributed locally. This is a fallback description as projects.json failed to load.",
                "mainImage": "SuiGenerisImage.png", // Path adjusted to root as per directory structure
                "galleryImages": [
                    "SuiGenerisImage.png", // Use the root image for gallery fallback too
                ],
                "externalLink": "sui-generis-zine.pdf",
                "externalLinkText": "Download the PDF"
            }
        ];
        return fallbackProjects.find(p => p.id === id) || {
            title: "Project Not Found",
            tags: [],
            description: "The project you are looking for could not be found.",
            mainImage: "",
            galleryImages: [],
            externalLink: "",
            externalLinkText: ""
        };
    }

    function renderProjectDetail(project) {
        document.title = `${project.title} — Madani`; // Update page title

        const projectDetailSection = document.querySelector('.project-detail');
        if (!projectDetailSection) return;

        projectDetailSection.innerHTML = `
            <a href="portfolio.html" class="back-button">&larr; Back to Portfolio</a>
            <h1>${project.title}</h1>
            <div class="tags-container">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            ${project.mainImage ? `<img src="${project.mainImage}" alt="${project.title} main image" class="main-image" />` : ''}
            <p>${project.description}</p>
            ${project.externalLink ? `<p><a href="${project.externalLink}" target="_blank">${project.externalLinkText}</a></p>` : ''}
            
            ${project.galleryImages && project.galleryImages.length > 0 ? `
                <h2>Gallery</h2>
                <div class="gallery">
                    ${project.galleryImages.map(imgSrc => `<img src="${imgSrc}" alt="${project.title} gallery image" />`).join('')}
                </div>
            ` : ''}
        `;

        // Add lightbox functionality to gallery images
        const galleryImages = projectDetailSection.querySelectorAll('.gallery img');
        galleryImages.forEach(img => {
            img.addEventListener('click', () => openLightbox(img.src));
        });
    }

    // Lightbox functions (now specifically for project detail pages)
    function openLightbox(src) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        lightboxImg.src = src;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open

        lightbox.addEventListener('click', closeLightbox); // Close when clicking anywhere on lightbox
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        lightbox.removeEventListener('click', closeLightbox); // Remove listener to prevent multiple bindings
    }
});