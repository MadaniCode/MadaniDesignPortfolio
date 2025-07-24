// loadProjectDetail.js (in root directory)

document.addEventListener('DOMContentLoaded', () => {
    const projectId = document.body.dataset.projectId;

    // --- START HARDCODED PROJECT DATA (MUST BE IDENTICAL TO loadProjects.js) ---
    const projects = [
        {
            "id": "keep-magazine",
            "title": "Keep Magazine",
            "tags": ["Web", "Branding", "Content Design", "Editorial"],
            "description": "Keep Magazine is a digital first magazine aimed at creatives. We have interviewed the likes of Dan Alves and Alex Clayton. It aims to push the boundaries of what a modern magazine can be, embracing digital-first content while maintaining strong editorial principles. We explored new ways to present articles and visual content.",
            "mainImage": "KeepMagazineImage.png",
            "galleryImages": [
                { "src": "KeepMagazineImage.png", "class": "gallery-tall" },
                { "src": "KeepMagazineImage2.png" },
                { "src": "KeepMagazineImage3.png" },
                { "src": "KeepMagazineImage4.png" },
                { "src": "KeepMagazineImage5.png" }
            ],
            "externalLink": "https://keepmagazine.online/",
            "externalLinkText": "See more at keepmagazine.online",
            "localLink": "project-keep.html"
        },
        {
            "id": "sui-generis",
            "title": "Sui Generis",
            "tags": ["Print", "Writing", "Type Design"],
            "description": "A self-published zine that flips inside out into a poster. A reminder to place ourselves in our work and embrace our individuality. Distributed locally. This project allowed me to combine my passion for typography and experimental print design, exploring how a physical artifact can surprise and engage its audience through its unique form.",
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
    // --- END HARDCODED PROJECT DATA ---


    if (!projectId) {
        console.error('Project ID not found in data-project-id attribute.');
        return;
    }

    const project = projects.find(p => p.id === projectId);
    if (project) {
        renderProjectDetail(project);
    } else {
        console.error(`Project with ID "${projectId}" not found in hardcoded data.`);
        const projectDetailSection = document.querySelector('.project-detail');
        if (projectDetailSection) {
            projectDetailSection.innerHTML = `
                <a href="portfolio.html" class="back-button no-underline">&larr; Back to Portfolio</a>
                <h1>Project Not Found</h1>
                <p>The project you are looking for could not be found in the hardcoded data. Please check the project ID.</p>
            `;
        }
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
                    // If your images are NOT in the root (e.g., in an 'assets' folder), you must update 'imgSrc' in the 'projects' array above.
                    const finalImgSrc = imgSrc.startsWith('http') ? imgSrc : imgSrc; 
                    const imgClass = typeof imgData === 'object' && imgData.class ? imgData.class : '';
                    return `<img src="${finalImgSrc}" alt="${project.title} gallery image ${index + 1}" class="${imgClass}" />`;
                }).join('')}
            </div>
        ` : '';

        // Handle externalLink: if it's a local file (like PDF), this JS is in root, so no prefix needed.
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