<?php
session_start();

// Wenn der Nutzer nicht eingeloggt ist → Weiterleitung zur Login-Seite
if (!isset($_SESSION["user"])) {
    header("Location: ../login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Willkommen im Familienbereich</title>
    <link rel="stylesheet" href="styles.css"> <!-- Dein CSS-Datei -->
</head>
<body>
<header>
    <h1>Willkommen im Familienbereich, <?php echo htmlspecialchars($_SESSION["user"]); ?>!</h1>
    <nav>
        <ul>
            <li><a href="../">Zurück zur Startseite</a></li>
            <li><a href="../logout.php">Logout</a></li>
        </ul>
    </nav>
</header>

<main>
    <section>
        <h2>Nur für Familienmitglieder</h2>
        <p>Diese Seite ist geschützt und nur für eingeloggte Nutzer zugänglich. Du bist jetzt eingeloggt!</p>
    </section>
</main>

<footer>
    <p>&copy; 2025 Deine Familie</p>
</footer>
</body>
</html>
