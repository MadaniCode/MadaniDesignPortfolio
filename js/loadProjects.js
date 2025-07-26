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

    // ... (rest of your loadProjects.js code remains the same) ...

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

        const mainImagePath = project.mainImage ? `${project.mainImage}` : 'placeholder.png';

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