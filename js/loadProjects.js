// js/loadProjects.js (This file is in the 'js' folder)
document.addEventListener('DOMContentLoaded', () => {
    // --- START HARDCODED PROJECT DATA ---
    const projects = [
        {
            "id": "keep-magazine",
            "title": "Keep Magazine",
            "tags": ["Web", "Branding", "Content Design", "Editorial"],
            "description": "Keep Magazine is a digital first magazine aimed at creatives. We have interviewed the likes of Dan Alves and Alex Clayton. It aims to push the boundaries of what a modern magazine can be, embracing digital-first content while maintaining strong editorial principles. We explored new ways to present articles and visual content.",
            "mainImage": "KeepMagazineImage.png", // Path relative to root (from portfolio.html)
            "galleryImages": [ // These paths are relevant for loadProjectDetail.js
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
            "mainImage": "SuiGenerisImage.png", // Path relative to root (from portfolio.html)
            "galleryImages": [ // These paths are relevant for loadProjectDetail.js
                { "src": "SuiGenerisImage.png", "class": "gallery-tall" },
                { "src": "SuiGenerisGif.gif" },
                { "src": "SuiGenerisImage2.png" },
                { "src": "SuiGenerisImage3.png" }
            ],
            "externalLink": "SuiGenerisPDF.pdf", // Path relative to root (from project-suigeneris.html)
            "externalLinkText": "Download the PDF"
        }
    ];
    // --- END HARDCODED PROJECT DATA ---


    const projectsContainer = document.querySelector('.portfolio-grid');
    if (projectsContainer) {
        projectsContainer.innerHTML = ''; // Clear existing content
        projects.forEach(project => {
            renderProjectCard(project, projectsContainer);
        });
    } else {
        console.error('Element with class .portfolio-grid not found in portfolio.html. Displaying fallback message.');
        // Fallback message if container not found
        const mainContent = document.querySelector('main');
        if (mainContent) {
            const errorDiv = document.createElement('div');
            errorDiv.innerHTML = '<p>Error: Portfolio grid container not found in HTML. Please ensure there is a &lt;section class="portfolio-grid"&gt;.</p>';
            mainContent.appendChild(errorDiv);
        }
    }

    function renderProjectCard(project, container) {
        const projectCard = document.createElement('div');
        projectCard.classList.add('portfolio-item');

        // Image path: images are in root, but this JS is in js/ folder, so prefix with '../'
        // If your images are NOT in the root (e.g., in an 'assets' folder), you must update 'project.mainImage' in the 'projects' array above.
        const mainImagePath = project.mainImage ? `../${project.mainImage}` : 'placeholder.png'; 

        projectCard.innerHTML = `
            <a href="${project.localLink}" class="project-link">
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
    }
});