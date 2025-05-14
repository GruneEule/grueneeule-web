window.$docsify = window.$docsify || {};

let modalVisible = false;

// Define the plugin
function smartSearch(hook, vm) {
    hook.mounted(function() {
        // Create search button
        var searchButton = document.createElement('button');
        searchButton.textContent = 'Search';
        searchButton.setAttribute('id', 'smart-search-button');

        // Add event listener for search button click
        searchButton.addEventListener('click', function() {
            // Show modal
            showModal();
        });

        // Find logo element
        var logo = document.querySelector('.sidebar-nav');

        // Place search button below the logo in the sidebar
        logo.parentNode.insertBefore(searchButton, logo.nextSibling);
    });
}

// Register the plugin
window.$docsify.plugins = [].concat(smartSearch, window.$docsify.plugins);

function showModal() {
    if (modalVisible) return;
    modalVisible = true;
    document.getElementById('smart-search-button').classList.add("hide");
    if (document.body.classList.contains("close") && document.body.clientWidth <= 768) {
        document.getElementsByClassName("sidebar-toggle")[0].click();
    }
    listenToCloseModal();
    let modalBg = document.createElement('div');
    modalBg.classList.add('smart-search-modal-bg');
    modalBg.innerHTML = `
  <div class="smart-search-modal">
   <input type="text" id="smart-search-input" placeholder="Search" spellcheck="false">
   <div id="smart-search-results">
    <div class="not-found">Start searching!</div>
   </div>
  </div>
 `;
    document.body.appendChild(modalBg);
    let searchInput = document.getElementById('smart-search-input');
    searchInput.focus();
    let searchResults = document.getElementById('smart-search-results');
    let searchCode = 0;
    searchInput.addEventListener('input', (e) => {
        let loadingInnerHTML = '<div class="not-found"><img src="/_media/spinner.svg" style="width: 25px; opacity: .7;"></div>';
        if (searchResults.innerHTML !== loadingInnerHTML) {
            searchResults.innerHTML = loadingInnerHTML;
        }
        searchCode++;
        const currentSearchCode = searchCode;
        setTimeout(async () => {
            if (currentSearchCode !== searchCode) return;
            if (!modalVisible) return;
            let value = e.target.value;
            let results = await search(value);
            searchResults.innerHTML = results?.length ? results.map(r => `
    <a href="/#${r.path}" class="search-result-item">
     ${r.type ? `<div class="type">${r.type.emoji} ${r.type.name}</div>` : ""}
     <div class="value">
      ${r.value}
     </div>
    </a>
   `).join("\n") : `<div class="not-found">${value ? results ? "No results found." : "Search unavailable." : "Start searching!"}</div>`;
        }, 600);
    });
}

let clickCloseModalListener = (e) => {
    if (e.target.classList.contains('smart-search-modal-bg')) {
        hideModal();
    } else if (e.target.nodeName === "A" || e.target.parentNode.nodeName === "A") {
        hideModal();
    }
}

function hideModal() {
    modalVisible = false;
    document.getElementById('smart-search-button').classList.remove("hide");
    document.getElementsByClassName("smart-search-modal-bg")[0].remove();
    document.removeEventListener("click", clickCloseModalListener);
}

function listenToCloseModal() {
    document.addEventListener('click', clickCloseModalListener);
}

async function search(query) {
    if (!query) return [];
    let request = await fetch("https://docs-search.sapph.xyz/search?q=" + encodeURIComponent(query)).catch(() => null);
    if (!request) return null;
    if (request.ok) {
        return await request.json();
    } else {
        return [];
    }
}

// Add keyboard shortcut for Ctrl + K
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault(); // Prevent the default browser behavior (e.g., search in the browser)
        if (!modalVisible) {
            showModal(); // Show the modal if it's not already visible
        }
    }
});

// Add keyboard shortcut for Esc to close the modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (modalVisible) {
            hideModal(); // Close the modal if it's visible
        }
    }
});
