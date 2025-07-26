// js/loadProjects.js (This file is in the 'js' folder)
document.addEventListener('DOMContentLoaded', () => {
    // --- START HARDCODED PROJECT DATA ---
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
            "externalLinkText": "See more at keepmagazine.online",
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
                { "src": "SuiGenerisImage4.png" }
            ],
            "externalLink": "SuiGenerisPDF.pdf",
            "externalLinkText": "Download the PDF",
            "localLink": "project-suigeneris.html"
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

        // Path is now relative to the root of the web server (or the directory of the HTML file itself)
        // Since portfolio.html is in the root, and images are in the root, no prefix is needed here.
        const mainImagePath = project.mainImage ? `${project.mainImage}` : 'placeholder.png'; // CORRECTED LINE

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