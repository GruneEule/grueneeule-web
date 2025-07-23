window.addEventListener("DOMContentLoaded", () => {
    fetch("/assets/templates/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
        });
});

window.addEventListener("DOMContentLoaded", () => {
    fetch("/assets/templates/header-wee.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container-wee").innerHTML = data;
        });
});
