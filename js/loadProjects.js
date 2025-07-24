// js/loadProjects.js (This file is in the 'js' folder)
document.addEventListener('DOMContentLoaded', () => {
    // PATH: JS is in 'js/' folder, projects.json is in root, so go up one level.
    fetch('../projects.json') // Correct: Needs ../ to go up from js/ to root
        .then(response => {
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status} when fetching projects.json`);
                throw new Error('Could not load projects.json for portfolio.');
            }
            return response.json();
        })
        .then(projects => {
            const projectsContainer = document.querySelector('.portfolio-grid');
            if (projectsContainer) {
                projectsContainer.innerHTML = ''; // Clear existing content
                projects.forEach(project => {
                    renderProjectCard(project, projectsContainer);
                });
            } else {
                console.error('Element with class .portfolio-grid not found in portfolio.html.');
            }
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            const projectsContainer = document.querySelector('.portfolio-grid');
            if (projectsContainer) {
                projectsContainer.innerHTML = '<p>Failed to load portfolio projects. Please try again later.</p>';
            }
        });

    function renderProjectCard(project, container) {
        const projectCard = document.createElement('div');
        projectCard.classList.add('portfolio-item');

        // Image path: images are in root, but this JS is in js/ folder, so prefix with '../'
        const mainImagePath = project.mainImage ? `../${project.mainImage}` : 'placeholder.png'; // Use a default if no image

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