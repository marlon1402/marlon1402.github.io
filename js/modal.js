const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const closeButton = document.querySelector(".modal-close");

let projectData = {};

// CARREGAR JSON
fetch("/assets/data/projects.json")
    .then(response => response.json())
    .then(data => {
        projectData = data;
    })
    .catch(error => {
        console.error("Erro ao carregar projects.json", error);
    });

// ABRIR MODAL
document.addEventListener("click", (e) => {
    const button = e.target.closest("[data-project]");
    if (!button) return;

    const projectKey = button.dataset.project;
    const project = projectData[projectKey];

    if (!project) return;

    modalTitle.textContent = project.title;
    modalBody.innerHTML = "";


    /* ===== TECNOLOGIAS (ÍCONES) ===== */
    if (project.techs && project.techs.length > 0) {
        const techList = document.createElement("ul");
        techList.classList.add("modal-techs");

        project.techs.forEach(tech => {
            const li = document.createElement("li");
            li.innerHTML = `<i class="devicon-${tech}-plain"></i>`;
            techList.appendChild(li);
        });

        modalBody.appendChild(techList);
    }

    /* ===== TEXTO DO PROJETO ===== */
    project.content.forEach(text => {
        const p = document.createElement("p");
        p.innerHTML = text; // permite <strong> e <span class="highlight">
        modalBody.appendChild(p);
    });

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

});

// FECHAR MODAL
closeButton.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}
