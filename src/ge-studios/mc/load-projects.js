const projectIds = [
    "project-id-here",
    "project-id-here"
];

async function fetchProject(projectId) {
    const res = await fetch(`https://api.modrinth.com/v2/project/${projectId}`);
    if (!res.ok) {
        throw new Error(`Projekt ${projectId} konnte nicht geladen werden.`);
    }
    return await res.json();
}

async function loadProjects() {
    const list = document.getElementById("project-list");
    list.innerHTML = ""; // Clear loading text
    try {
        const projects = await Promise.all(projectIds.map(fetchProject));
        projects.forEach(project => {
            const li = document.createElement("li");
            li.className = "modrinth-project";

            const img = document.createElement("img");
            img.src = project.icon_url || "https://modrinth.com/favicon.ico";
            img.alt = project.title + " Icon";
            img.className = "modrinth-icon";

            const info = document.createElement("div");
            info.className = "modrinth-info";

            const title = document.createElement("h3");
            title.className = "modrinth-title";
            title.textContent = project.title;

            const desc = document.createElement("p");
            desc.className = "modrinth-desc";
            desc.textContent = project.description || "Keine Beschreibung vorhanden.";

            const link = document.createElement("a");
            link.className = "cta-button";
            link.href = `https://modrinth.com/project/${project.slug}`;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "Zum Projekt";

            info.appendChild(title);
            info.appendChild(desc);
            info.appendChild(link);

            li.appendChild(img);
            li.appendChild(info);

            list.appendChild(li);
        });
    } catch (error) {
        list.innerHTML = `<li>Fehler beim Laden der Projekte: ${error.message}</li>`;
    }
}

// Load projects when page is ready
document.addEventListener('DOMContentLoaded', loadProjects);