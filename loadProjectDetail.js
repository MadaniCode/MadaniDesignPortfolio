// loadProjectDetail.js (in root directory)

document.addEventListener('DOMContentLoaded', () => {
    const projectId = document.body.dataset.projectId;

    // --- START HARDCODED PROJECT DATA (MUST BE IDENTICAL TO loadProjects.js) ---
    const projects = [
        {
            "id": "keep-magazine",
            "title": "Keep Magazine",
            "tags": ["Creative Direction", "UI/UX", "Branding", "Editorial"],
            "description": "Keep Magazine is a digital first magazine aimed at creatives. We have interviewed the likes of Dan Alves and Alex Clayton.",
            "mainImage": "KeepMagazineGif.gif",
            "galleryImages": [
                { "src": "KeepMagazineImage.png", "class": "gallery-tall" },
                { "src": "KeepMagazineImage2.png" },
                { "src": "KeepMagazineImage3.png" },
            ],
            "externalLink": "https://keepmagazine.online/",
            "externalLinkHtml": `<span class="no-underline">See more at </span><a href="https://keepmagazine.online/">keepmagazine.online</a>`,
            "localLink": "project-keep.html"
        },
        {
            "id": "sui-generis",
            "title": "Sui Generis",
            "tags": ["Print", "Writing", "Type Design"],
            "description": "A self-published zine that flips inside out into a poster. A reminder to place ourselves in our work and embrace our individuality. Distributed locally. This project allowed me to combine my passion for typography and experimental print design, exploring how a physical artifact can surprise and engage its audience through its unique form.",
            "mainImage": "SuiGenerisGif.gif",
            "galleryImages": [
                { "src": "SuiGenerisImage.png", "class": "gallery-tall" },
                { "src": "SuiGenerisGif.gif" },
                { "src": "SuiGenerisImage2.png" },
                { "src": "SuiGenerisImage3.png" },
            ],
            "externalLink": "SuiGenerisPDF.pdf",
            "externalLinkHtml": `<a href="SuiGenerisPDF.pdf" target="_blank"><span class="no-underline">Download the </span>PDF</a>`,
            "localLink": "project-suigeneris.html"
        },
        // --- NEW PROJECT: EDITORIALS ---
        {
            "id": "editorials",
            "title": "Editorials",
            "tags": ["Writing", "Publishing", "Layout Design"], // Example tags
            "description": "A collection of editorials I've written and contributed to, showcasing my ability to craft compelling narratives and insightful commentary.",
            "mainImage": "editorialsgif.gif", // <--- IMPORTANT: Create this image file in your root folder!
            "galleryImages": [
                // Add paths to your editorial images here. Create these files!
                { "src": "EditorialImage1.png" },
                { "src": "EditorialImage2.png" }
            ],
            // If there's an external link for all editorials or a main platform
            "externalLink": "https://example.com/editorials",
            "externalLinkHtml": `<span class="no-underline">Read more at </span><a href="https://example.com/editorials/" target="_blank">example.com/editorials</a>`,
            "localLink": "project-editorials.html"
        },
        // --- NEW PROJECT: CONTENT DESIGN ---
        {
            "id": "content-design",
            "title": "Content Design",
            "tags": ["UX", "Journalism", "Strategy"], // Example tags
            "description": "Projects focused on structuring, writing, and designing content to meet user needs and business goals effectively across various platforms.",
            "mainImage": "contentdesigngif.gif", // <--- IMPORTANT: Create this image file in your root folder!
            "galleryImages": [
                // Add paths to your content design images here. Create these files!
                { "src": "ContentDesignImage1.png" },
                { "src": "ContentDesignImage2.png" }
            ],
            // If there's an external link for all content design or a main platform
            "externalLink": "https://example.com/content-design",
            "externalLinkHtml": `<span class="no-underline">Learn more at </span><a href="https://example.com/content-design/" target="_blank">example.com/content-design</a>`,
            "localLink": "project-contentdesign.html"
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
            // Note: galleryHtml and externalLinkHtml are not defined here,
            // this fallback might need proper initialization if it's ever hit
            projectDetailSection.innerHTML = `
                <h1>${project.title}</h1>
                <div class="tags-container">
                    ${project.tags.map(tag => `<span class="tag no-underline">${tag}</span>`).join('')}
                </div>
                <p>${project.description}</p>
                ${galleryHtml}
                ${externalLinkHtml}
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

        let externalLinkHtml = '';
        if (project.externalLink) {
            let linkTextContent;
            // Check if the current project is 'keep-magazine' for specific formatting
            if (project.id === 'keep-magazine') {
                // For Keep Magazine, specifically separate the prefix "See more at "
                // and make only the domain clickable and underlined.
                linkTextContent = `See more at <a href="${finalExternalLink}" target="_blank">${project.externalLink.replace('https://', '').replace('http://', '').replace('www.', '')}</a>`;
            } else {
                // For other projects (like Sui Generis), the whole text becomes the clickable, underlined link.
                linkTextContent = `<a href="${finalExternalLink}" target="_blank">${project.externalLinkText}</a>`;
            }
            externalLinkHtml = `<p class="download-link-container">${linkTextContent}</p>`;
        }

        projectDetailSection.innerHTML = `
                <h1>${project.title}</h1>
                <div class="tags-container">
                    ${project.tags.map(tag => `<span class="tag no-underline">${tag}</span>`).join('')}
                </div>
                <p class="grey-text">${project.description}</p>
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