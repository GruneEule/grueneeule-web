<?php
header('Content-Type: application/json');

// Funktion zur Überprüfung der Website-Verfügbarkeit
function checkWebsiteStatus($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $httpcode >= 200 && $httpcode < 300;
}

// Funktion zur Überprüfung des Discord Bots
function checkDiscordBotStatus($discordApiUrl) {
    // Hier den API Call zum Discord Bot machen und prüfen, ob der Bot online ist.
    $response = file_get_contents($discordApiUrl);
    return json_decode($response, true)['status'] === 'online';
}

// Daten aus dem Query Parameter holen
$websiteStatus = checkWebsiteStatus($_GET['website']);
$discordBotStatus = checkDiscordBotStatus($_GET['discordBot']);

// JSON Ausgabe
echo json_encode([
    'website' => $websiteStatus,
    'discordBot' => $discordBotStatus
]);
?>
