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
    "mama" => $env["MAMA_PASS"] ?? "",
    "papa" => $env["PAPA_PASS"] ?? "",
    "ich"   => $env["ICH_PASS"] ?? ""
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
    <title>Familien-Login</title>
</head>
<body>
<h2>Login für Familienmitglieder</h2>

<?php if (!empty($error)): ?>
    <p style="color:red;"><?php echo htmlspecialchars($error); ?></p>
<?php endif; ?>

<form method="post">
    <label>
        Benutzername:
        <input type="text" name="username" required>
    </label>
    <br><br>
    <label>
        Passwort:
        <input type="password" name="password" required>
    </label>
    <br><br>
    <button type="submit">Einloggen</button>
</form>
</body>
</html>
