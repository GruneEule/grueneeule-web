document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".pages-grid");

    fetch("/assets/data/wee-all.json")
        .then(res => res.json())
        .then(data => {
            data.sections.forEach(section => {
                const sectionWrapper = document.createElement("div");
                sectionWrapper.classList.add("page-section");

                const icons = {
                    minecraft: "🟩",
                    tools: "🛠️",
                    community: "👥",
                    info: "ℹ️"
                };

                const icon = icons[section.icon] || "📁";

                const sectionTitle = document.createElement("h2");
                sectionTitle.classList.add("section-title");
                sectionTitle.textContent = `${icon} ${section.title}`;
                sectionWrapper.appendChild(sectionTitle);

                const cardsWrapper = document.createElement("div");
                cardsWrapper.classList.add("page-cards");

                section.pages.forEach(page => {
                    const card = document.createElement("a");
                    card.classList.add("page-card");
                    card.href = page.url;

                    const title = document.createElement("h3");
                    title.textContent = page.title;

                    const desc = document.createElement("p");
                    desc.textContent = page.description;

                    card.appendChild(title);
                    card.appendChild(desc);
                    cardsWrapper.appendChild(card);
                });

                sectionWrapper.appendChild(cardsWrapper);
                container.appendChild(sectionWrapper);
            });
        })
        .catch(err => {
            console.error("Fehler beim Laden der JSON:", err);
            container.innerHTML = "<p>Inhalte konnten nicht geladen werden.</p>";
        });
});


document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".pages-grid");
    const searchInput = document.getElementById("searchInput");

    let allSections = [];

    function renderSections(filteredSections) {
        container.innerHTML = ""; // vorherigen Inhalt löschen

        filteredSections.forEach(section => {
            const sectionWrapper = document.createElement("div");
            sectionWrapper.classList.add("page-section");

            const icons = {
                minecraft: "🟩",
                tools: "🛠️",
                community: "👥",
                info: "ℹ️"
            };

            const icon = icons[section.icon] || "📁";

            const sectionTitle = document.createElement("h2");
            sectionTitle.classList.add("section-title");
            sectionTitle.textContent = `${icon} ${section.title}`;
            sectionWrapper.appendChild(sectionTitle);

            const cardsWrapper = document.createElement("div");
            cardsWrapper.classList.add("page-cards");

            section.pages.forEach(page => {
                const card = document.createElement("a");
                card.classList.add("page-card");
                card.href = page.url;

                const title = document.createElement("h3");
                title.textContent = page.title;

                const desc = document.createElement("p");
                desc.textContent = page.description;

                card.appendChild(title);
                card.appendChild(desc);
                cardsWrapper.appendChild(card);
            });

            sectionWrapper.appendChild(cardsWrapper);
            container.appendChild(sectionWrapper);
        });
    }

    fetch("/assets/data/wee-all.json")
        .then(res => res.json())
        .then(data => {
            allSections = data.sections;
            renderSections(allSections);
        })
        .catch(err => {
            console.error("Fehler beim Laden der JSON:", err);
            container.innerHTML = "<p>Inhalte konnten nicht geladen werden.</p>";
        });

    // Suchfunktion
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();

        const filtered = allSections.map(section => {
            const matchingPages = section.pages.filter(page =>
                page.title.toLowerCase().includes(searchTerm) ||
                page.description.toLowerCase().includes(searchTerm)
            );

            if (matchingPages.length > 0) {
                return {
                    ...section,
                    pages: matchingPages
                };
            }

            return null;
        }).filter(section => section !== null);

        renderSections(filtered);
    });
});
