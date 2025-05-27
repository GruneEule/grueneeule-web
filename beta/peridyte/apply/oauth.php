<?php
session_start();
require_once 'config.php';

if (!isset($_GET['code'])) {
    die("Keine Autorisierung");
}

$code = $_GET['code'];

// Access Token holen
$data = [
    'client_id' => CLIENT_ID,
    'client_secret' => CLIENT_SECRET,
    'grant_type' => 'authorization_code',
    'code' => $code,
    'redirect_uri' => REDIRECT_URI,
    'scope' => 'identify guilds.join'
];

$ch = curl_init('https://discord.com/api/oauth2/token');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
$response = json_decode(curl_exec($ch), true);
curl_close($ch);

$access_token = $response['access_token'];

// Nutzerdaten holen
$ch = curl_init('https://discord.com/api/users/@me');
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $access_token]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$user = json_decode(curl_exec($ch), true);
curl_close($ch);

$_SESSION['user'] = $user;

// Optional: automatisch dem Server beitreten lassen
$ch = curl_init("https://discord.com/api/guilds/" . GUILD_ID . "/members/" . $user['id']);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bot " . BOT_TOKEN,
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "access_token" => $access_token
]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_exec($ch);
curl_close($ch);

header("Location: index.php");
exit;
?>
