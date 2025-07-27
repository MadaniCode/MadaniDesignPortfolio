// js/loadProjects.js (This file is in the 'js' folder)
document.addEventListener('DOMContentLoaded', () => {
    // --- START HARDCODED PROJECT DATA ---
    const projects = [
        {
            "id": "keep-magazine",
            "title": "Keep Magazine",
            "tags": ["Creative Direction", "UI/UX", "Branding", "Editorial"],
            "description": "Keep Magazine is a <i>digital first</i> magazine aimed at creatives. We have interviewed the likes of <b>Dan Alves</b> and <b>Alex Clayton</b>.",
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
            "description": "A <b>self-published zine</b> that flips inside out into a poster. A reminder to place ourselves in our work and <em>embrace our individuality</em>.<br> <br>Distributed locally. ",
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
            "tags": ["Writing", "Publishing", "Layout Design"],
            "description": "A collection of editorials I've <b>designed and contributed to</b>, from a variety of publications.",
            "mainImage": "editorialsgif.gif",
            "galleryImages": [
                { "src": "editorial1.png" },
                { "src": "editorial2.png" },
                { "src": "editorial3.png" },
                { "src": "editorial4.png" },
                { "src": "editorial5.png" },
                { "src": "editorial6.png" },
                { "src": "editorial8.png" },
                { "src": "editorial10.png" }
            ],
            "localLink": "project-editorials.html"
        },
        // --- NEW PROJECT: CONTENT DESIGN ---
        {
            "id": "content-design",
            "title": "Content Design",
            "tags": ["UX", "Journalism", "Strategy"],
            "description": "Telling stories through <em>meaningful design</em> and presenting ideas in a way that resonates with an audience.<br> <br>These projects showcase engaging content that is both <b>visually appealing</b> and <b>informative</b>.",
            "mainImage": "contentdesigngif.gif",
            "galleryImages": [
                { "src": "ContentDesign1.mp4" },
                { "src": "ContentDesign3.mp4" },
                { "src": "ContentDesign2.mp4" },
            ],
            "externalLink": "https://www.instagram.com/madanivision/",
            "externalLinkHtml": `<span class="no-underline">See more on my </span><a href="https://www.instagram.com/madanivision/" target="_blank">Instagram</a>`,
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