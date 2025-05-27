<?php
session_start();
require_once 'config.php';

// Wenn nicht eingeloggt, weiterleiten
if (!isset($_SESSION['user'])) {
    header("Location: https://discord.com/api/oauth2/authorize?client_id=".CLIENT_ID."&redirect_uri=".urlencode(REDIRECT_URI)."&response_type=code&scope=identify%20guilds.join");
    exit;
}

$user = $_SESSION['user'];

// HTML Head
echo '<!DOCTYPE html>
<html>
<head>
    <title>Beta-Zugang beantragen</title>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        textarea { width: 100%; height: 150px; margin: 10px 0; }
        input[type="submit"] { background: #5865F2; color: white; border: none; padding: 10px 20px; cursor: pointer; }
        input[type="submit"]:hover { background: #4752C4; }
    </style>
</head>
<body>
<h2>Willkommen, '.htmlspecialchars($user['username']).'!</h2>';

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
            "color" => 5763719,
            "footer" => [
                "text" => "User-ID: $userId"
            ]
        ]]
    ]);

    $ch = curl_init(WEBHOOK_URL);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);

    echo '<div style="background: #2ecc71; color: white; padding: 15px; border-radius: 5px;">
        <p>Deine Anfrage wurde erfolgreich gesendet! Du erhältst bald eine Antwort per Discord-DM.</p>
    </div>';
} else {
    // Formular anzeigen
    echo '<form method="POST" action="index.php">
        <h3>Beta-Tester Bewerbung</h3>
        <p>Bitte beschreibe, warum du am Beta-Test teilnehmen möchtest:</p>
        <textarea name="reason" required placeholder="Ich möchte am Beta-Test teilnehmen, weil..."></textarea><br>
        <input type="submit" value="Anfrage absenden">
    </form>';
}

echo '</body>
</html>';
?>