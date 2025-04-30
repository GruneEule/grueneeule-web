<?php
session_start();

// Funktion zum Einlesen von .env-Datei
function load_env($path) {
    $vars = [];
    if (!file_exists($path)) return $vars;

    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (str_starts_with(trim($line), '#') || !str_contains($line, '=')) continue;
        [$key, $value] = explode('=', $line, 2);
        $vars[trim($key)] = trim($value);
    }
    return $vars;
}

// .env laden
$env = load_env(__DIR__ . '/.env');

// Benutzerliste erstellen
$users = [
    "henry" => $env["henry_PASS"] ?? "",
    "other" => $env["other_PASS"] ?? ""
];

// Wenn das Formular abgeschickt wurde
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user = $_POST["username"] ?? '';
    $pass = $_POST["password"] ?? '';

    if (isset($users[$user]) && $users[$user] === $pass) {
        $_SESSION["user"] = $user;
        header("Location: go/index.php");
        exit();
    } else {
        $error = "Falscher Benutzername oder Passwort!";
    }
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SunScreen Website Look Login</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            /* Vier-Farben-Palette */
            --blue: #58db34;
            --blue-light: #89e25d;
            --blue-dark: #28a689;
            --yellow: #26f10f;
            --yellow-light: #b1f76f;
            --yellow-dark: #a9d40d;
            --red: #e7c53c;
            --red-light: #ecea63;
            --red-dark: #cbc935;
            --green: #095e2d;
            --green-light: #0f9648;
            --green-dark: #0e6230;

            /* Hintergrundfarben */
            --bg-dark: #121212;
            --bg-darker: #0a0a0a;
            --bg-light: #1e1e1e;
            --text-light: #ffffff;
            --text-muted: #b0b0b0;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        body {
            background-color: var(--bg-dark);
            color: var(--text-light);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            background-image:
                    radial-gradient(circle at 20% 20%, rgba(46, 204, 113, 0.05) 0%, transparent 25%),
                    radial-gradient(circle at 80% 30%, rgba(231, 76, 60, 0.05) 0%, transparent 25%),
                    radial-gradient(circle at 30% 70%, rgba(52, 152, 219, 0.05) 0%, transparent 25%),
                    radial-gradient(circle at 70% 80%, rgba(241, 196, 15, 0.05) 0%, transparent 25%);
        }

        .login-container {
            background: var(--bg-darker);
            border-radius: 12px;
            width: 100%;
            max-width: 420px;
            padding: 40px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.05);
            position: relative;
            overflow: hidden;
        }

        .login-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg,
            var(--green) 0%,
            var(--blue) 33%,
            var(--yellow) 66%,
            var(--red) 100%);
        }

        .logo {
            text-align: center;
            margin-bottom: 30px;
        }

        .logo h1 {
            font-size: 1.8rem;
            font-weight: 700;
            background: linear-gradient(90deg,
            var(--green),
            var(--blue),
            var(--yellow),
            var(--red));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 5px;
        }

        .logo p {
            color: var(--text-muted);
            font-size: 0.9rem;
        }

        .error-message {
            background-color: rgba(231, 76, 60, 0.1);
            color: var(--red-light);
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
            border-left: 3px solid var(--red);
            font-size: 0.9rem;
        }

        .success-message {
            background-color: rgba(46, 204, 113, 0.1);
            color: var(--green-light);
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
            border-left: 3px solid var(--green);
            font-size: 0.9rem;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            font-size: 0.9rem;
            color: var(--text-muted);
        }

        .form-control {
            width: 100%;
            padding: 14px 16px;
            background-color: var(--bg-light);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: var(--text-light);
            font-size: 0.95rem;
            transition: all 0.2s ease;
        }

        .form-control:focus {
            outline: none;
            border-color: var(--blue);
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }

        .btn {
            width: 100%;
            padding: 14px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            position: relative;
            overflow: hidden;
            color: white;
        }

        .btn-login {
            background: linear-gradient(90deg, var(--blue), var(--blue-dark));
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }

        .btn-login:hover {
            background: linear-gradient(90deg, var(--blue-light), var(--blue));
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
        }

        .btn-login::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 30%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(241, 196, 15, 0.3));
            transform: skewX(-20deg);
        }

        .footer-links {
            margin-top: 25px;
            text-align: center;
            font-size: 0.85rem;
            color: var(--text-muted);
        }

        .footer-links a {
            color: var(--yellow-light);
            text-decoration: none;
            transition: all 0.2s ease;
            position: relative;
        }

        .footer-links a:hover {
            color: var(--yellow);
        }

        .footer-links a::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: -2px;
            left: 0;
            background: currentColor;
            transform: scaleX(0);
            transition: transform 0.2s ease;
        }

        .footer-links a:hover::after {
            transform: scaleX(1);
        }

        .color-dots {
            display: flex;
            justify-content: center;
            margin-top: 25px;
            gap: 15px;
        }

        .color-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            opacity: 0.7;
        }

        .dot-green { background-color: var(--green); }
        .dot-blue { background-color: var(--blue); }
        .dot-yellow { background-color: var(--yellow); }
        .dot-red { background-color: var(--red); }

        @media (max-width: 480px) {
            .login-container {
                padding: 30px 20px;
            }

            .logo h1 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
<div class="login-container">
    <div class="logo">
        <h1>SunScreen</h1>
        <p>Website Look Login</p>
    </div>

    <?php if (!empty($error)): ?>
        <div class="error-message"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <?php if (!empty($success)): ?>
        <div class="success-message"><?php echo htmlspecialchars($success); ?></div>
    <?php endif; ?>

    <form method="post">
        <div class="form-group">
            <label for="username">Benutzername</label>
            <input type="text" id="username" name="username" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="password">Passwort</label>
            <input type="password" id="password" name="password" class="form-control" required>
        </div>

        <button type="submit" class="btn btn-login">Einloggen</button>

        <div class="footer-links">
            <a href="../../login-help.html">Hilfe</a>
        </div>
    </form>
</div>
</body>
</html>