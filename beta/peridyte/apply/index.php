<?php
session_start();
require_once 'config.php';

// Wenn nicht eingeloggt, weiterleitung
if (!isset($_SESSION['user'])) {
    header("Location: https://discord.com/api/oauth2/authorize?client_id=".CLIENT_ID."&redirect_uri=".urlencode(REDIRECT_URI)."&response_type=code&scope=identify%20guilds.join");
    exit;
}

$user = $_SESSION['user'];

// HTML Head
echo '<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beta Tester Bewerbung - GrüneEule</title>
    <link rel="icon" href="/dcbots-icons/peridyte-full.png" type="image/png">
    <link rel="shortcut icon" href="/dcbots-icons/peridyte-full.png" type="image/png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #7c664a;
            --primary-light: #94805d;
            --primary-dark: #5d4d35;
            --accent-orange: #d2691e;
            --accent-purple: #8a2be2;
            --accent-purple-light: #9f3de3;
            --accent-purple-dark: #6a1fb3;
            --discord-blue: #5865F2;
            --discord-blue-light: #7289DA;
            --discord-blue-dark: #4E5D94;
            --bg-dark: #121212;
            --bg-light: #1a1a1a;
            --text-light: #ffffff;
            --text-dark: #333333;
            --accent-red: #e63946;
            --accent-red-dark: #d62828;
            --accent-red-light: #f28482;
            --success-green: #2ecc71;
            --success-green-dark: #27ae60;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Inter", system-ui, -apple-system, sans-serif;
        }

        body {
            background-color: var(--bg-dark);
            color: var(--text-light);
            line-height: 1.6;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header Styles */
        header {
            background: linear-gradient(135deg, var(--primary-dark), var(--primary));
            padding: 15px 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            border-bottom: 3px solid var(--accent-purple);
        }

        .header-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-light);
            text-decoration: none;
        }

        .logo-img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid var(--accent-purple);
            box-shadow: 0 0 10px rgba(138, 43, 226, 0.6);
        }

        .logo span {
            color: var(--accent-orange);
        }

        .logo span:last-child {
            color: var(--accent-purple);
        }

        /* Main Content */
        .main-container {
            background: linear-gradient(145deg, var(--bg-light), #0f0f0f);
            border-radius: 12px;
            padding: 40px;
            margin-top: 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border-top: 4px solid var(--primary);
            position: relative;
            overflow: hidden;
        }

        .main-container::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--accent-purple), transparent);
        }

        /* User Info */
        .user-info {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, rgba(124, 102, 74, 0.1), rgba(138, 43, 226, 0.1));
            border-radius: 12px;
            border-left: 4px solid var(--primary);
        }

        .avatar {
            border-radius: 50%;
            margin-right: 20px;
            width: 60px;
            height: 60px;
            border: 3px solid var(--accent-purple);
            box-shadow: 0 0 15px rgba(138, 43, 226, 0.4);
        }

        .user-info h2 {
            font-size: 1.8rem;
            background: linear-gradient(90deg, var(--primary-light), var(--accent-purple-light));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin: 0;
        }

        /* Page Title */
        .page-title {
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5rem;
            background: linear-gradient(90deg, var(--primary-light), var(--accent-purple-light));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            position: relative;
        }

        .page-title::after {
            content: "";
            position: absolute;
            width: 100px;
            height: 3px;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(90deg, var(--accent-orange), var(--accent-purple));
            border-radius: 2px;
        }

        /* Form Styles */
        .form-description {
            margin-bottom: 25px;
            font-size: 1.1rem;
            color: #dcddde;
            text-align: center;
            padding: 20px;
            background: rgba(124, 102, 74, 0.1);
            border-radius: 8px;
            border-left: 4px solid var(--primary);
        }

        .form-group {
            margin-bottom: 25px;
        }

        textarea {
            width: 100%;
            padding: 16px;
            border-radius: 8px;
            border: 2px solid var(--primary-dark);
            background-color: #2a2a2a;
            color: var(--text-light);
            font-size: 16px;
            min-height: 180px;
            resize: vertical;
            font-family: inherit;
            transition: all 0.3s ease;
        }

        textarea:focus {
            outline: none;
            border-color: var(--accent-purple);
            box-shadow: 0 0 15px rgba(138, 43, 226, 0.3);
        }

        textarea::placeholder {
            color: #888;
        }

        .form-hint {
            margin-top: 12px;
            font-size: 0.95rem;
            color: #aaa;
            font-style: italic;
        }

        /* Button Styles */
        .btn {
            display: inline-block;
            padding: 15px 30px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            text-align: center;
        }

        .btn-primary {
            background: linear-gradient(90deg, var(--primary), var(--primary-dark));
            color: var(--text-light);
            box-shadow: 0 6px 20px rgba(124, 102, 74, 0.4);
        }

        .btn-primary:hover {
            box-shadow: 0 8px 25px rgba(124, 102, 74, 0.6);
            transform: translateY(-3px);
            background: linear-gradient(90deg, var(--primary-dark), var(--primary));
        }

        /* Alert Styles */
        .alert {
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 30px;
            border-left: 5px solid;
            position: relative;
            overflow: hidden;
        }

        .alert::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            opacity: 0.3;
        }

        .alert-success {
            background: linear-gradient(135deg, rgba(46, 204, 113, 0.15), rgba(39, 174, 96, 0.1));
            border-left-color: var(--success-green);
            color: #ffffff;
        }

        .alert-success::before {
            background: linear-gradient(90deg, var(--success-green), var(--success-green-dark));
        }

        .alert-success h3 {
            color: var(--success-green);
            margin-bottom: 15px;
            font-size: 1.5rem;
        }

        .alert-error {
            background: linear-gradient(135deg, rgba(231, 76, 60, 0.15), rgba(192, 57, 43, 0.1));
            border-left-color: var(--accent-red);
            color: #ffffff;
        }

        .alert-error::before {
            background: linear-gradient(90deg, var(--accent-red), var(--accent-red-dark));
        }

        .alert-error h3 {
            color: var(--accent-red);
            margin-bottom: 15px;
            font-size: 1.5rem;
        }

        .alert h4 {
            margin: 20px 0 10px 0;
            color: var(--accent-purple-light);
            font-size: 1.2rem;
        }

        .alert ol {
            margin-left: 20px;
            margin-top: 10px;
        }

        .alert li {
            margin-bottom: 8px;
            font-size: 1rem;
        }

        .alert p {
            margin-bottom: 12px;
            font-size: 1rem;
            line-height: 1.6;
        }

        /* Footer */
        .footer {
            margin-top: 60px;
            text-align: center;
            padding: 30px 0;
            border-top: 1px solid #333;
            color: #888;
        }

        .footer a {
            color: var(--accent-purple-light);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }

        .footer a:hover {
            color: var(--accent-purple);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }

            .main-container {
                padding: 25px;
                margin-top: 20px;
            }

            .page-title {
                font-size: 2rem;
            }

            .user-info {
                flex-direction: column;
                text-align: center;
                gap: 15px;
            }

            .user-info .avatar {
                margin-right: 0;
            }

            .alert {
                padding: 20px;
            }

            .btn {
                padding: 12px 24px;
                font-size: 1rem;
            }
        }

        @media (max-width: 480px) {
            .header-container {
                flex-direction: column;
                align-items: center;
            }

            .page-title {
                font-size: 1.8rem;
            }
        }

        /* Animation */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .main-container {
            animation: fadeIn 0.6s ease-out;
        }
    </style>
