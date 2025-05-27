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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beta Tester Application</title>
    <style>
        body {
            font-family: "Whitney", "Helvetica Neue", Helvetica, Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #36393f;
            color: #dcddde;
        }
        .container {
            background-color: #2f3136;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1, h2 {
            color: #ffffff;
        }
        h1 {
            border-bottom: 1px solid #4f545c;
            padding-bottom: 10px;
        }
        textarea {
            width: 100%;
            padding: 12px;
            border-radius: 4px;
            border: 1px solid #202225;
            background-color: #40444b;
            color: #dcddde;
            font-size: 16px;
            margin: 10px 0;
            min-height: 150px;
            resize: vertical;
        }
        .btn {
            background-color: #5865f2;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: background-color 0.2s;
        }
        .btn:hover {
            background-color: #4752c4;
        }
        .alert {
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        .alert-success {
            background-color: #2ecc71;
            color: white;
        }
        .avatar {
            border-radius: 50%;
            margin-right: 15px;
            vertical-align: middle;
            width: 40px;
            height: 40px;
        }
        .user-info {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="user-info">
            <img src="https://cdn.discordapp.com/avatars/'.$user['id'].'/'.$user['avatar'].'.png" alt="Avatar" class="avatar">
            <h2>Welcome, '.htmlspecialchars($user['username']).'</h2>
        </div>';

// Wenn das Formular abgeschickt wurde
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $reason = htmlspecialchars($_POST['reason']);
    $username = $user['username'] . '#' . $user['discriminator'];
    $userId = $user['id'];
    $avatar = "https://cdn.discordapp.com/avatars/{$user['id']}/{$user['avatar']}.png";

    // Nachricht an Discord senden
    $payload = json_encode([
        "embeds" => [[
            "title" => "📩 New Beta Application",
            "description" => "**User:** <@$userId>\n**Name:** $username\n\n**Reason:**\n$reason",
            "color" => 5763719,
            "thumbnail" => [
                "url" => $avatar
            ],
            "footer" => [
                "text" => "User ID: $userId • " . date("Y-m-d H:i:s")
            ]
        ]],
        "content" => "<@&ADMIN_ROLE_ID>" // Ping für Admin-Rolle
    ]);

    $ch = curl_init(WEBHOOK_URL);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    curl_close($ch);

    if ($result === false) {
        echo '<div class="alert" style="background-color: #e74c3c;">
            <h3>Error</h3>
            <p>There was an error submitting your application. Please try again later.</p>
        </div>';
    } else {
        echo '<div class="alert alert-success">
            <h3>✅ Application Submitted Successfully!</h3>
            <p>Your beta tester application has been received.</p>
            
            <h4>What happens next?</h4>
            <ol>
                <li>Our team will review your application</li>
                <li>You\'ll receive a Discord DM with the decision</li>
                <li>If accepted, you\'ll get the <strong>Beta Tester</strong> role</li>
            </ol>
            
            <p><strong>Average response time:</strong> 24-48 hours</p>
        </div>';

        // Sende Bestätigungs-DM an den User
        $dm_payload = json_encode([
            "embeds" => [[
                "title" => "📨 Beta Application Received",
                "description" => "Thank you for applying to become a beta tester!",
                "color" => 7506394,
                "thumbnail" => [
                    "url" => "https://i.imgur.com/J6w8XyJ.png"
                ],
                "fields" => [
                    [
                        "name" => "Application Details",
                        "value" => substr($reason, 0, 1000) . (strlen($reason) > 1000 ? "..." : ""),
                        "inline" => false
                    ],
                    [
                        "name" => "Next Steps",
                        "value" => "Our team will review your application shortly. You\'ll receive another DM when a decision has been made.",
                        "inline" => false
                    ]
                ],
                "footer" => [
                    "text" => "We appreciate your interest in helping us improve!"
                ]
            ]]
        ]);

        // Erstelle DM Channel mit User
        $dm_ch = curl_init("https://discord.com/api/users/@me/channels");
        curl_setopt($dm_ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bot ".BOT_TOKEN,
            "Content-Type: application/json"
        ]);
        curl_setopt($dm_ch, CURLOPT_POSTFIELDS, json_encode(["recipient_id" => $userId]));
        curl_setopt($dm_ch, CURLOPT_RETURNTRANSFER, true);
        $dm_channel = json_decode(curl_exec($dm_ch), true);
        curl_close($dm_ch);

        // Sende DM
        if (isset($dm_channel['id'])) {
            $send_dm = curl_init("https://discord.com/api/channels/".$dm_channel['id']."/messages");
            curl_setopt($send_dm, CURLOPT_HTTPHEADER, [
                "Authorization: Bot ".BOT_TOKEN,
                "Content-Type: application/json"
            ]);
            curl_setopt($send_dm, CURLOPT_POSTFIELDS, $dm_payload);
            curl_setopt($send_dm, CURLOPT_RETURNTRANSFER, true);
            curl_exec($send_dm);
            curl_close($send_dm);
        }
    }
} else {
    // Formular anzeigen
    echo '<h1>Beta Tester Application</h1>
    <p>Please tell us why you want to participate in our beta testing program:</p>
    
    <form method="POST" action="index.php">
        <textarea name="reason" required placeholder="I want to join the beta because..."></textarea>
        <p>Be detailed - tell us about your experience, why you\'re interested, and how you can help improve our product.</p>
        <button type="submit" class="btn">Submit Application</button>
    </form>';
}

echo '</div>
</body>
</html>';