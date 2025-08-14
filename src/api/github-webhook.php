<?php
// Dein Webhook-Secret
$secret = "DEIN_WEBHOOK_SECRET";

// Prüfen, ob Signature passt
$signature = "sha256=" . hash_hmac('sha256', file_get_contents('php://input'), $secret);
if (!isset($_SERVER['HTTP_X_HUB_SIGNATURE_256']) || !hash_equals($signature, $_SERVER['HTTP_X_HUB_SIGNATURE_256'])) {
    http_response_code(403);
    exit('Invalid signature');
}

// JSON Payload einlesen
$payload = json_decode(file_get_contents('php://input'), true);

if (!$payload || !isset($payload['commits'])) {
    http_response_code(400);
    exit('No commits found');
}

$commits = $payload['commits'];
$branch = $payload['ref'] ?? 'unknown';

$logfile = __DIR__ . '/version_log.json';
$old_data = file_exists($logfile) ? json_decode(file_get_contents($logfile), true) : [];

// Neue Commits anhängen
foreach ($commits as $commit) {
    $old_data[] = [
        'id' => $commit['id'],
        'message' => $commit['message'],
        'author' => $commit['author']['name'],
        'url' => $commit['url'],
        'timestamp' => $commit['timestamp'],
        'branch' => $branch
    ];
}

// Speichern
file_put_contents($logfile, json_encode($old_data, JSON_PRETTY_PRINT));

echo "OK";