</head>
<body>
    <header>
        <div class="header-container">
            <a href="../../../index.html" class="logo" aria-label="GrüneEule Home">
                <img src="/dcbots-icons/peridyte-full.png" alt="GrüneEule Logo" class="logo-img">
                Grüne<span>Eule</span> <span>(Services)</span>
            </a>
        </div>
    </header>

    <div class="container">
        <div class="main-container">
            <div class="user-info">
                <img src="https://cdn.discordapp.com/avatars/'.$user['id'].'/'.$user['avatar'].'.png" alt="Avatar" class="avatar">
                <h2>Willkommen, '.htmlspecialchars($user['username']).'</h2>
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
            "title" => "📩 Neue Beta Bewerbung",
            "description" => "**Benutzer:** <@$userId>\n**Name:** $username\n\n**Begründung:**\n$reason",
            "color" => 8153674, // Hex #7c664a zu Dezimal
            "thumbnail" => [
                "url" => $avatar
            ],
            "footer" => [
                "text" => "User ID: $userId • " . date("Y-m-d H:i:s")
            ]
        ]],
        "content" => "<@&1356197148886306896>" // Ping für Admin-Rolle
    ]);

    $ch = curl_init(WEBHOOK_URL);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    curl_close($ch);

    if ($result === false) {
        echo '<div class="alert alert-error">
            <h3>❌ Fehler</h3>
            <p>Es gab einen Fehler beim Senden deiner Bewerbung. Bitte versuche es später erneut.</p>
        </div>';
    } else {
        echo '<div class="alert alert-success">
            <h3>✅ Bewerbung erfolgreich eingereicht!</h3>
            <p>Deine Beta-Tester Bewerbung wurde erfolgreich übermittelt.</p>
            
            <h4>Wie geht es weiter?</h4>
            <ol>
                <li>Unser Team wird deine Bewerbung prüfen</li>
                <li>Du erhältst eine Discord-Direktnachricht mit der Entscheidung</li>
                <li>Bei Annahme bekommst du die <strong>Beta Tester</strong> Rolle</li>
            </ol>
            
            <p><strong>Durchschnittliche Bearbeitungszeit:</strong> 24-48 Stunden</p>
        </div>';

        // Sende Bestätigungs-DM an den User
        $dm_payload = json_encode([
            "embeds" => [[
                "title" => "📨 Beta Bewerbung erhalten",
                "description" => "Vielen Dank für deine Bewerbung als Beta-Tester!",
                "color" => 8153674,
                "thumbnail" => [
                    "url" => "https://i.imgur.com/J6w8XyJ.png"
                ],
                "fields" => [
                    [
                        "name" => "Bewerbungsdetails",
                        "value" => substr($reason, 0, 1000) . (strlen($reason) > 1000 ? "..." : ""),
                        "inline" => false
                    ],
                    [
                        "name" => "Nächste Schritte",
                        "value" => "Unser Team wird deine Bewerbung in Kürze prüfen. Du erhältst eine weitere DM, sobald eine Entscheidung getroffen wurde.",
                        "inline" => false
                    ]
                ],
                "footer" => [
                    "text" => "Wir schätzen dein Interesse, uns zu helfen!"
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
    echo '<h1 class="page-title">Beta Tester Bewerbung</h1>
    
    <div class="form-description">
        <p>Erzähle uns, warum du an unserem Beta-Testing-Programm teilnehmen möchtest:</p>
    </div>
    
    <form method="POST" action="index.php">
        <div class="form-group">
            <textarea name="reason" required placeholder="Ich möchte am Beta-Programm teilnehmen, weil..."></textarea>
            <div class="form-hint">
                Sei ausführlich - erzähle uns von deinen Erfahrungen, warum du interessiert bist und wie du uns dabei helfen kannst, unser Produkt zu verbessern.
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Bewerbung einreichen</button>
    </form>';
}

echo '        </div>
        
        <div class="footer">
            <p>Zurück zur <a href="../../../index.html">Hauptseite</a> | <a href="/dc.html" target="_blank">Discord Server</a></p>
        </div>
    </div>
</body>
</html>';
?>