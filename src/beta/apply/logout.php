<?php
session_start();

// CSRF-Schutz
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        http_response_code(403);
        die('Invalid CSRF token');
    }
}

// Session sicher zerstören
$_SESSION = [];
session_unset();
session_destroy();
session_write_close();

// Cookies löschen
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// Sicher weiterleiten
header("Location: https://grueneeule.de/beta");
exit;
?>