document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');

    if (newsId) {
        loadNewsDetail(newsId);
    } else {
        window.location.href = '/news.html';
    }

    async function loadNewsDetail(id) {
        try {
            // Lade News-Metadaten
            const newsResponse = await fetch('/assets/data/news.json');
            const newsData = await newsResponse.json();
            const newsItem = newsData.find(item => item.id.toString() === id);

            if (newsItem) {
                // Setze Titel, Datum und Bild
                document.getElementById('news-detail-title').textContent = newsItem.title;
                document.getElementById('news-detail-date').textContent = formatDate(newsItem.date);
                document.getElementById('news-detail-image').src = newsItem.image;
                document.getElementById('news-detail-image').alt = newsItem.title;
                document.title = `${newsItem.title} | GrüneEule`;

                // Lade Markdown-Inhalt
                const mdResponse = await fetch(newsItem.fullContentPath);
                if (!mdResponse.ok) throw new Error('Markdown nicht gefunden');
                const markdown = await mdResponse.text();

                // Konvertiere Markdown zu HTML (einfache Implementierung)
                const htmlContent = convertMarkdownToHtml(markdown);
                document.getElementById('news-detail-text').innerHTML = htmlContent;
            } else {
                window.location.href = '/news.html';
            }
        } catch (error) {
            console.error('Fehler:', error);
            window.location.href = '/news.html';
        }
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('de-DE', options);
    }

    // Einfacher Markdown zu HTML Konverter
    function convertMarkdownToHtml(markdown) {
        // Ersetze Überschriften
        let html = markdown
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>');

        // Ersetze Absätze
        html = html.replace(/^(?!<h[1-6]|<\/?[a-z])(.*$)/gm, '<p>$1</p>');

        // Ersetze Links
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

        // Ersetze Listen
        html = html.replace(/^\* (.*$)/gm, '<li>$1</li>');
        html = html.replace(/<li>.*<\/li>/g, function(match) {
            return '<ul>' + match + '</ul>';
        });

        // Ersetze Fett und Kursiv
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        return html;
    }
});