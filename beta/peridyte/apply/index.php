<?php
session_start();
require_once 'config.php';

// Wenn nicht eingeloggt, weiterleiten
if (!isset($_SESSION['user'])) {
    echo '<a href="https://discord.com/api/oauth2/authorize?client_id='.CLIENT_ID.'&redirect_uri='.urlencode(REDIRECT_URI).'&response_type=code&scope=identify%20guilds.join">Mit Discord einloggen</a>';
    exit;
}

$user = $_SESSION['user'];

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Beta-Zugang beantragen</title>
    <meta charset="UTF-8">
</head>
<body>
<h2>Willkommen, <?php echo htmlspecialchars($user['username']); ?>!</h2>
<form method="POST" action="index.php">
    <label>Warum möchtest du am Beta-Test teilnehmen?</label><br>
    <textarea name="reason" required></textarea><br><br>
    <input type="submit" value="Anfrage absenden">
</form>
</body>
</html>

<?php
// Wenn das Formular abgeschickt wurde
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $reason = htmlspecialchars($_POST['reason']);
    $username = $user['username'] . '#' . $user['discriminator'];
    $userId = $user['id'];

    // Nachricht an Discord senden
    $payload = json_encode([
        "embeds" => [[
            "title" => "📩 Neue Beta-Anfrage",
            "description" => "**Benutzer:** <@$userId>\n**Name:** $username\n**Grund:** $reason",
            "color" => 5763719
        ]]
    ]);

    $ch = curl_init(WEBHOOK_URL);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);

    echo "<p>Deine Anfrage wurde gesendet. Du erhältst bald eine Antwort per Discord-DM.</p>";
}
?>
