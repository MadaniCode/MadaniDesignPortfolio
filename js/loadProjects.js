const fallbackProjects = [
  {
    "id": "keep-magazine",
    "title": "Keep Magazine",
    "tags": ["Web", "Branding", "Content Design", "Editorial"],
    "mainImage": "KeepMagazineImage.png",
    "localLink": "project-keep.html"
  },
  {
    "id": "sui-generis",
    "title": "Sui Generis",
    "tags": ["Print", "Writing", "Type Design"],
    "mainImage": "SuiGenerisImage.png",
    "localLink": "project-suigeneris.html"
  }
];

// Try to load projects.json
fetch('data/projects.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Could not load projects.json');
    }
    return response.json();
  })
  .then(projects => {
    renderProjects(projects);
  })
  .catch(error => {
    console.error('Error loading projects:', error);
    // Use fallback if fetch fails
    renderProjects(fallbackProjects);
  });

// Render logic moved to its own function
function renderProjects(projects) {
  const grid = document.getElementById('portfolio-grid');
  grid.innerHTML = ''; // Clear existing content if any

  projects.forEach(project => {
    const item = document.createElement('div');
    item.className = 'portfolio-item';

    // Create an anchor tag that wraps the entire project item
    const link = document.createElement('a');
    link.href = project.localLink; // Link to the specific project page

    // Title
    const title = document.createElement('h2');
    title.textContent = project.title;
    link.appendChild(title);

    // Tags
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tags-container';
    project.tags.forEach(tagText => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = tagText;
      tagsContainer.appendChild(tag);
    });
    link.appendChild(tagsContainer);

    // --- START OF CRUCIAL CHANGE FOR SQUARE THUMBNAILS ---
    // Thumbnail Container for Square Aspect Ratio
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.className = 'project-thumbnail'; // Apply the container class here

    const img = document.createElement('img');
    img.src = project.mainImage || 'placeholder.png'; // Use mainImage or a generic placeholder
    img.alt = project.title;
    img.onerror = () => { img.src = 'placeholder.png'; }; // Fallback for missing images

    thumbnailContainer.appendChild(img); // Append image to the new container
    link.appendChild(thumbnailContainer); // Append the container to the link
    // --- END OF CRUCIAL CHANGE ---
    
    item.appendChild(link); // Append the link wrapping all content to the item
    grid.appendChild(item);
  });
}
