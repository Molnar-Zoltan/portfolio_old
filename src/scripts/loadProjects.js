import projects from "../utils/projects.js";

const loadProjects = () => {
    const slides = document.getElementsByClassName("slides")[0];
    projects.forEach((project, index) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `
            <div class="slide ${index === 0 ? 'flex' : 'hidden'}">
                <img class="project-img" src="${project.image}" alt="${project.name}">
                <span class="hidden">${project.githubLink}</span>
                <span class="hidden">${project.previewLink}</span>
            </div>
        `;
        slides.appendChild(wrapper.firstElementChild);
    });

    console.log("Projects loaded successfully");
}

export default loadProjects;