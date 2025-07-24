// loadProjectDetail.js (in root directory)

document.addEventListener('DOMContentLoaded', () => {
    const projectId = document.body.dataset.projectId;

    if (!projectId) {
        console.error('Project ID not found in data-project-id attribute.');
        return;
    }

    // PATH: projects.json is in the root, and loadProjectDetail.js is also in the root.
    fetch('projects.json') // Correct: no ../ needed as both are in root
        .then(response => {
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status} when fetching projects.json`);
                throw new Error('Could not load projects.json from server.');
            }
            return response.json();
        })
        .then(projects => {
            const project = projects.find(p => p.id === projectId);
            if (project) {
                renderProjectDetail(project);
            } else {
                console.warn(`Project with ID "${projectId}" not found in projects.json. Trying fallback.`);
                renderProjectDetail(getFallbackProject(projectId));
            }
        })
        .catch(error => {
            console.error('Error loading projects from JSON, falling back:', error);
            renderProjectDetail(getFallbackProject(projectId));
        });

    function getFallbackProject(id) {
        // Fallback projects. Images/PDFs are in root, and this JS is in root.
        const fallbackProjects = [
            {
                "id": "keep-magazine",
                "title": "Keep Magazine (Fallback)",
                "tags": ["Web", "Branding", "Content Design", "Editorial"],
                "description": "This is a **FALLBACK** description for Keep Magazine because projects.json failed to load. Keep Magazine is a digital first magazine aimed at creatives. We have interviewed the likes of Dan Alves and Alex Clayton. It aims to push the boundaries of what a modern magazine can be, embracing digital-first content while maintaining strong editorial principles. We explored new ways to present articles and visual content.",
                "mainImage": "KeepMagazineImage.png",
                "galleryImages": [
                    { "src": "KeepMagazineImage.png", "class": "gallery-tall" },
                    { "src": "KeepMagazineImage2.png" },
                    { "src": "KeepMagazineImage3.png" },
                    { "src": "KeepMagazineImage4.png" },
                    { "src": "KeepMagazineImage5.png" }
                ],
                "externalLink": "https://keepmagazine.online/",
                "externalLinkText": "See more at keepmagazine.online"
            },
            {
                "id": "sui-generis",
                "title": "Sui Generis (Fallback)",
                "tags": ["Print", "Writing", "Type Design"],
                "description": "This is a **FALLBACK** description for Sui Generis because projects.json failed to load. A self-published zine that flips inside out into a poster. A reminder to place ourselves in our work and embrace our individuality. Distributed locally. This project allowed me to combine my passion for typography and experimental print design, exploring how a physical artifact can surprise and engage its audience through its unique form.",
                "mainImage": "SuiGenerisImage.png",
                "galleryImages": [
                    { "src": "SuiGenerisImage.png", "class": "gallery-tall" },
                    { "src": "SuiGenerisGif.gif" },
                    { "src": "SuiGenerisImage2.png" },
                    { "src": "SuiGenerisImage3.png" }
                ],
                "externalLink": "SuiGenerisPDF.pdf",
                "externalLinkText": "Download the PDF"
            }
        ];
        return fallbackProjects.find(p => p.id === id) || {
            title: "Project Not Found (Fallback)",
            tags: [],
            description: "The project you are looking for could not be found. This is a fallback message.",
            mainImage: "",
            galleryImages: [],
            externalLink: "",
            externalLinkText: ""
        };
    }

    function renderProjectDetail(project) {
        document.title = `${project.title} — Madani`;

        const projectDetailSection = document.querySelector('.project-detail');
        if (!projectDetailSection) {
            console.error('Element with class .project-detail not found.');
            return;
        }

        const galleryHtml = project.galleryImages && project.galleryImages.length > 0 ? `
            <div class="gallery">
                ${project.galleryImages.map((imgData, index) => {
                    const imgSrc = typeof imgData === 'string' ? imgData : imgData.src;
                    // Images are in the root, and this JS is in the root. No prefix needed.
                    const finalImgSrc = imgSrc.startsWith('http') ? imgSrc : imgSrc;
                    const imgClass = typeof imgData === 'object' && imgData.class ? imgData.class : '';
                    return `<img src="${finalImgSrc}" alt="${project.title} gallery image ${index + 1}" class="${imgClass}" />`;
                }).join('')}
            </div>
        ` : '';

        // Handle externalLink: if it's a local file (like PDF), JS is in root, so no prefix needed.
        const finalExternalLink = project.externalLink && !project.externalLink.startsWith('http') ? project.externalLink : project.externalLink;
        const externalLinkHtml = project.externalLink ? `<p class="download-link-container"><a href="${finalExternalLink}" target="_blank" class="no-underline">${project.externalLinkText}</a></p>` : '';


        projectDetailSection.innerHTML = `
            <a href="portfolio.html" class="back-button no-underline">&larr; Back to Portfolio</a>
            <h1>${project.title}</h1>
            <div class="tags-container">
                ${project.tags.map(tag => `<span class="tag no-underline">${tag}</span>`).join('')}
            </div>
            <p>${project.description}</p>
            ${galleryHtml}
            ${externalLinkHtml}
        `;

        const galleryImages = projectDetailSection.querySelectorAll('.gallery img');
        galleryImages.forEach(img => {
            img.addEventListener('click', () => openLightbox(img.src));
        });
    }

    function openLightbox(src) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        if (!lightbox || !lightboxImg) {
            console.error("Lightbox elements not found. Make sure lightbox HTML is included.");
            return;
        }

        lightboxImg.src = src;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';

        lightbox.addEventListener('click', closeLightbox);
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
            lightbox.removeEventListener('click', closeLightbox);
        }
    }
});