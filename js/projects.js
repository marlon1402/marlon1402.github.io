const container = document.getElementById("projectsList");

let projectsData = {};

// 🔹 LOAD JSON
async function loadProjects() {
    try {
        const res = await fetch("/assets/data/projects.json");
        projectsData = await res.json();

        renderProjects();
    } catch (err) {
        console.error("Erro ao carregar projetos:", err);
    }
}

// 🔹 RENDER
function renderProjects() {
    const lang = localStorage.getItem("lang") || "PT";

    container.innerHTML = "";

    Object.entries(projectsData).forEach(([key, project], index) => {

        const article = document.createElement("article");
        article.className = `project-card ${index === 0 ? "featured" : ""} fade-in`;

        article.innerHTML = `
            <div class="project-image">
                <img src="/assets/images/projects/${project.image}" alt="${project.title}">
            </div>

            <div class="project-content">

                <ul class="project-tags">
                    ${project.techs.map(t => `<li>${t}</li>`).join("")}
                </ul>

                <h2 class="project-title">${project.title}</h2>

                <p class="project-description">
                    ${project.content[lang][0]}
                </p>

                <div class="project-actions">
                    <button class="project-button outline" data-project="${key}">
                        ${lang === "PT" ? "Saiba mais" : "Learn more"}
                    </button>

                    <a href="#"
                       class="project-button primary">
                        ${lang === "PT" ? "Ver projeto" : "View project"}
                    </a>
                </div>
            </div>
        `;

        container.appendChild(article);
    });
}

// 🔥 Atualiza quando troca idioma
window.addEventListener("languageChanged", renderProjects);

// START
loadProjects();